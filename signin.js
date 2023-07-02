const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const firebaseConfig = {
  apiKey: "AIzaSyBSUnvAfR5B4K3ekHrtaeSJC7c8j4iVtGw",
  authDomain: "jsi---form.firebaseapp.com",
  projectId: "jsi---form",
  storageBucket: "jsi---form.appspot.com",
  messagingSenderId: "999124837300",
  appId: "1:999124837300:web:bfea53f9d3e7b2179a88e1",
};

firebase.initializeApp(firebaseConfig);

const Signin = document.getElementById("signin");
Signin.addEventListener("submit", () => {
  event.preventDefault();
  var email = document.querySelector('input[name="email-signin"]').value;
  var password = document.querySelector('input[name="password-signin"]').value;
  if (email == null || password == null) {
    alert("Please fill in every boxes");
    return;
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Login successful");

      window.location.href = "index.html";
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
});

const CreateAccount = document.getElementById("createaccount");
CreateAccount.addEventListener("submit", () => {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var dateofbirth = document.querySelector('input[name="birth"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  var cfpassword = document.querySelector('input[name="cfpassword"]').value;
  if (!name || !email || !password || !cfpassword || !dateofbirth || !phone) {
    alert("Please fill in every boxes");
    return;
  }
  if (password != cfpassword) {
    alert("Password is not matching. Check it");
    return;
  }
  if (password.length < 6) {
    alert("Password should be more than 6 characters");
    return;
  }
  if (phone.length < 10) {
    alert("Check your phone number");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.updateProfile({ displayName: name });
    })
    .catch((err) => {
      console.log(err.message);
    });

  const db = firebase.firestore();
  db.collection("users")
    .doc(name)
    .set({
      emai: email,
      password: password,
      name: name,
      "date of birth": dateofbirth,
      "phone number": phone,
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
  alert("success");
  container.classList.remove("right-panel-active");
});
