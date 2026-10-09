// Global array of 10 Moving Representatives
const movingReps = [
  { firstName: "John", lastName: "Doe", password: "!P1word", id: "1001", phone: "123-456-7890 ext 12", email: "jdoe@mou.com" },
  { firstName: "John", lastName: "Wilson", password: "#A24was", id: "1002", phone: "234 567 8901 ext 99", email: "jwilson@mou.org" },
  { firstName: "Eduardo", lastName: "Perez", password: "$M0ney1", id: "1003", phone: "973-555-0192 ext 101", email: "eperez@njit.edu" },
  { firstName: "Jon", lastName: "Jones", password: "@Ufc21a", id: "1004", phone: "555-123-4567 ext 5", email: "jjones@mou.net" },
  { firstName: "Ilia", lastName: "Topuria", password: "%D32aff", id: "1005", phone: "800 555 1212 ext 404", email: "itopuria@mou.com" },
  { firstName: "Donald", lastName: "Duck", password: "^D1sn3y", id: "1006", phone: "201-555-8899 ext 1234", email: "dduck@mou.edu" },
  { firstName: "Justin", lastName: "Gaethje", password: "&F7hde3", id: "1007", phone: "908-555-3322 ext 7", email: "jgaethje@mou.org" },
  { firstName: "Nate", lastName: "Diaz", password: "*G8de32", id: "1008", phone: "609 555 4411 ext 88", email: "ndiaz@mou.com" },
  { firstName: "Bruce", lastName: "Wayne", password: "!H9s45a", id: "1009", phone: "312-555-7766 ext 301", email: "bwayne@mou.biz" },
  { firstName: "Tom", lastName: "Aspinall", password: "#I0e21m", id: "1010", phone: "212-555-9900 ext 42", email: "taspinall@mou.info" }
];

document.getElementById('togglePassword').addEventListener('click', function () {
  const pwdField = document.getElementById('password');
  if (pwdField.type === 'password') {
    pwdField.type = 'text';
    this.textContent = '🔒';
  } else {
    pwdField.type = 'password';
    this.textContent = '👁️';
  }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const password = document.getElementById('password');
  const repId = document.getElementById('repId');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const emailConfirm = document.getElementById('emailConfirm');

  // Clear visual error styles
  [firstName, lastName, password, repId, phone, email].forEach(el => el.classList.remove('highlight-error'));

  // 1. First Name Validation
  const nameRegex = /^[A-Za-z\s'-]+$/;
  if (!firstName.value.trim() || !nameRegex.test(firstName.value.trim())) {
    alert("First Name is required and must contain valid alphabetic characters.");
    return handleError(firstName);
  }

  // 2. Last Name Validation
  if (!lastName.value.trim() || !nameRegex.test(lastName.value.trim())) {
    alert("Last Name is required and must contain valid alphabetic characters.");
    return handleError(lastName);
  }

  // 3. Password Validation: Max 7 chars, starts with special char, at least 1 uppercase, 1 special, 1 digit
  const passwordValue = password.value;
  const startsWithSpecial = /^[^A-Za-z0-9]/.test(passwordValue);
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasDigit = /[0-9]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

  if (!passwordValue || passwordValue.length > 7 || !startsWithSpecial || !hasUppercase || !hasDigit || !hasSpecial) {
    alert("Password must be maximum 7 characters long, start with a special character, contain at least 1 uppercase letter, 1 special character, and 1 digit.");
    return handleError(password);
  }

  // 4. Rep ID Validation: Exactly 4 digits
  const idRegex = /^\d{4}$/;
  if (!idRegex.test(repId.value.trim())) {
    alert("Moving Representative's ID should consist of only numbers and be 4 digits in length.");
    return handleError(repId);
  }

  // 5. Phone Validation: 10 digits (spaces or dashes) + extension
  const phoneRegex = /^\d{3}[-\s]\d{3}[-\s]\d{4}\s+(ext|ext\.|x)?\s*\d+$/i;
  if (!phoneRegex.test(phone.value.trim())) {
    alert("Phone number must have 10 digits delineated by spaces or dashes, followed by an extension (e.g., 111-111-1111 ext 123).");
    return handleError(phone);
  }

  // 6. Email Validation (Conditional upon checkbox)
  if (emailConfirm.checked) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,5}$/;
    if (!emailRegex.test(email.value.trim())) {
      alert("Please enter a valid email containing '@', a domain, and an extension of 2 to 5 characters.");
      return handleError(email);
    }
  }

  // All validations passed -> Verify user
  verifyUser();
}

function handleError(inputElement) {
  inputElement.classList.add('highlight-error');
  inputElement.focus();
}

function verifyUser() {
  const fName = document.getElementById('firstName').value.trim();
  const lName = document.getElementById('lastName').value.trim();
  const pwd = document.getElementById('password').value;
  const idVal = document.getElementById('repId').value.trim();
  const phoneVal = document.getElementById('phone').value.trim();
  const emailVal = document.getElementById('email').value.trim();
  const emailConfirm = document.getElementById('emailConfirm').checked;
  const transaction = document.getElementById('transaction').value;

  const match = movingReps.find(rep => {
    const isBasicMatch = rep.firstName.toLowerCase() === fName.toLowerCase() &&
      rep.lastName.toLowerCase() === lName.toLowerCase() &&
      rep.password === pwd &&
      rep.id === idVal &&
      rep.phone === phoneVal;

    if (emailConfirm) {
      return isBasicMatch && rep.email.toLowerCase() === emailVal.toLowerCase();
    }
    return isBasicMatch;
  });

  if (match) {
    alert(`Welcome ${fName} ${lName}! You have entered the system to perform: ${transaction}`);
  } else {
    alert(`Account for Moving Representative ${fName} ${lName} could not be found.`);
  }
}