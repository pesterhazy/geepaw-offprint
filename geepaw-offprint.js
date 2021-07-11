const puppeteer = require('puppeteer')
const fsPromises = require('fs').promises;
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const url = "https://www.geepawhill.org/2020/07/21/understanding-incremental-switchover/";
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.addScriptTag({content: `let el= document.querySelector("main"); document.body.innerHTML=""; document.body.appendChild(el)`});
  await page.addStyleTag({content: `form {display: none;}`});
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  await fsPromises.writeFile("out.pdf", pdf);
}

printPDF();
