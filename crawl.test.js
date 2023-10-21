const { test, expect } = require("@jest/globals");
const { normalizeUrl } = require("./crawl");
test("normalizeUrl strip protocol", () => {
  const input = "https://test.com/path";
  const output = normalizeUrl(input);
  const expected = "test.com/path";
  expect(output).toEqual(expected);
});
test("normalizeUrl strip trailing slash", () => {
  const input = "https://test.com/path/";
  const output = normalizeUrl(input);
  const expected = "test.com/path";
  expect(output).toEqual(expected);
});
test("normalizeUrl capitals", () => {
  const input = "https://TEST.com/path/";
  const output = normalizeUrl(input);
  const expected = "test.com/path";
  expect(output).toEqual(expected);
});
test("normalizeUrl strip secured http", () => {
  const input = "http://test.com/path/";
  const output = normalizeUrl(input);
  const expected = "test.com/path";
  expect(output).toEqual(expected);
});
