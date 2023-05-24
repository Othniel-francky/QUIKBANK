
$(document).ready(function(){
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)
    let api = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/userOne/${user.userId}`
    let url = `http://localhost:3000/api/userOne/${user.userId}`

    fetch(url, {
        headers: {
            "authorization": `token ${user.token}`
        }
    } )
    .then((response) => {
        if (response.redirected){
            window.location.href = '../page/login.html'
        }
        console.log("res ; ", response)
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err => console.log(err)))
});