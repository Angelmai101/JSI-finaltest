import app from "./4.js";
import Register from "./register.js";

class Login {
  form_register;
  txt_Email;
  txt_Password;
  error_message;
  txt_go_to_register;
  btn_Submit;
  constructor() {
    //create form
    this.form_login = document.createElement("form");

    //create input email
    this.txt_Email = document.createElement("input");
    this.txt_Email.type = "email";
    this.txt_Email.placeholder = "Email....";

    //create input password
    this.txt_Password = document.createElement("input");
    this.txt_Password.type = "Password";
    this.txt_Password.placeholder = "Password....";

    //create input error message
    this.error_message = document.createElement("p");
    this.error_message.classList.add("error");

    //create input go to register
    this.txt_go_to_register = document.createElement("a");
    this.txt_go_to_register.innerHTML = "You don't have an account? Register";

    //create button submit
    this.btn_Submit = document.createElement("button");
    this.btn_Submit.type = "submit";
    this.btn_Submit.innerHTML = "Login";

    //add event click, submit into class "a", button
    this.txt_go_to_register.addEventListener("click", this.go_to_register);
    this.btn_Submit.addEventListener("click", this.submit);
  }

  go_to_register = () => {
    const register = new Register();
    app.change_active_screen(register);
  };
  initRender = (container) => {
    // create title for login
    const title = document.createElement("h2");
    title.innerText = "Login";

    //add h2, input, button into form
    this.form_login.appendChild(title);
    this.form_login.appendChild(this.txt_Email);
    this.form_login.appendChild(this.txt_Password);
    this.form_login.appendChild(this.error_message);
    this.form_login.appendChild(this.txt_go_to_register);
    this.form_login.appendChild(this.btn_Submit);

    //add form into key div
    container.appendChild(this.form_login);
  };

  setError = (content) => {
    if (content == undefined) {
      this.error_message.style.display = "none";
    } else {
      this.error_message.innerHTML = content;
      this.error_message.style.display = "block";
    }
  };
  submit = (e) => {
    e.preventDefault();

    const email = this.txt_Email.value;
    const password = this.txt_Password.value;

    this.setError("");

    if (email == "") {
      this.setError("Email cannot be empty");
    }

    if (password == "") {
      this.setError("Password cannot be empty");
    }
    // alert error when pass<6

    if (password.length < 6) {
      this.setError("Password cannot be less than 6 characters!");
      return;
    }

    const firebaseConfig = {
      apiKey: "AIzaSyBSUnvAfR5B4K3ekHrtaeSJC7c8j4iVtGw",
      authDomain: "jsi---form.firebaseapp.com",
      projectId: "jsi---form",
      storageBucket: "jsi---form.appspot.com",
      messagingSenderId: "999124837300",
      appId: "1:999124837300:web:bfea53f9d3e7b2179a88e1",
    };

    firebase.initializeApp(firebaseConfig);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Login successful");
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log("Fail to login");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
}

export default Login;
