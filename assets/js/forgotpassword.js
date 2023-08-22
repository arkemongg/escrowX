// Basic loading after load
import {add_loading, remove_loading_timeout} from './loading.js'
// add_loading()
// window.onload = () => {
//   setTimeout(() => {
//     remove_loading_timeout()
//   }, 1000);
// };

import {nav} from './nav.js'
import {postData} from './fetch.js'
import { apiUrl, domainUrl } from './urls.js';


const url = new URL(window.location)

console.log(url.searchParams.get('token'));
function resetConfirm(){
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


    const password_reset_section = document.querySelector('.reset-password-confrim-section')
    password_reset_section.classList.remove('hidden')
    
    const password = document.getElementById('password')
    const confirm_password = document.getElementById('confirm-password')
    const warning_message = document.querySelector('.reset-password-confirm-warning')

    const uid = url.searchParams.get('uid')
    const token = url.searchParams.get('token')

    const password_reset_confrim_btn = document.querySelector('.reset-password-confrim-btn')

    password_reset_confrim_btn.addEventListener('click',event=>{
        event.preventDefault()
        
        const password_value = password.value
        const confirm_password_value = confirm_password.value
        const validate_password = validatePassword(password_value)
        if(validate_password===false){
            const warning_text = "Please submit a valid password. Require at least 1 uppercase,1 lowercase & 1 number (8-20 charecters long)."
            give_warning(warning_text)
            return;
        }else if(password_value !== confirm_password_value){
            const warning_text = "Password and confirm password doesn't match"
            give_warning(warning_text)
            return;
        }
        add_loading()
        const reset_data = {
            "uid":uid,
            "token":token,
            "new_password":password_value
        }

        const password_reset_confirm_url = apiUrl+`/auth/users/reset_password_confirm/`

        const post_password_reset_data = fetch(password_reset_confirm_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reset_data),
          })
            .then(response => {
              if (response.status === 204) {
                remove_loading_timeout()
                alert("Successfully changed your password. Please login.")
                setTimeout(() => {
                    window.location = domainUrl+`/login.html`
                }, 2000);
              } else {
                remove_loading_timeout()
                const warning_text = "Token Expired / error"
                give_warning(warning_text)
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });

    })
    function give_warning(warning_text){
        warning_message.textContent = warning_text
        warning_message.classList.remove('hidden')
        warning_message.classList.add('shake-text')
        setTimeout(() => {
            warning_message.classList.remove('shake-text')
        }, 2000);
    }
}



function reset(){

    
    function validateEmail(email) {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return emailRegex.test(email);
    }

    
    const password_reset_section = document.querySelector('.reset-password-section')
    password_reset_section.classList.remove('hidden')
    
    const email = document.getElementById('email')
    const warning_message = document.querySelector('.reset-password-warning')

    const reset_password_btn = document.querySelector('.reset-password-btn')

    reset_password_btn.addEventListener('click',event=>{
    event.preventDefault()
    const email_value = email.value
    const validate_email = validateEmail(email_value)
    if(validate_email===false){
        const warning_text = "Please submit a valid email."
        give_warning(warning_text)
        return;
    }    
    add_loading()

    const reset_password_email_url = apiUrl+`/auth/users/reset_password/`

    const reset_data = {
        "email":email_value
    }


    const reset_password_post = fetch(reset_password_email_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reset_data),
      })
        .then(response => {
          if (response.status === 204) {
            const email = document.querySelector('.email-reset')
            alert(`Success: Please check your email : ${email_value}`)
            remove_loading_timeout()
          } else {
            remove_loading_timeout()
            const warning_text = "Invalid email / bad request"
            give_warning(warning_text)
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });


    })

    function give_warning(warning_text){
        warning_message.textContent = warning_text
        warning_message.classList.remove('hidden')
        warning_message.classList.add('shake-text')
        setTimeout(() => {
            warning_message.classList.remove('shake-text')
        }, 2000);
    }    


}



if(url.searchParams.size==2){
    resetConfirm()
}else{
    reset()
}



