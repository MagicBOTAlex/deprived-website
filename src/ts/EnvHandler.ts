// used to deal with .env things, but with this instead because nix
// Drafted manually, then fed through chatgpt
// Idk what is going on anymore, but it isn't really an important aspect of the code, since this is just for changing from productiong to dev environment

type Env = { [K in keyof typeof env]: (typeof env)[K] } & Record<
  string,
  unknown
>;

export let env = {
  POCKETBASE_URL: "https://pocket.deprived.dev",
} as const;
export default env;

let initialized = false;

// Load overrides from localstorage or url params
const isOverride = (k: string) => k.startsWith("-E");
const norm = (k: string) => k.slice(2); // strip "-E"

function apply(from: Record<string, string>, tag: string) {
  for (const [rawK, rawV] of Object.entries(from)) {
    env[rawK] = rawV;
  }
}

export function initEnv(): void {
  if (initialized) return;
  initialized = true;
  window.env = env!;

  // localStorage overrides: only keys starting with "-E"
  const ls: Record<string, string> = {};
  for (const [k, v] of Object.entries(env)) {
    const val = localStorage.getItem(k);
    if (val != null) ls[k] = val;
  }
  apply(ls, "localStorage");

  // URL param overrides: ?-EKEY=value
  const params = new URLSearchParams(location.search);
  const url: Record<string, string> = {};
  for (const [k, v] of params.entries()) url[k] = v;
  apply(url, "url");

  // (optional) persist URL overrides in localStorage with the "-E" prefix
  for (const [k, v] of Object.entries(url)) {
    if (isOverride(k)) localStorage.setItem(norm(k), String(v));
  }

  // Object.assign(env as any, current);
  // for (const [k, v] of Object.entries(env))
  //   console.log(`[env final] ${k}=${String(v)}`);
}
