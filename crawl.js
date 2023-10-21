const { JSDOM } = require("jsdom");

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseUrl}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.error(`error w relative url: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(`${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.error(`error w absolute url: ${err.message}`);
      }
    }
  }
  return urls;
};

const normalizeUrl = (input) => {
  const url = new URL(input);
  const route = `${url.host}${url.pathname}`;
  if (route.length > 0 && route.slice(-1) === "/") {
    return route.slice(0, -1);
  }
  return route;
};
module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};
