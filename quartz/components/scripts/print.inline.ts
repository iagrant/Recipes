// @ts-ignore - no types ship with qrcode-svg
import QRCode from "qrcode-svg"

const PRINT_DOMAIN = "ian-cookes.pages.dev"

const buildPrintUrl = () => {
  const url = new URL(window.location.href)
  url.hostname = PRINT_DOMAIN
  url.protocol = "https:"
  url.port = ""
  return url.toString()
}

const ensureQrContainer = (): HTMLElement => {
  let container = document.getElementById("print-qr-code")
  if (!container) {
    container = document.createElement("div")
    container.id = "print-qr-code"
    document.body.appendChild(container)
  }
  return container
}

const renderQrCode = () => {
  const container = ensureQrContainer()
  const printUrl = buildPrintUrl()
  const svg = new QRCode({
    content: printUrl,
    padding: 1,
    width: 96,
    height: 96,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
    join: true,
    container: "svg-viewbox",
  }).svg()
  container.innerHTML = `${svg}<div class="print-qr-url">${printUrl}</div>`
}

document.addEventListener("nav", () => {
  const handlePrint = () => {
    renderQrCode()
    window.print()
  }

  for (const button of document.getElementsByClassName("printbutton")) {
    button.addEventListener("click", handlePrint)
    window.addCleanup(() => button.removeEventListener("click", handlePrint))
  }
})
