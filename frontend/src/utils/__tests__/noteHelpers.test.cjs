const { stripHtml } = require("../utilHelpers.cjs");

test("removes HTML tags from a string", () => {
  expect(stripHtml("<p>Hello <b>world</b></p>")).toBe("Hello world");
});

test("returns empty string when given nothing", () => {
  expect(stripHtml()).toBe("");
});