import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML_PATH = path.join(__dirname, 'brand-identity.html');
const OUTPUT_PATH = path.join(__dirname, 'output', 'what-if-now-brand-identity.pdf');

async function generatePDF() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
  const htmlUrl = `file://${HTML_PATH}`;

  console.log('Loading HTML...');
  await page.goto(htmlUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for all fonts to load
  await page.evaluate(() => document.fonts.ready);
  console.log('Fonts loaded.');

  // Small delay to ensure rendering is complete
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Generating PDF...');
  await page.pdf({
    path: OUTPUT_PATH,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`PDF saved to: ${OUTPUT_PATH}`);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
