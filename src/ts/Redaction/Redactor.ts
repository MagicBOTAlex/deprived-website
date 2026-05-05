// redactor.ts
import { parseProfile, type Profile } from "./Profile";
import env, { initEnv } from "@ts/EnvHandler";
import type { Readable, Subscriber, Unsubscriber } from "svelte/store";

class Redactor implements Readable<Profile | undefined> {
  public unredactedProfile: Profile | undefined = undefined;
  public wrongKey: boolean | undefined = undefined;

  private subs = new Set<Subscriber<Profile | undefined>>();
  subscribe(run: Subscriber<Profile | undefined>): Unsubscriber {
    this.subs.add(run);
    run(this.unredactedProfile);
    return () => this.subs.delete(run);
  }
  private notify() {
    this.subs.forEach((s) => s(this.unredactedProfile));
  }

  async TryGetUnredacter(): Promise<Profile | string> {
    if (this.unredactedProfile) return this.unredactedProfile;

    const storedKey = localStorage.getItem("key");
    if (!storedKey) throw new Error("Missing key");

    const hashResJson = await (
      await fetch("https://api.deprived.dev/unredact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: storedKey }),
      })
    ).json();

    const unredactHash = hashResJson.response;
    initEnv();
    if (unredactHash == "nawh") {
      console.log("Wrong key, keeping info about alex secret");
      return "Wrong key";
    }

    const url = `${env.POCKETBASE_URL}/api/collections/redacted_content/records/${unredactHash}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    let data = await res.json();
    const replaced = JSON.parse(
      JSON.stringify(data).replaceAll("[PB]", env.POCKETBASE_URL),
    );
    this.unredactedProfile = parseProfile(replaced.json);
    this.notify(); // <-- tell Svelte to update
    return "success";
  }

  t(path: string, fallback: string): string {
    try {
      const src = this.unredactedProfile as Record<string, unknown> | undefined;
      if (!src) return fallback;
      const v = path.split(".").reduce<any>((o, k) => (o as any)?.[k], src);
      return (v ?? "") !== "" ? String(v) : fallback;
    } catch {
      return fallback;
    }
  }
}

export const re = new Redactor();
export default re;
