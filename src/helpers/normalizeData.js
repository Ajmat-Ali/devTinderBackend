// ----------------------------------- Signup Normalize Data ------------------------------
const normalizeSignUpData = (data) => {
  const { firstName, lastName, email } = data;

  const normalizedEmail = emailNormalize(email);
  const normalizedFirstName = firstNameNormalize(firstName);
  const normalizedLastName = lastNameNormalize(lastName);

  return {
    ...data,
    firstName: normalizedFirstName,
    lastName: normalizedLastName,
    email: normalizedEmail,
  };
};

// ----------------------------------- Login Normalize Data ------------------------------
const normalizeLoginData = (data) => {
  const normalizedEmail = emailNormalize(data.email);
  return { ...data, email: normalizedEmail };
};

const normalizeProfileEditData = (data) => {
  // console.log(data, "Here Normalized");
  let newData = { ...data };
  if (data.firstName) {
    const normz_firstName = firstNameNormalize(data.firstName);
    newData = { ...newData, firstName: normz_firstName };
  }
  if (data.lastName) {
    const normz_lastName = lastNameNormalize(data.lastName);
    newData = { ...newData, lastName: normz_lastName };
  }
  if (data.gender) {
    const normz_gender = genderNormalize(data.gender);
    newData = { ...newData, gender: normz_gender };
  }
  return newData;
};

// ----------------------------------- Individual Normalize Data ------------------------------
const emailNormalize = (email) => {
  return email.trim().toLowerCase();
};
const firstNameNormalize = (firstName) => {
  return firstName.trim().toLowerCase();
};
const lastNameNormalize = (lastName) => {
  return lastName.trim().toLowerCase();
};

const genderNormalize = (gender) => {
  return gender.trim().toLowerCase();
};

module.exports = {
  normalizeSignUpData,
  normalizeLoginData,
  normalizeProfileEditData,
};
