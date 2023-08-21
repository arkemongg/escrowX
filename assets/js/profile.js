import { nav } from "./nav.js"
import {setCookie, sync, userAndToken} from "./cookies.js"
import { apiUrl, domainUrl } from "./urls.js"
import {fetchDataWithJwt, patchDataWithImageJWT,patchDataWithJWT,postDataJWT,putMultipleImagesJWT} from "./fetch.js"


const edit_profile_btn = document.getElementById('edit-profile')
const edit_customer_img = document.querySelector('.edit-customer-img')
const edit_first_name = document.getElementById('edit-first-name')
const edit_last_name = document.getElementById('edit-lastname')
const customerData = userAndToken
const jwtToken = userAndToken.token
function customerDataLoader(customerData){
    const data = customerData.user
    edit_profile_btn.setAttribute('data-customer',data.id)
    edit_profile_btn.setAttribute('data-avatar',data.id)
    const customer_img = document.querySelector('.customer-img')
    if(data.avatar.profile===null){
        
    }else{
        customer_img.src = apiUrl+data.avatar.profile
        edit_customer_img.src = apiUrl+data.avatar.profile
    }

    const email = document.getElementById('email')
    email.textContent = data.email

    const username = document.getElementById('username')
    username.textContent = data.username

    const first_name = document.getElementById('firstname')
    first_name.textContent = data.first_name
    edit_first_name.value = data.first_name

    

    const last_name = document.getElementById('lastname')
    last_name.textContent = data.last_name
    edit_last_name.value = data.last_name
    
    const super_seller = document.getElementById('super-seller')
    super_seller.textContent = data.super_seller ? 'Yes':'No';

    const verified_user = document.getElementById('verified-user')
    verified_user.textContent = data.verified_user ? 'Yes':'No';
    
    const verify_profile_btn = document.getElementById('verify-profile')
    if(verified_user.textContent === "Yes"){
        verify_profile_btn.classList.add('hidden')
    }

    const member_since = document.getElementById('member-since')
    const time = new Date(data.member_since)
    member_since.textContent = time.toUTCString().slice(0, 16)

    const excellent = document.querySelector('.excellent-rating')
    const good = document.querySelector('.good-rating')
    const bad = document.querySelector('.bad-rating')

    excellent.textContent = data.feedback_counter.E
    good.textContent = data.feedback_counter.G
    bad.textContent = data.feedback_counter.B

    // UPDATING THE BALANCE FROM CUSTOMER ACCOUNT
    const balance = document.querySelector('.balance')
    const on_hold = document.querySelector('.on-hold')
    const withdraw_section_btn = document.querySelector('.btn-withdraw-feild')
   
    withdraw_section_btn.setAttribute('balance',data.balance.balance)
    balance.textContent = data.balance.balance +'USD'
    on_hold.textContent = data.balance.on_hold +'USD'
}

customerDataLoader(customerData)

// Edit Proifle Area

const remove_edit_page_section = document.querySelector('.edit-customer-section')

const remove_edit_page_btn = document.querySelector('.remove-edit-profile')

remove_edit_page_btn.addEventListener('click',event=>{
    remove_edit_page_section.classList.toggle('hidden')
})
edit_profile_btn.addEventListener('click',event=>{
    remove_edit_page_section.classList.toggle('hidden')
})

// Auto image show
const input_img = document.querySelector('#image-input');
document.addEventListener('DOMContentLoaded', () => {
    
    
    input_img.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            
            img.onload = () => {
                URL.revokeObjectURL(img.src); // Clean up the temporary URL after the image has loaded
            };
            
            const current_img = document.querySelector('.edit-customer-img');
            current_img.src = img.src;
        } else {
            console.log('No file selected.');
        }
    });
});

const update_customer= document.querySelector('.update-customer-btn')
update_customer.addEventListener('click',event=>{

    const customer_id = edit_profile_btn.getAttribute('data-customer')
    const avatar_id = edit_profile_btn.getAttribute('data-avatar')
    
    const avatar_url = `${apiUrl}/api/customer/${customer_id}/avatar/${avatar_id}/`
    const src = input_img.files[0]
    
    if(src!==undefined){
        const data = patchDataWithImageJWT(avatar_url,src,jwtToken)
        data.then(data=>{
            alert(data.profile)
        })
    }

    const customer_url = `${apiUrl}/api/customer/${customer_id}/`

    let customer_updated_data = {
        'first_name':edit_first_name.value,
        'last_name':edit_last_name.value
    }
    
    const customer_data = patchDataWithJWT(customer_url,customer_updated_data,jwtToken)

    customer_data.then(data=>{
        console.log(data);
        if(data.first_name!==undefined){
            // remove_loading_timeout_reload()
            sync()
        }else{
            const warning = document.querySelector('.edit-profile-warning')
            warning.textContent = 'ERROR'
            warning.classList.remove('hidden')
        }
        
    })

})

