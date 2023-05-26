$(document).ready(()=>{
    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/pret/"
    
    let user = sessionStorage.getItem("sessionUser");
    user = JSON.parse(user);

    if(user != null){
        let url = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/pretAllUser/${user.userId}`

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
                            window.location.href = "../page/pretHisto.html";
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

        fetch(url,{
            headers:{
                "authorization":`token ${user.token}`
            }
        })
        .then((response) => {
            if(response.redirected){
                window.location.href ="../page/login.html"
            }
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            data.data.map( ele => {
                let dat = new Date(ele.date)
                $('.pretHistori').append(`
                <div class="row card p-4 ms-2 mb-2">
                <div class="col-lg-12 col-md-10 col-sm-10 ">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-md-6">
                            <h6>Souscription</h6>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-md-6">
                            <p>Date: ${dat.getUTCDate()}/${dat.getMonth()}/${dat.getUTCFullYear()}</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-md-6">
                            <p>Prêt:${ele.status}</p>
                        </div>
                       
                        <div class="col-lg-12 col-sm-6 col-md-6">
                            <p>Montant: ${ele.montant} Fr</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-md-6">
                            <p>Numéro de transaction: ${ele._id}</p>
                        </div>
                    </div>
                </div>
            </div>
                `)
            } )
        })
        .catch((err)=> console.log(err))





    }
    else{
        window.location.href = "../page/login.html"
    }

})