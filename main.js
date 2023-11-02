const { crawlPage } = require("./crawl");

function main() {
  if (process.argv.length < 3) {
    console.log(`please provide url to crawl`);
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log(`too many args provided`);
    process.exit(1);
  }

  crawlPage(process.argv[2]);
}
main();
