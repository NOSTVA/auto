const email = "nostva9000@gmail.com";
const expectedDeparture = "2023-06-30";
const phone = "+201111970606";
const firstName = "mohamed";
const lastName = "ahmed";
const passport = "A2FSDFSDF1";
const birthLocalDate = "2005-06-29";

applicants = [
  {
    email: "nostva9000@gmail.com",
    expectedDeparture: "2023-06-30",
    phone: "+201111970606",
    firstName: "mohamed",
    lastName: "ahmed",
    passport: "A2FSDFSDF1",
    birthLocalDate: "2005-06-29",
  },
  {
    email: "nostva9000@gmail.com",
    expectedDeparture: "2023-12-30",
    phone: "+201111970606",
    firstName: "ahmed",
    lastName: "salah",
    passport: "B2DSD3SD21",
    birthLocalDate: "2002-06-29",
  },
];

document
  .querySelector("app-no-form #phone")
  .dispatchEvent(new Event("ngModelChange"));

applicants.map(async (applicant, index) => {
  await fillInput("surname", applicant.firstName, index);
  await fillInput("name", applicant.lastName, index);
  await fillInput("birthLocalDate", applicant.birthLocalDate, index);
  await fillInput("passport", applicant.passport, index);
  await fillInput("applicantEmail", applicant.email, index);
  await fillInput("phone", applicant.phone, index);
  await fillInput(
    "expectedDepartureLocalDate",
    applicant.expectedDeparture,
    index
  );
});

async function fillInput(field, value, folderIndex) {
  let ele = document.querySelectorAll(
    `app-no-form form input[name="${field}"]`
  )[folderIndex];
  ele.value = value;
  ele.dispatchEvent(new Event("input"));
  ele.dispatchEvent(new Event("change"));
  ele.dispatchEvent(new Event("compositionend"));
}
