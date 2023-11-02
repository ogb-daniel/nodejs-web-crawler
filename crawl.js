const { JSDOM } = require("jsdom");

async function crawlPage(currentUrl) {
  console.log(`actively crawling: ${currentUrl}`);
  try {
    const resp = await fetch(currentUrl);
    if (resp.status > 399) {
      console.error(
        `error in fetch with status code: ${resp.status} on page: ${currentUrl}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.error(
        `non html response,content type: ${contentType} on page: ${currentUrl}`
      );
      return;
    }
    console.log(await resp.text());
  } catch (error) {
    console.error(`error in fetc: ${err.message}, on page: ${currentUrl}`);
  }
}

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
  crawlPage,
};
