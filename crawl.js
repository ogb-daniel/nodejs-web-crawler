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
};
