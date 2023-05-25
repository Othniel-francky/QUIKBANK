$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/virement/"
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)
 
    if(user != null){
        $(".myform").on('submit', (e)=>{
            console.log("ok")
            e.preventDefault()
        })
        $('#buton').on("click", ()=>{
            let numeroCompte = $("#staticCompt").val();
            let montant = $("#staticMontant").val();
            let emailClient = $('#staticEmailClient').val();
            let codeSecret = $('#staticCode').val();
    
    
            if(numeroCompte !="" && montant !="" && emailClient != "" && codeSecret != ""){
                
                let data = {
                    numeroCompte:numeroCompte,
                    emailClient:emailClient,
                    montant:montant,
                    codeSecret:codeSecret
                }
                fetch(api, {
                    body:JSON.stringify(data),
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": `token ${user.token}`
                    }
                })
                .then((val)=>{
                    if(val.redirected){
                        window.location.href = "../page/login.html"
                    }
                    return val.json()  
                })
                .then((vire)=> {
                    if(vire.msg == "Virement effactué avec success !!!"){
                        $(".infos").text(vire.msg).css("color","green");
                        setTimeout(()=>{
                            window.location.reload();
                        },2000)
    
                    }
                    $(".infos").text(vire.msg).css("color","red");
                })
                .catch((err)=> {
                    $(".infos").text(err).css("color","red");
                })
            }
            else{
                $(".infos").text("Veuillez remplir tous les champs !!").css("color","red");
            }
          
        })
    }
    else{
        window.location.href = "../page/login.html"
    }

   

})