
$(document).ready(function(){
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)
    let api = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/userOne/${user.userId}`
    let url = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/solde/${user.userId}`

    if(user != null){

    }
    else{
        window.location.href = "../page/login.html"
    }

    fetch(api, {
        headers: {
            "authorization": `token ${user.token}`
        }
    } )
    .then((response) => {
        if (response.redirected){
            window.location.href = '../page/login.html'
        }
        return response.json();
    })
    .then((data) => {
        
        $('.user').text(`${data.data.nom} ${data.data.prenom}`);
    })
    .catch((err => console.log(err)))


    fetch(url, { 
        headers :  {
            "authorization": `token ${user.token}`
        }
    })
    .then((response)=>{
        if (response.redirected){
            window.location.href = '../page/login.html'
        }
        return response.json();
    })
    .then((data)=>{
        $('.soldy').text(`${data.data.solde} FrCFA`);
        $('.account').text(`${data.data.numeroCompte.split(" ").slice(1).join(" ")}`)
    })
    .catch((err)=> console.log(err))
});