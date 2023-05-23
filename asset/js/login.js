document.addEventListener('DOMContentLoaded', ()=>{

    let api = "https://courageous-churros-6e7c37.netlify.app/.netlify/functions/server/login/"

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let formEle = document.querySelector('.formEle');
    let btn = document.getElementById('bttn');


    formEle.addEventListener("submit", (e)=>{
        e.preventDefault();
    })

    btn.addEventListener("click", ()=>{
        let data = {
            email: email.value,
            password: password.value
        }
        
        let request = new Request(api, {
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        })
        fetch(request)
        .then((response) => response.json())
        .then((data)=>{
            if( data.userId){
                let msg = document.querySelector(".msg")
                msg.textContent = "inscription valider"
                msg.style.color = "green"
                sessionStorage.setItem("sessionUser", JSON.stringify(data))

                setTimeout(()=>{
                    window.location.href = "../../page/espaceClient.html"
                },100)

                console.log(data)
            }
            else{
                let msg = document.querySelector(".msg")
                msg.textContent = data.msg;
                msg.style.color = "red"
            }
           
            
        })
        .catch((err) => 
        console.log(err)
        )
    })

})