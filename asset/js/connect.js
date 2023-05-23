
document.addEventListener("DOMContentLoaded", ()=>{

const api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/signup/"
let nom = document.querySelector(".nom")
let prenom = document.querySelector(".prenom")
let adresse = document.querySelector(".adresse");
let pays = document.querySelector(".pays");
let contact = document.querySelector(".contact");
let email = document.querySelector(".email");
let emailCom = document.querySelector(".emailCom");
let genre = document.querySelector(".genre");
let statutCompte = document.querySelector(".statutCompte");
let statutExist = document.querySelectorAll('.statutExist');
let carteVisa = document.querySelectorAll(".carteVisa");
let password = document.querySelector(".password");
let password_c = document.querySelector(".password_c");
let btn = document.getElementById("bttn");
let myForm = document.querySelector(".myForm")

myForm.addEventListener("submit", (e)=>{
    e.preventDefault(); // pour stopper l'action du formulaire afin de mieux analyser nos reponse qui seront fournies
})

// verification de notre email
function verifEmail(email, verif) {
    return (email.value == verif.value?true:false)   
}
// verification de notre password
function verifpassword(password, verif) {
    return (password.value == verif.value?true:false) ;
}


btn.addEventListener("click", ()=> {

if( nom.value!="" && prenom.value != "" && adresse.value != "" && contact.value != "" && pays.value != "" && genre.value != "" && email.value != "" && emailCom.value != "" && password.value != "" && password_c.value != ""){
    const valEmail = verifEmail(email,emailCom)
    const valpass = verifpassword(password, password_c);
    if(valEmail == true){
        if( valpass == true){
            if( password.value.length >= 6){
                if( contact.value.length >= 8){

                    let data ={
                        nom:nom.value,
                        prenom:prenom.value,
                        adresse:adresse.value,
                        contact:contact.value,
                        email:email.value,
                        genre:document.querySelector(".genre:checked").value,
                        pays:pays.value,
                        statutCompte: document.querySelector(".statutCompte:checked").value,
                        statutExist: document.querySelector(".statutExist:checked").value,
                        carteVisa:  document.querySelector(".carteVisa:checked").value,
                        password:  password.value
                    }
                    
                    let request = new Request(api,{
                        body:JSON.stringify(data),
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                        })
                        fetch(request)
                        .then(res => res.json())
                        .then((data)=>{
                            let msg = document.querySelector(".msg")
                            msg.textContent = "Merci pour votre inscription à Quick Bank,VOTRE RAPIDE ET FIABLE"
                            msg.style.color = "#4DB0BA"
                            setTimeout(()=>{
                                window.location.href = "../../page/login.html"
                            },100)


                            console.log(data.msg);
                        })
                        .catch(error=> {
                            let msg = document.querySelector(".msg")
                            msg.textContent = error.message
                            msg.style.color = "#4DB0BA"
                        })
                }
                else{
                    document.querySelector('.verifCon').textContent = "contact trop court"
                    document.querySelector('.verifCon').style.color = "red"

                    setTimeout(() => {
                        window.location.reload(true);
                      }, 200);
                }
            }
            else{
                document.querySelector('.verifpass').textContent = "Mot de passe trop court"
                document.querySelector('.verifpass').style.color = "red"
                setTimeout(() => {
                    window.location.reload(true);
                  },200); 

            }
        }
        else{
            document.querySelector('.verifpass').textContent = "Mot de passe incorrecte"
            document.querySelector('.verifpass').style.color = "red"
            setTimeout(() => {
                window.location.reload(true);
              },200);
        }
    }
    else{
        document.querySelector(".verifemail").textContent = "Email incorrect!!";
        document.querySelector('.verifemail').style.color = "red"
        
    }
}
else{
    console.log("ok")
    document.querySelector(".msg").textContent = "Veuillez rempli tout les champs";
    document.querySelector('.msg').style.color = "red";
    window.location.reload();
    
   
}

    
    // console.log(document.querySelector(".statutCompte:checked").value)


})










})



