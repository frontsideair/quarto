import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "Quarto",
    tags: [
      {
        tag: "link",
        attrs: { rel: "manifest", href: "manifest.json" },
      },
      {
        tag: "link",
        attrs: { rel: "icon", href: "favicon.ico" },
      },
      {
        tag: "link",
        attrs: { rel: "apple-touch-icon", href: "apple-touch-icon.png" },
      },
    ],
  },
  plugins: [pluginReact()],
});
