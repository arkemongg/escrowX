import { removeCookie, userAndToken } from "./cookies.js"
import { add_loading, remove_loading_timeout_custom, remove_loading_timeout_custom_location } from "./loading.js";
import { domainUrl } from "./urls.js"

const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,matic')
const ltc_price = document.querySelector('.ltc-price')
const btc_price = document.querySelector('.btc-price')
pricesWs.onmessage = function (msg) {
    let data = JSON.parse(msg.data)
    if(data.bitcoin !== undefined){
        const priceUsd = parseFloat(data.bitcoin);
        const roundedPrice = priceUsd.toFixed(3);
        btc_price.textContent = roundedPrice + "$";
    }
    fetch("https://api.coincap.io/v2/assets/litecoin")
    .then(response => response.text())
    .then(result => {
        let data = JSON.parse(result)
        const priceUsd = parseFloat(data.data.priceUsd);
        const roundedPrice = priceUsd.toFixed(3);
        ltc_price.textContent = roundedPrice + "$";
    })
    .catch(error => console.log('error', error));
}

const nav_search = document.querySelectorAll('.search-nav')
nav_search.forEach(search_btn=>{
    search_btn.addEventListener('click',event=>{
        event.preventDefault()
        
        const value = event.target.parentElement.querySelector('input').value
        window.location = domainUrl+`/products.html?search=${value}`
    })
})

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