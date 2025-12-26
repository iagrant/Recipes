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
    
    // --- START RECIPE SCRIPT (24H AUTO-RESET) ---
    const recipeScript = `
      document.addEventListener("nav", () => {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const pageKey = window.location.pathname;
        const ONE_DAY_MS = 12 * 60 * 60 * 1000; // 24 hours in milliseconds

        checkboxes.forEach((cb, index) => {
          const input = cb;
          const uniqueKey = "recipe-" + pageKey + "-" + index;

          // 1. Enable interaction
          input.removeAttribute("disabled");
          if (input.parentElement) {
            input.parentElement.classList.remove("is-disabled"); 
          }

          // 2. Load state (Expiration Logic)
          const timestamp = localStorage.getItem(uniqueKey);
          if (timestamp) {
            const timeDiff = Date.now() - parseInt(timestamp, 10);
            if (timeDiff < ONE_DAY_MS) {
              // Less than 24h ago -> Keep checked
              input.checked = true;
            } else {
              // Expired -> Clear it
              localStorage.removeItem(uniqueKey);
              input.checked = false;
            }
          }

          // 3. Save state on change
          input.addEventListener("change", () => {
            if (input.checked) {
              // Store current time
              localStorage.setItem(uniqueKey, Date.now().toString());
            } else {
              // Uncheck = clear immediately
              localStorage.removeItem(uniqueKey);
            }
          });
        });
      });
    `
    // --- END RECIPE SCRIPT ---

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
        
        {/* INJECT THE SCRIPT HERE */}
        <script dangerouslySetInnerHTML={{ __html: recipeScript }} />
        
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
