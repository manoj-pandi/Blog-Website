import  { showBlog }  from "../js/firebase.js";

let blogId = decodeURI(location.pathname.split("/").pop());

showBlog(blogId);

async function loadBlog() {
    const blogData = await showBlog(blogId);
    if (blogData) {
        const banner = document.querySelector(".banner");
        const title = document.querySelector(".title");
        const created = document.querySelector(".created");
        const article = document.querySelector(".article");

        banner.style.backgroundImage = `url(${blogData.bannerImage})`;

        title.innerHTML += blogData.title;
        created.innerHTML += blogData.createdAt;

        addArticle(article, blogData.article);
         
    } else {
      location.replace("/");
    }
  }
  
loadBlog();

const addArticle = (ele, data) => {
  data = data.split("\n").filter(item => item.length);
  data.forEach(item => {
    if(item[0] == "#"){
      let hCount = 0;
      let i = 0;
      while(item[i] == "#"){
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`;
    }
    else if(item[0] == "!" && item[1] == "["){
      let separator;
      for(let i = 0; i <= item.length; i++){
        if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
          separator = i;
        }
      }
      let alt = item.slice(2, separator);
      let src = item.slice(separator + 2, item.length - 1);
      ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-img">`;
    }
    else{
      ele.innerHTML += `<p>${item}</p>`;
    }
  })
}