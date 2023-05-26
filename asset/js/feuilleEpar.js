$(document).ready(()=>{
    let  user = sessionStorage.getItem("sessionUser")
    user = JSON.parse(user)

    if(user != null){
        
        let api =`https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/epargneAllUser/${user.userId}`
        let url =`https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/histoEpargne/${user.userId}`
        fetch(api,{
            headers: {
            "authorization": `token ${user.token}`
        }})
        .then((response)=>{
            if(response.redirected){
                window.location.href ="../page/login.html"
            }
            return response.json()
        })
        .then((data)=> {
            data.data.map(item =>{
                $('.soldeEp').text(`${item.solde}`)
            })
           
        })
        .catch((err)=>{
            console.log(err)
        })

        fetch(url,{
            headers: {
            "authorization": `token ${user.token}`
        }})
        .then((response)=>{
            if(response.redirected){
                window.location.href ="../page/login.html"
            }
            return response.json()
        })
        .then((data)=> {
           let feuille = data.data
            for (let i = 0; i < feuille.length; i++) {
                console.log(i)
                $('.ajoutFeuil').append(`
                <div class="col-lg-4 col-sm-4 col-md-4">
                <div class="row text-center card">
                <div class="col-lg-12">
                    <i class="bi bi-journal-plus"></i>
                </div>
                <div class="col-lg-12">
                    <h3>${feuille[i].status} ${i}</h3>
                </div>
                <div class="col-lg-12">
                    <p>M:${feuille[i].montant}Fr</p>
                </div>
                </div>
                </div>
                `)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    else{
        window.location.href = "../page/login.html"
    }
    
})