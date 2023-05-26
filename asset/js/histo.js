$(document).ready(()=>{
    let user = sessionStorage.getItem("sessionUser")
    user = JSON.parse(user);

    if(user != null){
        let vire = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/virementAlluser/${user.userId}`
        let credit = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/crediteAlluser/${user.userId}`
        let debite = `https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/debiteAlluser/${user.userId}`
        let histoepa =`https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/histoEpargne/${user.userId}`

        fetch(vire,{
            method:"GET",
            headers: {
                "authorization": `token ${user.token}`
            }
        })
        .then((response)=>{
            if(response.redirected){
                window.location.href = "../page/login.html"
            }
            return response.json()
        })
        .then((data) => {
            data.data.map( item => {
                let dat = new Date(item.date)
            // let div = $('<div>')
            // div.addClass('row card p-4 ms-2 mb-2 addHisto')
            $(".AjoutHisto").append(`
            <div class="row card p-4 ms-2 mb-2 ">
            <div class="col-lg-12 col-md-10 col-sm-10 ">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-sm-6">
                            <h6>Virement</h6>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-sm-6">
                            <p>Date: <span>${dat.getUTCDate()}/${dat.getMonth()}/${dat.getUTCFullYear()}</span></p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Numero client: ${item.numeroCompte}</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Email client: ${item.emailClient}</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Montant: ${item.montant} Fr CFA</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Numéro de transaction: ${item._id}</p>
                        </div>
                    </div>
                </div>
                </div>
                `);
            // $(".AjoutHisto").append(div)
            })
        })
        .catch((err) => console.log(err))
// ajout credit histo

        fetch(credit,{
            method:"GET",
            headers: {
                "authorization": `token ${user.token}`
            }
        })
        .then((response)=>{
            if(response.redirected){
                window.location.href = "../page/login.html"
            }
            return response.json()
        })
        .then((data) => {
            data.data.map( item => {
                let dat = new Date(item.date)
            $(".AjoutHisto").append(`
            <div class="row card p-4 ms-2 mb-2 ">
            <div class="col-lg-12 col-md-10 col-sm-10 ">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-sm-6">
                            <h6>Crédité</h6>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-sm-6">
                            <p>Date: <span>${dat.getUTCDate()}/${dat.getMonth()}/${dat.getUTCFullYear()}</span></p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Numero Crédité: ${item.numero}</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Moyens du Transfert: ${item.moyenTrans}</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Montant: ${item.montant} Fr CFA</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Numéro de transaction: ${item._id}</p>
                        </div>
                    </div>
                </div>
                </div>
                `);
            })
        })
        .catch((err) => console.log(err));

// histor debite
        fetch(debite,{
            method:"GET",
            headers: {
                "authorization": `token ${user.token}`
            }
        })
        .then((response)=>{
            if(response.redirected){
                window.location.href = "../page/login.html"
            }
            return response.json()
        })
        .then((data) => {
            data.data.map( item => {
            let dat = new Date(item.date)
            $(".epagHistori").append(`
            <div class="row card p-4 ms-2 mb-2">
                <div class="col-lg-12 col-md-10 col-sm-10 ">
                    <div class="row">
                        <div class="col-lg-6 col-sm-3 col-sm-3">
                            <h6>Épagne</h6>
                        </div>
                        <div class="col-lg-6 col-sm-3 col-sm-3">
                            <p>Date: ${dat.getUTCDate()}/${dat.getMonth()}/${dat.getUTCFullYear()}</p>
                        </div>
                        <div class="col-lg-12 col-sm-3 col-sm-3">
                            <p>LIVRET: A</p>
                        </div>
                        <div class="col-lg-12 col-sm-3 col-sm-3">
                            <p>Montant: ${item.montant} Fr CFA</p>
                        </div>
                        <div class="col-lg-12 col-sm-3 col-sm-3">
                            <p>Numéro de transaction: ${item._id}</p>
                        </div>
                    </div>
                </div>
            </div>
                `);
            })
        })
        .catch((err) => console.log(err))
        

        // histor epargne
        fetch(histoepa,{
            method:"GET",
            headers: {
                "authorization": `token ${user.token}`
            }
        })
        .then((response)=>{
            if(response.redirected){
                window.location.href = "../page/login.html"
            }
            return response.json()
        })
        .then((data) => {
            data.data.map( ele => {
            console.log(ele)
            let dat = new Date(ele.date)
            $(".VoirHisto").append(`
            <div class="row card p-4 ms-2 mb-2 ">
            <div class="col-lg-12 col-md-10 col-sm-10 ">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-sm-6">
                            <h6>Epargne</h6>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-sm-6">
                            <p>Date: <span>${dat.getUTCDate()}/${dat.getMonth()}/${dat.getUTCFullYear()}</span></p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Status: ${ele.status}</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Montant: ${ele.montant} Fr CFA</p>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-sm-6">
                            <p>Numéro de transaction: ${ele._id}</p>
                        </div>
                    </div>
                </div>
                </div>
                `);
            })
        })
        .catch((err) => console.log(err));
    }
    else{
        window.location.href ="../page/login.html"
    }
})