import { removeCookie, userAndToken } from "./cookies.js"
import { add_loading, remove_loading_timeout_custom, remove_loading_timeout_custom_location } from "./loading.js";
import { domainUrl } from "./urls.js"
console.log(userAndToken);
export const nav = ()=>{
    let jwt = true
    if(userAndToken===null){
        jwt = false
    }
    
    const logOut = document.querySelectorAll('.logout')
    const profile = document.querySelectorAll('.profile')
    const sales = document.querySelectorAll('.sales')
    const message = document.querySelectorAll('.message')
    const login = document.querySelectorAll('.login')

    if(jwt===true){
        logOut.forEach(data=>{
            data.classList.remove('hidden')
            const a = data.querySelector('a')
            a.textContent = "Logout"
        })
        profile.forEach(data=>{
            data.classList.remove('hidden')
            const a = data.querySelector('a')
            a.textContent = "Profile"
        })
        sales.forEach(data=>{
            data.classList.remove('hidden')
            const a = data.querySelector('a')
            a.textContent = "Sales"
        })
        message.forEach(data=>{
            data.classList.remove('hidden')
            const a = data.querySelector('a')
            a.textContent = "Message"
        })
        login.forEach(data=>{
            const parent = data.parentElement
            parent.removeChild(data)
        })
        
        if (window.location.href.includes('login')) {
            window.location = domainUrl
        }
    }else{
        if (window.location.href.includes('messages') || window.location.href.includes('profile') || window.location.href.includes('sales') ) {
            window.location = domainUrl
        }
    }

    const logout = document.querySelectorAll('.logout')

    logout.forEach(lu=>{
        lu.addEventListener('click',event=>{
            add_loading()
            removeCookie("user")
            remove_loading_timeout_custom_location(4000,domainUrl)
        })
    })
}
nav()