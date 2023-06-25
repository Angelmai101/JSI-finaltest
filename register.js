import app from "./4.js";
import Login from "./login.js";

class Register {
  form_register;
  txt_Usernme;
  txt_Email;
  txt_phone;
  txt_Password;
  txt_confirmPass;
  error_message;
  txt_go_to_login;
  btn_Submit;

  constructor() {
    //create form
    this.form_register = document.createElement("form");
    //create input name
    this.txt_Username = document.createElement("input");
    this.txt_Username.type = "text";
    this.txt_Username.placeholder = "Username....";

    //create input email
    this.txt_Email = document.createElement("input");
    this.txt_Email.type = "email";
    this.txt_Email.placeholder = "Email....";

    //create input phone numnber
    this.txt_phone = document.createElement("input");
    this.txt_phone.type = "number";
    this.txt_phone.placeholder = "Phone number....";

    //create input password
    this.txt_Password = document.createElement("input");
    this.txt_Password.type = "Password";
    this.txt_Password.placeholder = "Password....";

    //create input confirm password
    this.txt_confirmPassword = document.createElement("input");
    this.txt_confirmPassword.type = "Password";
    this.txt_confirmPassword.placeholder = "Confirm Password....";

    //create input error message
    this.error_message = document.createElement("p");
    this.error_message.classList.add("error");

    //create input go to login
    this.txt_go_to_login = document.createElement("a");
    this.txt_go_to_login.innerHTML = "You already have an account? Login";

    //create button submit
    this.btn_Submit = document.createElement("button");
    this.btn_Submit.type = "submit";
    this.btn_Submit.innerHTML = "Register";

    //add event click, submit into class "a", button
    this.txt_go_to_login.addEventListener("click", this.go_to_login);
    this.btn_Submit.addEventListener("click", this.submit);
  }

  go_to_login() {
    const login = new Login();
    app.change_active_screen(login);
  }

  initRender = (container) => {
    // create title for register
    const title = document.createElement("h2");
    title.innerText = "Register";

    //add h2, input, button into form
    this.form_register.appendChild(title);
    this.form_register.appendChild(this.txt_Username);
    this.form_register.appendChild(this.txt_Email);
    this.form_register.appendChild(this.txt_phone);
    this.form_register.appendChild(this.txt_Password);
    this.form_register.appendChild(this.txt_confirmPassword);
    this.form_register.appendChild(this.error_message);
    this.form_register.appendChild(this.txt_go_to_login);
    this.form_register.appendChild(this.btn_Submit);

    //add form into key div
    container.appendChild(this.form_register);
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

    const name = this.txt_Username.value;
    const email = this.txt_Email.value;
    const phone = this.txt_phone.value;
    const password = this.txt_Password.value;
    const cfpassword = this.txt_confirmPassword.value;

    this.setError("");
    //alert error when you havent enter input
    if (name == "") {
      this.setError("Name cannot be empty");
      return;
    }

    if (email == "") {
      this.setError("Email cannot be empty");
      return;
    }

    if (phone == "") {
      this.setError("Phone number cannot be empty");
      return;
    }

    if (password == "") {
      this.setError("Password cannot be empty");
      return;
    }

    if (cfpassword == "") {
      this.setError("Confirm Password cannot be empty");
      return;
    }
    // alert error when pass<6

    if (password.length < 6) {
      this.setError("Password cannot be less than 6 characters!");
      return;
    }

    //alert when pass different cfpass
    if (password != cfpassword) {
      this.setError("Password doesn't match with confirm password");
      return;
    }

    //archive
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
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().currentUser.updateProfile({ displayName: name });
      })
      .catch((err) => {
        console.log(err.message);
      });

    //firestore
    // Add a new document in collection "cities"
    const db = firebase.firestore();
    db.collection("users")
      .doc(name)
      .set({
        emai: email,
        password: password,
        phone: phone,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    var docRef = db.collection("users").doc(name);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
}
export default Register;
