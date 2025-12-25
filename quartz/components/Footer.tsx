// Top of file
// @ts-ignore
import recipeScript from "./scripts/recipe-checkboxes.inline.ts"

// Inside the Footer function's return statement (before the closing </footer>)
export default ((opts?: Options) => {
  // ... existing code ...
  return (
    <footer class={classes}>
      {/* ... existing footer content ... */}
      
      {/* ADD THIS LINE: */}
      <script dangerouslySetInnerHTML={{ __html: recipeScript }} />
<script dangerouslySetInnerHTML={{ __html: recipeScript }} />
    </footer>
  )
}) satisfies QuartzComponentConstructor



import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
