$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/epargneSous/"

    let user = sessionStorage.getItem("sessionUser");
    user = JSON.parse(user);

    if(user != null){
        $(".formEparg").on("submit", (e)=>{
            e.preventDefault(e)
        });
        $("#btnEpar").on("click", ()=>{

            let montant = $("#staticmontant").val();
            let status = $("#staticPeriode").val();
            let codeSecret = $("#staticCode").val()

            if(montant != "" && status !="" && codeSecret !=""){
                let data = {
                    montant:montant,
                    periode: status,
                    codeSecret: codeSecret
                }
                
                fetch(api, {
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "authorization":`token ${user.token}`
                    },
                    method: "POST"
                })
                .then((response)=>{
                    if(response.redirected){
                        window.location.href = "../page/login.html"
                    }
                    return response.json();
                })
                .then((val)=>{
                    if(val.msg == "Vous avez épargnez merci pour la confiance"){
                        $(".infos").text(val.msg).css("color","green");
                        setTimeout(()=>{
                            window.location.href = "../page/epagne_sous.html";
                        },2000)
                    }
                    else{
                        $(".infos").text(data.msg).css("color","red")
                        setTimeout(()=>{
                            window.location.href ="../page/credite.html";
                        },2000)
                    }
                })
                .catch((err)=>{
                    $(".infos").text(err).css("color","red");
                    setTimeout(()=>{
                        window.location.reload();
                    },2000)
                })

            }
            else{
                $(".infos").text(`Veuillez remplir tous les champs`).css("color","red")
                setTimeout(()=>{
                    window.location.reload();
                },2000)
            }
        })


    }
    else{
        window.location.href = "../page/login.html";
    }
})