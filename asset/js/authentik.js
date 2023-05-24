
$(document).ready(function(){
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)
    let api = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/userOne/${user.userId}`

    fetch(api,{ method: "GET", redirect: 'follow', mode: "no-cors"})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err => console.log(err)))
});