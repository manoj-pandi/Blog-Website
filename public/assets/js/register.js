import { auth } from "./firebase.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const SignupBtn = document.getElementById("signup-btn");
export const username = document.getElementById("username").value;
SignupBtn.addEventListener('click', () => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("created");
    window.location.href = "/login";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const msg = document.getElementById("msg");
    msg.innerHTML = errorMessage.split("(auth/")[1].split(")")[0].replace(/-/g, '  ');
  });

})
