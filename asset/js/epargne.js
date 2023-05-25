$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/epargneSous/"

    let user = sessionStorage.getItem("sessionUser");
    user = JSON.parse(user);

    if(user != null){
        
    }
    else{
        window.location.href = "../page/login.html";
    }
})