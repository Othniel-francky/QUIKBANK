
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
let statutCompte = document.querySelectorAll(".statutCompte");
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


for (var i = 0; i <  statutCompte.length; i++) {
    if (statutCompte[i].checked) {
      console.log(statutCompte[i].value);
      break;
    }
  }
    

// verification de notre password
// function Staus(event) {
    
//     event.forEach(ele => ele.addEventListener("click", (e)=> {
//         let data = ""
//         if( e.target.getAttribute("id") == "staC"){
//             document.getElementById("staE").style.display = "none";
//             e.target.style.backgroundColor = "#4DB0BA"
//             e.target.style.color = "white"
//         }
//         else{
//             document.getElementById("staC").style.display = "none";
//             e.target.style.backgroundColor = "#4DB0BA";
//             e.target.style.color = "white"
//         }
//     }));
// }
// Staus(statutCompte);


btn.addEventListener("click", ()=> {
    
    


})










})


