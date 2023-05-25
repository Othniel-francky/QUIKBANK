$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/pret/"
    let user = sessionStorage.getItem("sessionUser");
    user = JSON.parse(user);

    if(user != null){

        $(".formPret").on("click",(e)=>{
            e.preventDefault();
        })

        $('#btnPret').on("click", ()=>{
            let montant = $("#staticmontant").val();
            let status =  $("#staticStatus").val();
            let codeSecret = $("#staticCode").val();
            if(montant != "" && status !="" && codeSecret != ""){
                let data = {
                    montant:montant,
                    status: status,
                    codeSecret: codeSecret
                }

                fetch(api, {
                    body: JSON.stringify(data),
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                        "authorization": `token ${user.token}`
                    }
                })
                .then((response)=>{
                    if(response.redirected){
                        window.location.href = "../page/login.html"
                    }
                    return response.json()
                })
                .then((val)=> {
                    if(val.msg == "Prêt en cours veuillez patienté pour la validation de votre requête "){
                        $('.infos').text(val.msg).css("color", "green");
                        setTimeout(()=>{
                            window.location.href = "../page/prethisto.html";
                        },2000)
                    }
                    else{
                        $('.infos').text(val.msg).css("color", "red");
                        // setTimeout(()=>{
                        //     window.location.reload();
                        // },2000)
                    }
                })
                .catch((err)=> {
                    $('.infos').text(err).css("color", "red");
                    setTimeout(()=>{
                        window.location.reload();
                    },2000)
                })

            }
            else{
                $('.infos').text('Veuillez remplir tous champs Svp !!').css("color", "red")
                setTimeout(()=>{
                    window.location.reload();
                },2000)
            }

        })



    }
    else{
        window.location.href = "../page/login.html"
    }

})