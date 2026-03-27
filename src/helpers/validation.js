const validator = require("validator");

// -////////////////////////////// SignUp Validation //////////////////////////////
const signUpValidation = (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    photoUrl,
    skills,
  } = data;

  validateFirstName(firstName);
  validatelastName(lastName);
  validateEmail(email);
  validatePassword(password);
  validateAge(age);
};

// -////////////////////////////// Login Validation //////////////////////////////
const loginValidation = (data) => {
  validateEmail(data.email);
};

// ---//////////////////////////////  Individual Validation //////////////////////////////////////

const validateFirstName = (firstName) => {
  if (!firstName || firstName.length < 3) {
    throw new Error("Enter valid firstName");
  }
};

const validatelastName = (lastName) => {
  if (lastName && lastName.length > 10) {
    throw new Error("Enter valid lastName");
  }
};

const validateEmail = (email) => {
  if (!email) {
    throw new Error("Email is Required");
  }
  if (email.length > 100) {
    throw new Error("Email is too large it should be lessa than 100");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email Format Validator");
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password required");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validateAge = (age) => {
  if (age && (age < 13 || age > 100) && typeof age !== Number) {
    throw new Error("Invalid Age");
  }
};

module.exports = { signUpValidation, loginValidation };
