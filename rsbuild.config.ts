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
    ],
  },
  plugins: [pluginReact()],
});
