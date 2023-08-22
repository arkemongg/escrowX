import { nav } from './nav.js';
import {add_loading, remove_loading_timeout, remove_loading_timeout_custom} from './loading.js'
import { postData } from './fetch.js';
import { apiUrl } from './urls.js';
add_loading()
window.onload = () => {
  setTimeout(() => {
    remove_loading_timeout()
  }, 1000);
};

const send_btn = document.querySelector('.send-btn')

send_btn.addEventListener('click',event=>{
    event.preventDefault()
    const support_url = apiUrl+`/api/support/`
    
    const email_input = document.getElementById('email')
    const subject_input = document.getElementById('subject')
    const message_input = document.getElementById('msg')
    
    if(email_input.value == "" , subject_input.value=="" , message_input.value == ""){
        alert("Please fill the form.")
        return 
    }
    add_loading()
    const data = {
        "subject": subject_input.value,
        "email": email_input.value,
        "message": message_input.value
    }
    
    const post_message = postData(support_url,data)

    post_message.then(data=>{
        if(data.detail){
            alert(data.detail)
            remove_loading_timeout_custom(2000)
        }else if(data.id){
            alert(`Success : ticket id #${data.id}`)
            remove_loading_timeout_custom(3000)
        }else{
            alert(`Error`)
            remove_loading_timeout_custom(3000)
        }
       
    })

    

})