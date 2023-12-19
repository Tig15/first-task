class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
    this.addInputListeners();
  }

  validateonSubmit() {
    let self = this;

    // Here we are adding event submit on form...
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      var error = 0;
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        // Another function validateFields()
        if (self.validateFields(input) === false) {
          error++;
        }
      });
      //Login API Handling
      const userName = document.querySelector("#username").value;
      const passWord = document.querySelector("#password").value;
      e.preventDefault();
      if (userName && passWord) {
        fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userName,
            password: passWord,
          }),
        }).then((res) => {
          res.json();
          console.log(res);
          if (res.ok) {
            window.location.href("/dashBoard.html");
          } else {
            alert("Invalid Credentials. Please Try Again");
          }
        });
      }
      // Run this if error is equal to zero and the form will be submitted to DashBoard or any page where the action is taking place...
      if (error === 0) {
        localStorage.setItem("auth", JSON.stringify({ userName, auth: 1 }));
        this.form.submit();
      }
    });
  }

  // Validation of field how it should be done...
  validateFields(field) {
    // For Both field if empty...
    if (field.value?.length === 0) {
      // Another Function setStatus() which have three parameters.
      this.setStatus(field, "Fields Cannot be Empty", "error");
      return false;
    } else {
      // For Password Criteria's...
      if (field.type === "password") {
        if (field.value.length < 6) {
          this.setStatus(field, "Password must of 6 characters.", "error");
          return false;
        } else {
          this.setStatus(field, null, "success");
          return true;
        }
      } else {
        this.setStatus(field, null, "success");
        return true;
      }
    }
  }

  //
  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error-message");
    if (status === "success") {
      errorMessage.innerText = "";
      field.classList.remove("input-error");
    } else if (status === "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
    }
  }

  // input listeners for clearing the status, if the value is being enter or place.
  addInputListeners() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);
      input.addEventListener("input", () => {
        self.clearStatus(input);
      });
    });
  }

  clearStatus(field) {
    const errorMessage = field.parentElement.querySelector(".error-message");
    errorMessage.innerText = "";
    field.classList.remove("input-error");
  }
}

const form = document.querySelector("#login");
const logButton = document.querySelector("#log-btn");
if (form) {
  const fields = ["username", "password"];
  const validator = new Login(form, fields);
}

// logButton.addEventListener("click", function (e) {
//   const userName = document.querySelector("#username").value;
//   console.log(userName);
//   const passWord = document.querySelector("#password").value;
//   console.log(passWord);
//   e.preventDefault();
//   fetch("https://dummyjson.com/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username: userName,
//       password: passWord,
//     }),
//   })
//     .then((res) => {
//       res.json();
//       console.log(res);
//       if (res.ok) {
//         window.location.replace("/dashBoard.html");
//       } else {
//         alert("Invalid Credentials");
//       }
//     })
//     .then((data) => console.log(data));
// });
