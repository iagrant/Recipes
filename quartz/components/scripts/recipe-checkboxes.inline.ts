// quartz/components/scripts/recipe-checkboxes.inline.ts

document.addEventListener("nav", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']")
  const pageKey = window.location.pathname

  checkboxes.forEach((cb, index) => {
    const input = cb as HTMLInputElement
    const uniqueKey = `recipe-${pageKey}-${index}`

    // 1. Enable interaction
    input.removeAttribute("disabled")
    input.parentElement?.classList.remove("is-disabled")

    // 2. Load saved state
    const savedState = localStorage.getItem(uniqueKey)
    if (savedState === "true") {
      input.checked = true
    }

    // 3. Save state on change
    input.addEventListener("change", () => {
      localStorage.setItem(uniqueKey, input.checked.toString())
    })
  })
})
