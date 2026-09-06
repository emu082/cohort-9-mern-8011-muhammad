function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "");
}

module.exports = { stripHtml };