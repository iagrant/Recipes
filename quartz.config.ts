import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ian's Recipes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "iag-recipes.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // "Lora" looks like high-quality print; "Patrick Hand" looks like handwriting
        // specific choice: "Lora" for headers, "Inter" or "Lato" for readability
        header: "Patrick Hand", 
        body: "Nunito",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f0f0eb",      // Warm Parchment (Paper)
          lightgray: "#dcdcd6",  // Faint borders
          gray: "#8c9e8c",       // Muted sage (Metadata)
          darkgray: "#3a403a",   // Dark charcoal/green (Body text)
          dark: "#1e331e",       // Deep Forest Green (Headers)
          secondary: "#3e6b3e",  // Leaf Green (Links)
          tertiary: "#a89f68",   // Muted Gold (Hover states)
          highlight: "rgba(168, 159, 104, 0.15)", // Faint gold highlight
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1a1d1a",      // Deep Swamp/Forest dark
          lightgray: "#2e332e",  
          gray: "#6c7a6c",
          darkgray: "#d4d8d4",   // Off-white text
          dark: "#e8ebe8",       // White headers
          secondary: "#7ea37e",  // Pale Sage (Links)
          tertiary: "#d4af37",   // Gold (Hovers)
          highlight: "rgba(212, 175, 55, 0.15)", // Gold highlight
          textHighlight: "#b3aa0288",
        },
      },
},
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
