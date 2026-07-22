import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  await page.goto('http://localhost:5173');
  
  // wait for it to load
  await new Promise(r => setTimeout(r, 2000));
  
  // type in search and submit
  try {
    await page.type('input[placeholder="AC Omonia Nicosia vs FC Kairat"]', 'test search');
    await page.click('button[type="submit"]');
  } catch (err) {
    console.log("Could not find input", err.message);
  }

  // wait to see if it crashes
  await new Promise(r => setTimeout(r, 4000));
  
  await browser.close();
})();
