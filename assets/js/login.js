import {setCookie} from "./cookies.js";
import { postData,fetchDataWithJwt } from "./fetch.js";
import { nav } from "./nav.js";

import { apiUrl } from "./urls.js";

const username = document.getElementById('username')
const password = document.getElementById('password')

const loginBtn = document.querySelector('.login-btn')

loginBtn.addEventListener('click',event=>{
    event.preventDefault()
    const userValue = username.value
    const passoword = password.value
    const err = document.querySelector('.err')
    if(userValue==="" || passoword===""){
        err.textContent = "Please fill the form."
        err.classList.remove('hidden')
        return;
    }
    const data = {
        "username":userValue,
        "password":passoword
    }
    const url = apiUrl+`/auth/jwt/create/`
    const postLogin = postData(url,data)
    postLogin.then(data=>{
        if(data.access){
            let jwtToken = data.access
            const url = apiUrl+`/api/customer/`
            fetchDataWithJwt(url,data.access)
            .then(data=>{
                let user = data[0]
                let combinedData = {
                    user: user,
                    token: jwtToken
                };
                setCookie("user",combinedData)
            })
            
        }else{
            err.textContent = "Invalid login details."
            err.classList.remove('hidden')
        }
    })

})