// Change Password

const change_password_btn = document.querySelector('.change-password')

change_password_btn.classList.add('.change-password')

change_password_btn.addEventListener('click',event=>{
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
    const warning_message = document.querySelector(".warning-change-password")
    function give_warning(warning_text){
        warning_message.textContent = warning_text
        warning_message.classList.remove('hidden')
        warning_message.classList.add('shake-text')
        setTimeout(() => {
            warning_message.classList.remove('shake-text')
        }, 2000);
    }

    const current_password = document.getElementById('current-password')

    const password = document.getElementById('password')

    const confirm_password = document.getElementById('confirm-password')
    

    if(current_password.value==="" || password.value==="" || confirm_password.value ===""){
        return
    }
    const current_password_value = current_password.value
    const password_value = password.value
    const confirm_password_value = confirm_password.value
    const validate_password = validatePassword(password_value)
    console.log(validate_password);
    if(validate_password===false){
        const warning_text = "Please submit a valid password. Require at least 1 uppercase,1 lowercase & 1 number (8-20 charecters long)."
        give_warning(warning_text)
        return;
    }else if(password_value !== confirm_password_value){
        const warning_text = "Password and confirm password doesn't match"
        give_warning(warning_text)
        return;
    }

    const data = {
        "current_password" : current_password_value,
        "new_password" : password_value
    }
    const reset_url = apiUrl+`/auth/users/set_password/`

    const update_password = postDataJWT(reset_url,data,jwtToken)

    update_password.then(data=>{
        if(data.success){
            const success = document.querySelector('.success-password-change')
            success.classList.remove('hidden')
            setTimeout(() => {
                window.location.reload()
            }, 4000);
        }else if(data.detail){
            const warning_text = data.detail
            give_warning(warning_text)
        }else if(data.current_password){
            
            const warning_text = data.current_password
            give_warning(warning_text)
        }else{
            
            const warning_text = "unexpected error"
            give_warning(warning_text)
        }
    })

})
// Verification section
const verification_section = document.querySelector('.verify-customer-section')

const remove_verificaton_btn = document.querySelector('.remove-verify-area')

remove_verificaton_btn.addEventListener('click',event=>{
    verification_section.classList.toggle('hidden')
})

const verify_profile_btn = document.getElementById('verify-profile')

verify_profile_btn.addEventListener('click',event=>{
    verification_section.classList.toggle('hidden')
})

const upload_verify_files_btn = document.querySelector('.verify-customer-btn')

upload_verify_files_btn.addEventListener('click',event=>{
    event.preventDefault()
    const nid_front_input = document.getElementById('upload-nid-front-img-input')
    const nid_back_input = document.getElementById('upload-nid-back-img-input')
    const nid_selfie_input = document.getElementById('upload-selfie-img-input')

    const front_data = nid_front_input.files[0]
    const back_data = nid_back_input.files[0]
    const selfie_data = nid_selfie_input.files[0]
    
    if(front_data==undefined ||back_data ==undefined || selfie_data == undefined){
        alert("Empty");
        return;
    }
    if (front_data.size > 2 * 1024 * 1024 || back_data.size > 2 * 1024 * 1024 || selfie_data.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
    }
    
    const data = {
        "nid_verify_front":front_data,
        "nid_verify_back":back_data,
        "nid_verify_selfie":selfie_data
    }
    
    const url = apiUrl+`/api/verification/`

    const put_data = putMultipleImagesJWT(url,data,jwtToken)

    put_data.then(data=>{
        if(data.nid_verify_front){
            upload_verify_files_btn.disabled = true;
            const verify_success = document.querySelector('.verify-profile-success')
            verify_success.classList.remove('hidden')

            setTimeout(() => {
                window.location = domainUrl
            }, 5000);
        }else if(data.error){
            
            const warning = document.querySelector(".verify-profile-warning")
            warning.textContent = data.error
            upload_verify_files_btn.disabled = true;
            warning.classList.remove("hidden")
            setTimeout(() => {
                window.location = domainUrl
            }, 5000);
        }else{
            const warning = document.querySelector(".verify-profile-warning")
            warning.textContent = "Error"
            warning.classList.remove("hidden")
        }
    })
})

const syncProfile = document.getElementById("sync-profile")

syncProfile.addEventListener("click",event=>{
    sync()
})


// Edit profile area