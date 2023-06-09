$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/debite/";
    let sessionUser = sessionStorage.getItem("sessionUser");
    let user = JSON.parse(sessionUser)

    if(user !=  null){
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
                        console.log(data)
                        if(data.msg =="Compte debité !!!"){
                            $(".infos").text(data.msg).css("color","green")
                        setTimeout(()=>{
                            window.location.reload();
                        },2000)
                        }
                        else{
                            $(".infos").text(data.msg).css("color","red")
                        }
                    })
                    .catch((err)=> {
                        $(".infos").text(err).css("color","red");
                        setTimeout(()=>{
                            window.location.reload();
                        },2000)
                    })
                }
                else{
                    $(".infos").text("Numéro invalide").css("color","red");
                setTimeout(()=>{
                    window.location.reload()
                },2000)
                }
            }
            else{
                $(".infos").text("Veuillez remplir tous les champs").css("color","red");
                setTimeout(()=>{
                    window.location.reload()
                },2000)
            }
        })
    }
    else{
        window.location.href = "../page/login.html"
    }

  


})