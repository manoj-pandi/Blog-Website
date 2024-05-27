import { db, auth } from "./firebase.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const navToggle = document.querySelector(".nav__toggle > i")
const sideMenu = document.getElementById("side-menu");
export const navLink = document.querySelector(".nav__menu > ul");
// Nav Toggle click
navToggle.addEventListener('click', () => {
    sideMenu.classList.toggle("toggle-active");
    navToggle.classList.toggle("fa-xmark");
})

const logoutLink = document.querySelector('.logout-link');
logoutLink.addEventListener('click', () => {

  signOut(auth).then(() => {
    console.log("Sign-out successful.");
    location.href = "/";
  }).catch((error) => {
    // An error happened.
    console.log("Sign-out not successful.");
  });
})

// const editorBtns = document.querySelectorAll(".editor-btn");
// const homeBtn = document.querySelector(".home-btn");
// const loginBtn = document.querySelector(".login-btn");

// editorBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       window.location.href = "localhost:3000/editor";
//     });
//   });
  
// editorBtn.addEventListener('click', () => {
//     window.location.href.concat = "/editor";
// })
// homeBtn.addEventListener('click', () => {
//     location.href = "/";
// })
// loginBtn.addEventListener('click', () => {
//     location.href = "/";
// })

const blogSection = document.querySelector(".blog");
// const blogData = getBlogs();
//     blogData.forEach(blog => {
//     if(blog.id != decodeURI(location.pathname.split("/").pop())
//     ){
//         createBlog(blog);
//     }
// })
const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `<div class="blog__card">
    <div class="blog__card-img">
    <img id="blog-image" src="${data.bannerImage}" alt="heading image">
    </div>
    <div class="blog__card-content">
    <h2>${data.title?.substring(0, 40) + '...'}</h2>
    <a href="/${blog.id}">Read more</a>
    </div>
    </div>`
}
const colRef = collection(db, "blogs");
const getSnap = await getDocs(colRef);
getSnap.forEach(doc => {
    createBlog(doc);
})