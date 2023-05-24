$(document).ready(()=>{
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/credite/"
   

    $('.myFormCre').on("submit", (e)=>{
        e.preventDefault()
    })

    $('#validCre').on("click", ()=>{
        let  moyenTrans = $("#staticMoyen").val();
        let codeValide =$("#staticCode").val();
        let montant = $("#staticMontant").val();
        let numero = $("#staticnumero").val();
        let codeSecret = $("#staticCodeSecret").val();
        if( moyenTrans =="" || codeSecret == "" || montant == ""|| numero == "" || codeValide == "" ){
            $(".infos").text("Veuillez remplir tous les champs !!").css("color","red");
            setTimeout(()=>{
                window.location.reload()
            },500)
        }
        else if( numero.length < 10){
            $(".infos").text("Numéro invalide !!").css("color","red");
            setTimeout(()=>{
                window.location.reload()
            },500)
        }
        else{
            let data = {
                moyenTrans: moyenTrans,
                codeValide: codeValide,
                montant: montant,
                numero: numero,
                codeSecret: codeSecret
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
            .then((valeur)=>{
                if(valeur.msg == "Compte crédité Merci pour votre attention"){
                    $(".infos").text(valeur.msg).css("color","green");
                    setTimeout(()=>{
                        window.location.reload();
                    },300)

                };
                $(".infos").text(valeur.msg).css("color","red");
            })
            .catch((err)=> console.log(err))

        }
       
        
       
    })
})