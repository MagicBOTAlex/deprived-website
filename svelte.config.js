import vitePreprocess from "./src/optimizers/viteThing.js";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    if (warning.code.startsWith("a11y-")) return;
    if (warning.code === "missing-exports-condition") return;
    if (warning.code === "a11y-no-static-element-interactions") return;
    if (warning.code === "svelte-ignore a11y-autofocus") return;
    if (warning.code.startsWith("css-unused-selector")) return;
    handler(warning);
  },
  kit: {
    prerender: {
      handleHttpError: "fail",
    },
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
};
