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

module.exports = { normalizeSignUpData, normalizeLoginData };
