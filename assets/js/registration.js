// Basic loading after load
import {add_loading, remove_loading_timeout} from './loading.js'
add_loading()
window.onload = () => {
  setTimeout(() => {
    remove_loading_timeout()
  }, 1000);
};

import {nav} from './nav.js'
import {postData} from './fetch.js'
import { apiUrl, domainUrl } from './urls.js';

function validatePassword(password) {
    // Regular expressions to check for uppercase, lowercase, and number
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
  
    // Check if the password meets all the requirements
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    
    // Check if the password length is between 8 and 20 characters
    const isValidLength = password.length >= 8 && password.length <= 20;
  
    // Return true if all conditions are met
    return hasUppercase && hasLowercase && hasNumber && isValidLength;
  }

function validateUsername(username) {
    // Regular expression to check for letters and numbers only and a length between 4 and 20 characters
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
  
    // Check if the username meets the requirement
    return usernameRegex.test(username);
  }

function validateEmail(email) {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    
    return emailRegex.test(email);
  }


const username = document.getElementById('username')

const email = document.getElementById('email')

const password = document.getElementById('password')

const confirm_password = document.getElementById('confirm-password')

const warning_message = document.querySelector('.error')

const register_btn = document.querySelector('.register-btn')

register_btn.addEventListener('click',event=>{
    event.preventDefault()

    const username_value = username.value
    const validate_user_name = validateUsername(username_value)

    const email_value = email.value
    const validate_email = validateEmail(email_value)

    const password_value = password.value
    const confirm_password_value = confirm_password.value
    const validate_password = validatePassword(password_value)

    if(validate_user_name===false){
        const warning_text = "Please recheck username(only use letter and number and 4-20 charecters)"
        give_warning(warning_text)
        return;
    }else if(validate_email===false){
        const warning_text = "Please submit a valid email."
        give_warning(warning_text)
        return;
    }else if(validate_password===false){
        const warning_text = "Please submit a valid password. Require at least 1 uppercase,1 lowercase & 1 number (8-20 charecters long)."
        give_warning(warning_text)
        return;
    }else if(password_value !== confirm_password_value){
        const warning_text = "Password and confirm password doesn't match"
        give_warning(warning_text)
        return;
    }

    const data = {
        "username":username_value,
        "email":email_value,
        "password":password_value,
        "re_password":confirm_password_value
    }
    add_loading()
    const url = apiUrl +`/auth/users/`
    const post_data = postData(url,data)

    post_data.then(data=>{
        console.log(data);
        if(data.id){
            alert("Successfully created an account please login.")
            setTimeout(() => {
                remove_loading_timeout()
                window.location.href = domainUrl+`/login.html`
            }, 2000);

        }else{
            remove_loading_timeout()
            if(data.username){
                give_warning("Username already exist.")
            }else if(data.email){
                give_warning("Email already exist.")
            }else if(data.password){
                give_warning("Password too similar to email.")
            }else{
                alert("error")
            }
        }
    })

})

function give_warning(warning_text){
    warning_message.textContent = warning_text
    warning_message.classList.remove('hidden')
    warning_message.classList.add('shake-text')
    setTimeout(() => {
        warning_message.classList.remove('shake-text')
    }, 2000);
}