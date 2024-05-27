import { auth } from "./firebase.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


const loginBtn = document.getElementById("login-btn")
let loggedin = false;


// Login
loginBtn.addEventListener('click', () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "/";
    console.log("logged in");
    loggedin = true;
    // window.onload = () => {

    //   const navLink = document.getElementById("links-container")
    //   navLink.innerHTML += "Ashwin";
    // }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const msg = document.getElementById("msg");
    msg.innerHTML = errorMessage.split("(auth/")[1].split(")")[0];
  });

})


console.log(loggedin);

