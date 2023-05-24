$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/debite/";
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)

    
    $(".myFormDe").on("submit",(e)=>{
        e.preventDefault()
    })
    $("#btnDebi").on("click", ()=>{
        let moyenTrans = $('#staticMoyen').val();
        let codeScret = $('#staticCode').val();
        let montant = $('#staticmontant').val();
        let numero = $('#staticNumero').val();
        console.log(numero.length)
        if(moyenTrans !=""&& codeScret !=""&& montant !="" && numero !=""){
            if(numero.length >=10){
                let data = {
                    moyenTrans : moyenTrans,
                    montant: montant,
                    numero: numero,
                    codeSecret: codeScret,
                }
                fetch(api, {
                    body:JSON.stringify(data),
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": `token ${user.token}`
                    }
                })
                .then((response)=>{
                    if(response.redirected){
                        window.location.href = "../page/login.html"
                    }
                    return response.json()
                })
                .then((data)=> {
                    $(".infos").text(data.msg).css("color","green")
                })
                .catch((err)=> {
                    $(".infos").text(err).css("color","red");
                })
            }
            else{
                $(".infos").text("Numéro invalide").css("color","red");
            setTimeout(()=>{
                window.location.reload()
            },500)
            }
        }
        else{
            $(".infos").text("Veuillez remplir tous les champs").css("color","red");
            setTimeout(()=>{
                window.location.reload()
            },500)
        }
    })


})