module.exports = {
  t: (data) => data.translations[data.lang],
  currentPath: (data) => (data.page.fileSlug !== data.lang ? `${data.page.fileSlug}/` : ""),
  ogLocale: (data) => data.i18n.ogLocales[data.lang],
};
