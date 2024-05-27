import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBycmrT8PqD-uHmLS77pRXuuPmKlvVq5Rk",
  authDomain: "blogging-website-1195a.firebaseapp.com",
  projectId: "blogging-website-1195a",
  storageBucket: "blogging-website-1195a.appspot.com",
  messagingSenderId: "870452704313",
  appId: "1:870452704313:web:280bd8ea5600fbb4d809e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// Add a new document in collection "cities"


export const addBlog = (blogId, blogTitle, article, bannerImage, createdAt) => {
  const blogRef = doc(db, "blogs", blogId);
  setDoc(blogRef, {
    title: blogTitle,
    article: article,
    bannerImage: bannerImage,
    createdAt: createdAt
  })
  .then(() => {
    location.href = `${blogId}`;
  })
  .catch((error) => {
    location.href = "/";
  });
};
export const  showBlog = async (blogId) => {
  const docRef = doc(db, "blogs", blogId);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return docSnap.data();
  }
  else{
   location.replace("/");
  }
};

export const getBlogs = async () => {
  const colRef = collection(db, "blogs");
  const getSnap = await getDocs(colRef);
  const blogData = [];
  getSnap.forEach(doc => {
    blogData.push(doc);
  })
  // console.log(typeof blogData);
}

// export const blogArray = blogData;
// console.log(blogArray);

// Login and Signup
const loginLink = document.querySelector('.login-link');
const navLinks = document.getElementById("links-container");
const dashboardLink = document.querySelector(".dashboard-link")
const logoutLink = document.querySelector('.logout-link');
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("logged in");
    loginLink.style.display = "none";
    dashboardLink.style.display = "";
    logoutLink.style.display = "";
    loginLink.style.cursor = "pointer";
  } else {
   console.log("not");
   loginLink.style.display = "";
   dashboardLink.style.display = "none";
   logoutLink.style.display = "none";
  }
});

   
  //  const logoutLink = document.querySelector('.logout-link');
  //  logoutLink.addEventListener('click', () => {
   
  //    signOut(auth).then(() => {
  //      console.log("Sign-out successful.");
  //    }).catch((error) => {
  //      // An error happened.
  //      console.log("Sign-out not successful.");
  //    });
  //  })