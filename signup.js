// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsBSrB-GuiSGsPfJUeYn17utfsZ3tYei0",
  authDomain: "imdb-3dee2.firebaseapp.com",
  projectId: "imdb-3dee2",
  storageBucket: "imdb-3dee2.appspot.com",
  messagingSenderId: "361165231060",
  appId: "1:361165231060:web:0f04bea87ce6fb9124bc41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

const regis = document.getElementById("regis");

regis.addEventListener("click", function(event) {
  event.preventDefault();

  const email = document.getElementById("se").value;
  const password = document.getElementById("sp").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Creating Account");
      const userEmail = user.email;
      window.location.href=`5.html?email=${userEmail}`;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
