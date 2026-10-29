// 尽早设置主题，避免刷新时闪烁；存储被禁用时仍可正常使用。
(() => {
  let preference = "system";
  try { preference = localStorage.getItem("academic-theme") || "system"; } catch { /* Optional preference. */ }
  if (!["light", "dark", "system"].includes(preference)) preference = "system";
  document.documentElement.dataset.themePreference = preference;
  const dark = preference === "dark" || (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
})();
