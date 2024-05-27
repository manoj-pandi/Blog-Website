import  { db, addBlog }  from "../js/firebase.js";

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector(".article");

// Banner
const bannerImage = document.getElementById("banner-upload");
const banner = document.getElementById("banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadBtn = document.getElementById("image-upload");



const errorModal = document.getElementById("error-modal");
const errorMessage = document.getElementById("error-message");

// Get close button element
const closeBtn = document.getElementsByClassName("close")[0];

// Function to show modal with error message
function showModal(message) {
  errorMessage.innerText = message;
  errorModal.style.display = "block";
}

// Function to hide modal
function hideModal() {
  errorModal.style.display = "none";
}

// Add click event listener to close button to hide modal
closeBtn.addEventListener('click', hideModal);

// For Months in created at 
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})


uploadBtn.addEventListener('change', () => {
    uploadImage(uploadBtn, "image");
})
const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/uploads', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            }
            else {
                
            bannerPath = `${location.origin}/${data}`;
            banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })

    }
}

const addImage = (imagePath, alt) => {
    let currentPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagePath})\r`;
    articleField.value = articleField.value.slice(0, currentPos) + textToInsert + articleField.value.slice(currentPos);
}

publishBtn.addEventListener('click', () => {
    if(articleField.value.length && blogTitleField.value.length){
        if (!bannerPath) {
            showModal('Please upload a Banner image!');
        }
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // Setting Document Name
        let docName = `${blogTitle}-${id}`;
        console.log(docName);
        let date = new Date();
        
        // Mongoose


        addBlog(docName, blogTitleField.value, articleField.value, bannerPath, `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`);
        // Accessing Firestore with db variables
        // db.collection("blogs").doc(docName).set({
        //     title: blogTitleField.value,
        //     article: articleField.value,
        //     bannerImage: bannerPath,
        //     createdAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        // })
        // .then(() => {
        //     console.log('data Entered');
        // })
        // .catch((err) => {
        //     console.error(err);
        // })
    }
    else if(blogTitleField.value === "" && articleField.value === "") {
        showModal("Please enter a Title and Article!");
    }
    else if(blogTitleField.value === ""){
        showModal("Please enter an Title!");
    }
    else{
        showModal("Please enter an Article!");
    }
})