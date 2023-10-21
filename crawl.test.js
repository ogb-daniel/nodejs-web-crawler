const { test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHTML } = require("./crawl");
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
test("getURLsFromHTML absolute", () => {
  const inputBody = `
  <html>
    <body>
    <a href="https://test.com/">
    Hello
    </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://test.com";
  const output = getURLsFromHTML(inputBody, inputBaseURL);
  const expected = ["https://test.com/"];
  expect(output).toEqual(expected);
});
test("getURLsFromHTML relative", () => {
  const inputBody = `
  <html>
    <body>
    <a href="/path/">
    Hello
    </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://test.com";
  const output = getURLsFromHTML(inputBody, inputBaseURL);
  const expected = ["https://test.com/path/"];
  expect(output).toEqual(expected);
});
test("getURLsFromHTML relative and absolute", () => {
  const inputBody = `
  <html>
    <body>
    <a href="/path1/">
    Hello
    </a>
    <a href="https://test.com/path2/">
    Hello
    </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://test.com";
  const output = getURLsFromHTML(inputBody, inputBaseURL);
  const expected = ["https://test.com/path1/", "https://test.com/path2/"];
  expect(output).toEqual(expected);
});
test("getURLsFromHTML invalid", () => {
  const inputBody = `
  <html>
    <body>
    <a href="path/">
    Hello
    </a>
 
    </body>
  </html>
  `;
  const inputBaseURL = "https://test.com";
  const output = getURLsFromHTML(inputBody, inputBaseURL);
  const expected = [];
  expect(output).toEqual(expected);
});
