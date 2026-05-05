import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import sveltekit from "./src/optimizers/sveltekit.ts";
import path from "path";

const buildTime = new Intl.DateTimeFormat("da-DK", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Copenhagen",
}).format(new Date());

export default {
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tailwindcss(),
    sveltekit(),
  ],
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  resolve: {
    alias: {
      "@images": path.resolve("./src/images"),
      "@src": path.resolve("./src"),
      "@static": path.resolve("./static"),
      "@pages": path.resolve("./src/pages"),
      "@ts": path.resolve("./src/ts"),
      "@shop": path.resolve("./src/pages/shop"),
      "@stores": path.resolve("./src/ts/store.ts"),
      "@e": path.resolve("./src/optimizers"),
      $paraglide: path.resolve("src/paraglide"),
    },
  },
  server: {
    allowedHosts: ["development2.deprived.dev"],
  },
};
