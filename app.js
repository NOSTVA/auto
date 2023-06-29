require("dotenv").config();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Set the cookies
  const cookies = [
    {
      name: "1P_JAR",
      value: process.env["1P_JAR"],
      domain: ".gstatic.com",
    },
    {
      name: "auth-user",
      value: process.env.AUTH_USER,
      domain: "eg.almaviva-visa.services",
    },
    {
      name: "auth-token",
      value: process.env.AUTH_TOKEN,
      domain: "eg.almaviva-visa.services",
    },
    {
      name: "cookie-consent",
      value: process.env.COOKIE_CONSENT,
      domain: "eg.almaviva-visa.services",
    },
  ];

  await page.setCookie(...cookies);

  await page.goto(process.env.WEBSITE_URL);

  // ====================== script ======================

  // select location
  await page.waitForSelector(".p-dropdown-trigger .ng-tns-c73-3");
  await page.click(".p-dropdown-trigger .ng-tns-c73-3");
  await page.waitForSelector(".p-dropdown-item");
  const locations = await page.$$(".p-dropdown-item");
  await locations[Number(process.env.LOCATION_INDEX)].click();

  // accept the terms
  await page.waitForSelector("#flexCheckDefault");
  const checkboxValue = true;
  await page.evaluate((value) => {
    const checkbox = document.querySelector("#flexCheckDefault");
    checkbox.checked = value;
    checkbox.dispatchEvent(new Event("change"));
  }, checkboxValue);

  // click Next
  await page.waitForSelector(".btn");
  await page.click(".btn");

  // // set up folders
  // for (let i = 1; i < Number(process.env.FOLDERS_COUNT); i++) {
  //   await page.waitForSelector("#p-tabpanel-0-label");
  //   await page.click("#p-tabpanel-0-label");
  // }

  // // visa setup
  // const foldersCount = Number(process.env.FOLDERS_COUNT);

  const visaTypologyOptionIndex = Number(process.env.VISA_TYPOLOGY);
  const visaCategoryOptionIndex = Number(process.env.VISA_CATEGORY);
  const visaOptionIndex = Number(process.env.VISA);

  await page.waitForSelector(".cat-typ-select p-dropdown .p-dropdown-trigger");
  const buttons = await page.$$("p-dropdown .p-dropdown-trigger");
  await setDropdownValue(buttons, 0, 0);
  await setDropdownValue(buttons, 1, 1);
  await setDropdownValue(buttons, 2, 1);

  await page.waitForSelector(".p-tabview-nav li a");
  const folders = await page.$$(".p-tabview-nav li a");
  await folders[0].click();

  await page.waitForSelector(".cat-typ-select p-dropdown .p-dropdown-trigger");
  const buttons2 = await page.$$("p-dropdown .p-dropdown-trigger");
  console.log(buttons2.length);
  await setDropdownValue(buttons2, 5, 1);

  // click Next
  await page.waitForSelector(".btn[type='submit']");
  const submit = await page.$$(".btn[type='submit']");
  await submit[1].click();

  await page.waitForSelector('input[name="surname"]');
  const sur_name = await page.$$('input[name="surname"]');
  console.log(sur_name.length);
  await sur_name[2].type("mohamed");

  await page.waitForSelector(".p-tabview-nav li a");
  const folders2 = await page.$$(".p-tabview-nav li a");
  await folders2[1].click();

  await page.waitForSelector('input[name="surname"]');
  const sur_name2 = await page.$$('input[name="surname"]');
  console.log(sur_name2.length);
  await sur_name2[0].type("saaed");

  async function setDropdownValue(buttons, buttonIndex, dropIndex) {
    await buttons[buttonIndex].click();
    await page.waitForSelector(".p-dropdown-items p-dropdownitem li");
    const dropdownItems = await page.$$(".p-dropdown-items p-dropdownitem li");
    console.log(buttonIndex, ":", dropdownItems.length, dropIndex);
    await dropdownItems[dropIndex].click();
  }
})();
