const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));

const script = `
let el= document.querySelector("main");
document.body.innerHTML="";
document.body.appendChild(el);
`;

const style = `
form {display: none;}
.hustle-ui {display: none;}
#comments {display: none;}
`;

async function printPDF(url, to) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.addScriptTag({content: script});
  await page.addStyleTag({content: style});
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  await fs.writeFile(to, pdf);
}

async function main() {
  await rimraf("out");
  await fs.mkdir("out");

  const urls = (await fs.readFile("urls.txt", "utf8")).split(/\n/).filter(s => s);

  for (const [idx, url] of urls.entries()) {
    const padIdx = String(idx).padStart(4, '0');
    const to = `out/${padIdx}.pdf`;
    console.log(url);
    await printPDF(url, to);
    console.log(to);
  }
  process.exit(0);
};

main();
