require("dotenv").config();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
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

  await selectLocation();
  await next(0);

  await fillVisaTypology();
  await fillVisaCategory();

  await fillVisa(0);

  await addFolder();
  await fillVisa(1);

  await next(1);

  await fillInput("surname", "saeed", 1);
  await fillInput("name", "mohamed", 1);
  await fillInput("birthLocalDate", "09/09/2002", 1);
  await fillInput("passport", "eg2g1g3h5", 1);
  await fillInput("applicantEmail", "nostva@gmail.com", 1);
  await fillInput("phone", "1111970606", 1);
  await fillInput("expectedDepartureLocalDate", "09/09/2023", 1);

  async function fillInput(field, value, folderIndex) {
    await page.waitForSelector(`app-no-form form input[name="${field}"]`);
    const inputs = await page.$$(`app-no-form form input[name="${field}"]`);
    await inputs[folderIndex].type(value);
  }

  async function selectLocation(index = 0) {
    await page.waitForSelector(".p-dropdown-trigger .ng-tns-c73-3");
    await page.click(".p-dropdown-trigger .ng-tns-c73-3");
    await page.waitForSelector(".p-dropdown-item");
    const locations = await page.$$(".p-dropdown-item");
    await locations[Number(index)].click();

    await page.waitForSelector("#flexCheckDefault");
    const checkboxValue = true;
    await page.evaluate((value) => {
      const checkbox = document.querySelector("#flexCheckDefault");
      checkbox.checked = value;
      checkbox.dispatchEvent(new Event("change"));
    }, checkboxValue);
  }

  async function addFolder() {
    await page.waitForSelector(".p-tabview-nav li a");
    const folders = await page.$$(".p-tabview-nav li a");
    await folders[0].click();
  }

  async function selectFolder(index) {
    await page.waitForSelector(".p-tabview-nav li a");
    const folders = await page.$$(".p-tabview-nav li a");
    await folders[index].click();
  }

  async function next(index) {
    await page.waitForSelector(".btn[type='submit']");
    const submit = await page.$$(".btn[type='submit']");
    if (submit.length > 0) {
      await submit[index].click();
    }
  }

  async function next2() {
    await page.waitForSelector(".btn[type='submit']");
    const submit = await page.$$(".btn[type='submit']");
    await submit[1].click();
  }

  async function fillVisaTypology() {
    await page.waitForSelector(
      ".cat-typ-select p-dropdown .p-dropdown-trigger"
    );
    const buttons = await page.$$("p-dropdown .p-dropdown-trigger");
    await setDropdownValue(buttons, 0, 0);
  }

  async function fillVisaCategory() {
    await page.waitForSelector(
      ".cat-typ-select p-dropdown .p-dropdown-trigger"
    );
    const buttons = await page.$$("p-dropdown .p-dropdown-trigger");
    await setDropdownValue(buttons, 1, 1);
  }

  async function fillVisa(btnIndex) {
    await page.waitForSelector(
      ".cat-typ-select p-dropdown .p-dropdown-trigger"
    );
    const buttons = await page.$$("p-dropdown .p-dropdown-trigger");
    await setDropdownValue(buttons, 2 + btnIndex * 3, 1);
  }

  async function setDropdownValue(buttons, buttonIndex, dropIndex) {
    await buttons[buttonIndex].click();
    await page.waitForSelector(".p-dropdown-items p-dropdownitem li");
    const dropdownItems = await page.$$(".p-dropdown-items p-dropdownitem li");
    await dropdownItems[dropIndex].click();
  }
})();
