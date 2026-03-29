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

// -////////////////////////////// profile/edit Validation //////////////////////////////
const profileEditValidation = (data) => {
  const allowedUpdate = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "bio",
  ];
  const isAllowed = Object.keys(data).every((field) =>
    allowedUpdate.includes(field),
  );
  if (!isAllowed) {
    throw new Error("Some field are not allow to update");
  }

  if (data.firstName) {
    validateFirstName(data.firstName);
  }
  if (data.lastName) {
    validatelastName(data.lastName);
  }
  if (data.age) {
    validateAge(data.age);
  }
  if (data.gender) {
    validateGender(data.gender);
  }
  if (data.photoUrl) {
    validatePhotoUrl(data.photoUrl);
  }
  if (data.skills) {
    validateSkills(data.skills);
  }
  if (data.bio) {
    validateBio(data.bio);
  }
};

// ---//////////////////////////////  Individual Validation //////////////////////////////////////

const validateFirstName = (firstName) => {
  if (!firstName || firstName.length < 3) {
    throw new Error("Enter valid firstName");
  }
};

const validatelastName = (lastName) => {
  if (typeof lastName !== "string" || lastName.length > 10) {
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
  if (age && (age < 13 || age > 100) && typeof age !== "number") {
    throw new Error("Invalid Age");
  }
};

const validateGender = (gender) => {
  const validGender = ["male", "female", "other"];
  if (gender && !validGender.includes(gender)) {
    throw new Error("Invalid gender");
  }
};

const validatePhotoUrl = (photoUrl) => {
  if (!validator.isURL(photoUrl)) {
    throw new Error("Invalid photo url");
  }
};

const validateSkills = (skills) => {
  if (!Array.isArray(skills)) {
    throw new Error("Invalid skills please provide array of skills");
  }
  if (skills.length > 10) {
    throw new Error("Too many skills");
  }
};

const validateBio = (bio) => {
  if (bio && bio.length > 100) {
    throw new Error("Bio must be less than 100");
  }
};

module.exports = { signUpValidation, loginValidation, profileEditValidation };
