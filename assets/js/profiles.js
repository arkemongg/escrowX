import {} from './nav.js'


// // Fetch the customer
// const customer_url = api_url+`api/customer/`

// const edit_profile_btn = document.getElementById('edit-profile')
// const edit_customer_img = document.querySelector('.edit-customer-img')
// const edit_first_name = document.getElementById('edit-first-name')
// const edit_last_name = document.getElementById('edit-lastname')
// const customer_data = getDataJWT(customer_url,jwtToken)

// customer_data.then(data=>{
//     data = data[0]
//     localStorage.setItem('my_id',data.id)
//     edit_profile_btn.setAttribute('data-customer',data.id)
//     edit_profile_btn.setAttribute('data-avatar',data.id)

//     // Customer area
//     const customer_img = document.querySelector('.customer-img')
    
    
//     if(data.avatar.profile===null){
        
//     }else{
//         customer_img.src = api_image_url+data.avatar.profile
//         edit_customer_img.src = api_image_url+data.avatar.profile
//     }

//     const email = document.getElementById('email')
//     email.textContent = data.email

//     const username = document.getElementById('username')
//     username.textContent = data.username

//     const first_name = document.getElementById('firstname')
//     first_name.textContent = data.first_name
//     edit_first_name.value = data.first_name

    

//     const last_name = document.getElementById('lastname')
//     last_name.textContent = data.last_name
//     edit_last_name.value = data.last_name
    
//     const super_seller = document.getElementById('super-seller')
//     super_seller.textContent = data.super_seller ? 'Yes':'No';

//     const verified_user = document.getElementById('verified-user')
//     verified_user.textContent = data.verified_user ? 'Yes':'No';
    
//     const verify_profile_btn = document.getElementById('verify-profile')
//     if(verified_user.textContent === "Yes"){
//         verify_profile_btn.classList.add('hidden')
//     }
    
//     const member_since = document.getElementById('member-since')
//     const time = new Date(data.member_since)
//     member_since.textContent = time.toUTCString();

//     const excellent = document.querySelector('.excellent-rating')
//     const good = document.querySelector('.good-rating')
//     const bad = document.querySelector('.bad-rating')

//     excellent.textContent = data.feedback_counter.E
//     good.textContent = data.feedback_counter.G
//     bad.textContent = data.feedback_counter.B

// // UPDATING THE BALANCE FROM CUSTOMER ACCOUNT
//     const balance = document.querySelector('.balance')
//     const on_hold = document.querySelector('.on-hold')
//     const withdraw_section_btn = document.querySelector('.btn-withdraw-feild')

//     withdraw_section_btn.setAttribute('balance',data.balance.balance)
//     balance.textContent = data.balance.balance +'USD'
//     on_hold.textContent = data.balance.on_hold +'USD'
// })

// Verification section
// const verification_section = document.querySelector('.verify-customer-section')

// const remove_verificaton_btn = document.querySelector('.remove-verify-area')

// remove_verificaton_btn.addEventListener('click',event=>{
//     verification_section.classList.toggle('hidden')
// })

// const verify_profile_btn = document.getElementById('verify-profile')

// verify_profile_btn.addEventListener('click',event=>{
//     verification_section.classList.toggle('hidden')
// })

// const upload_verify_files_btn = document.querySelector('.verify-customer-btn')

// upload_verify_files_btn.addEventListener('click',event=>{
//     event.preventDefault()
//     const nid_front_input = document.getElementById('upload-nid-front-img-input')
//     const nid_back_input = document.getElementById('upload-nid-back-img-input')
//     const nid_selfie_input = document.getElementById('upload-selfie-img-input')

//     const front_data = nid_front_input.files[0]
//     const back_data = nid_back_input.files[0]
//     const selfie_data = nid_selfie_input.files[0]
    
//     if(front_data==undefined ||back_data ==undefined || selfie_data == undefined){
//         return;
//     }
    
//     add_loading()
//     const data = {
//         "nid_verify_front":front_data,
//         "nid_verify_back":back_data,
//         "nid_verify_selfie":selfie_data
//     }
    
//     const url = api_url+`api/verification/`

//     const put_data = putMultipleImagesJWT(url,data,jwtToken)

//     put_data.then(data=>{
//         if(data.nid_verify_front){
//             remove_loading_timeout()
//             upload_verify_files_btn.disabled = true;
//             const verify_success = document.querySelector('.verify-profile-success')
//             verify_success.classList.remove('hidden')

//             setTimeout(() => {
//                 window.location = domain_url
//             }, 5000);
//         }else if(data.error){
//             remove_loading_timeout()
//             const warning = document.querySelector(".verify-profile-warning")
//             warning.textContent = data.error
//             upload_verify_files_btn.disabled = true;
//             warning.classList.remove("hidden")
//             setTimeout(() => {
//                 window.location = domain_url
//             }, 5000);
//         }else{
//             remove_loading_timeout()
//             const warning = document.querySelector(".verify-profile-warning")
//             warning.textContent = "Error"
//             warning.classList.remove("hidden")
//         }
//     })
// })

// // remove the edit page



// // Auto image show
// const input_img = document.querySelector('#image-input');
// document.addEventListener('DOMContentLoaded', () => {
    
    
//     input_img.addEventListener('change', (event) => {
//         const file = event.target.files[0];

//         if (file) {
//             const img = new Image();
//             img.src = URL.createObjectURL(file);
            
//             img.onload = () => {
//                 URL.revokeObjectURL(img.src); // Clean up the temporary URL after the image has loaded
//             };
            
//             const current_img = document.querySelector('.edit-customer-img');
//             current_img.src = img.src;
//         } else {
//             console.log('No file selected.');
//         }
//     });
// });


// const update_customer= document.querySelector('.update-customer-btn')
// update_customer.addEventListener('click',event=>{

//     add_loading()

//     const customer_id = edit_profile_btn.getAttribute('data-customer')
//     const avatar_id = edit_profile_btn.getAttribute('data-avatar')
    
//     const avatar_url = `${api_url}api/customer/${customer_id}/avatar/${avatar_id}/`
//     const src = input_img.files[0]
    
//     if(src!==undefined){
//         const data = patchDataWithImageJWT(avatar_url,src,jwtToken)
//         data.then(data=>{
//             console.log(data);
//         })
//     }

//     const customer_url = `${api_url}api/customer/${customer_id}/`

//     let customer_updated_data = {
//         'first_name':edit_first_name.value,
//         'last_name':edit_last_name.value
//     }
//     const customer_data = patchDataWithJWT(customer_url,customer_updated_data,jwtToken)

//     customer_data.then(data=>{
        
//         if(data.first_name!==undefined){
//             remove_loading_timeout_reload()
//         }else{
//             const warning = document.querySelector('.edit-profile-warning')
//             warning.textContent = 'ERROR'
//             warning.classList.remove('hidden')
//         }
        
//     })

// })

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
    const data = {
        "current_password" : current_password_value,
        "new_password" : password_value
    }
    const restet_url = api_url+`auth/users/set_password/`

    const update_password = postDataJWT(restet_url,data,jwtToken)

    update_password.then(data=>{
        if(data.success){
            remove_loading_timeout()
            const success = document.querySelector('.success-password-change')
            success.classList.remove('hidden')
            setTimeout(() => {
                window.location.reload()
            }, 4000);
        }else if(data.detail){
            remove_loading_timeout()
            const warning_text = data.detail
            give_warning(warning_text)
        }else if(data.current_password){
            remove_loading()
            const warning_text = data.current_password
            give_warning(warning_text)
        }else{
            remove_loading_timeout()
            const warning_text = "unexpected error"
            give_warning(warning_text)
        }
    })

})
// Edit profile area


// Profile Features Area

// Deposit Balance
const deposit_page_btn = document.querySelector('.btn-deposit-feild')



const close_deposit_page_btn = document.querySelector('.remove-deposit-page')
const deposit_confirm_btn = document.querySelector('.deposit-confirm-btn')

const deposit_page = document.querySelector('.deposit-section')

const deposit_created = document.querySelector('.deposit-created')
const deposit_form_area = document.querySelector('.deposit')


deposit_page_btn.addEventListener('click',event=>{
    deposit_page.classList.toggle('hidden')
})
close_deposit_page_btn.addEventListener('click',event=>{
    deposit_page.classList.toggle('hidden')
    deposit_created.classList.add('hidden')
    deposit_form_area.classList.remove('hidden')
})

deposit_confirm_btn.addEventListener('click',event=>{
    event.preventDefault()
    
    const deposit_input = document.querySelector('.deposit-amount')

    const value = deposit_input.value
    deposit_input.value = ""

    if(value=="" || parseInt(value)==0 || parseInt(value)<0){
        return;
    }
    add_loading()
    const data = {
        "amount":value
    }
    const deposit_url = api_url+`api/deposit/`
    
    const post_data = postDataJWT(deposit_url,data,jwtToken)

    post_data.then(data=>{
        if(data.id){
            remove_loading_timeout()
            const pay_now = document.getElementById('pay-now-deposit')
            pay_now.href = data.payment_url
            deposit_form_area.classList.add('hidden')
            deposit_created.classList.remove('hidden')
            function updateCountdown() {
                const counterElement = document.querySelector('.redirect-counter');
                let currentCount = parseInt(counterElement.textContent);

                if (currentCount === 1) {
                    window.location.reload()
                    clearInterval(countdownInterval);
                }
    
                currentCount--;

                counterElement.innerHTML = currentCount;
            }
    
            // Set the interval to execute the updateCountdown function every 1 second (1000 milliseconds)
            setInterval(() => {
                updateCountdown();
            }, 1000);
        }else if(data.error){
            remove_loading()
            const deposit_warning = document.querySelector('.deposit-warning')
            deposit_warning.textContent = data.error
            deposit_warning.classList.remove('hidden')
        }else{
            remove_loading()
            const deposit_warning = document.querySelector('.deposit-warning')
            deposit_warning.textContent = data.amount
            deposit_warning.classList.remove('hidden')
        }
        
    })
})
// deposit 

// Withdraw BTN
const withdraw_section = document.querySelector('.withdraw-section')
const remove_withdraw_btn = document.querySelector('.remove-withdraw-page')
remove_withdraw_btn.addEventListener('click',event=>{
    withdraw_section.classList.toggle('hidden')
})

const withdraw_section_btn = document.querySelector('.btn-withdraw-feild')

withdraw_section_btn.addEventListener('click',event=>{
    withdraw_section.classList.toggle('hidden')

})

const withdraw_confrim_btn = document.querySelector('.withdraw-confirm-btn')

withdraw_confrim_btn.addEventListener('click',event=>{
    event.preventDefault()
    const current_balance =  withdraw_section_btn.getAttribute('balance')
    add_loading()
    const crypto = document.querySelector('.select-crypto').value
    const amount = document.querySelector('.withdraw-amount').value
    const address = document.querySelector('.withdraw-address').value
    const warning = document.querySelector('.withdraw-warning')
    if(amount==""){
        warning.textContent = "Amount Empty"
        warning.classList.remove('hidden')
        remove_loading()
        return
    }else if(parseInt(amount)>parseInt(current_balance) || parseInt(amount)==0){
        warning.textContent = "Not Enough Balance"
        warning.classList.remove('hidden')
        remove_loading()
        return;
    }else if(address==""){
        warning.textContent = "Address Empty"
        warning.classList.remove('hidden')
        remove_loading()
        return
    }

    const withdraw_url = api_url+`api/withdraw/`
    const post_data = {
        "amount":amount,
        "crypto":crypto,
        "cryptoaddress":address
    }

    const post_withdraw = postDataJWT(withdraw_url,post_data,jwtToken)

    post_withdraw.then(data=>{
        if(data.id){
            const withdraw = document.querySelector('.withdraw')
            const withdraw_created = document.querySelector('.withdraw-created')
            remove_loading_timeout()
            
            withdraw.classList.add('hidden')
            withdraw_created.classList.remove('hidden')

            function updateCountdown() {
                const counterElement = document.querySelector('.redirect-counter-withdraw');
                let currentCount = parseInt(counterElement.textContent);

                if (currentCount === 1) {
                    window.location.reload()
                    clearInterval(countdownInterval);
                }
    
                currentCount--;

                counterElement.innerHTML = currentCount;
            }
    
            // Set the interval to execute the updateCountdown function every 1 second (1000 milliseconds)
            setInterval(() => {
                updateCountdown();
            }, 1000);
        }else{
            warning.textContent = "Error"
            warning.classList.remove('hidden')
            remove_loading_timeout_custom(2000)
        }
    })
})



// Withdraw BTN

// TRANSACTIONS


const transaction_lists = document.querySelector('.transactions-list')
const transactions_url = api_url+`api/transactions/`


function transactions(transactions_url){
    const transactions_prev = document.querySelector('.transactions-prev')
    const transactions_next = document.querySelector('.transactions-next')

    const transactions_data = getDataJWT(transactions_url,jwtToken)
    transactions_data.then(data=>{
        transactions_prev.setAttribute('data-prev-url',data.previous)
        transactions_next.setAttribute('data-next-url',data.next)
        data = data.results
        data.forEach(t=>{
            const id = t.id
            const amount = t.amount
            const status = t.status
            const payment_url = t.payment_url 
            const transaction_direction = t.transaction_direction
            
            let date = new Date(t.created_at)
            const created_at = date.toUTCString().slice(0, 11)

            const li = generateTransaction(id,amount,status,payment_url,transaction_direction,created_at)
            transaction_lists.appendChild(li)
        })
    })
}
transactions(transactions_url)
const transactions_prev = document.querySelector('.transactions-prev')
const transactions_next = document.querySelector('.transactions-next')

transactions_prev.addEventListener('click',event=>{
    add_loading()
    
    const url = transactions_prev.getAttribute('data-prev-url')
    if(url==="null"){
        remove_loading()
        return
    }
    let first_child = transaction_lists.firstElementChild
    transaction_lists.innerHTML = ''
    transaction_lists.appendChild(first_child)
    transactions(url)
    remove_loading_timeout()
})

transactions_next.addEventListener('click',event=>{
    add_loading()
    const url = transactions_next.getAttribute('data-next-url')
    
    if(url==="null"){
        remove_loading()
        return
    }
    let first_child = transaction_lists.firstElementChild
    transaction_lists.innerHTML = ''
    transaction_lists.appendChild(first_child)
    transactions(url)
    remove_loading_timeout()
})


// Balance History 

const balance_history_list = document.querySelector('.balance-histories-list')

const balance_history_url = api_url+`api/balancehistory/`



function balancehistory(balance_history_url){
    const balance_history_data = getDataJWT(balance_history_url,jwtToken)

    const balance_history_prev = document.querySelector('.balance-histories-prev')
    const balance_history_next = document.querySelector('.balance-histories-next')

    balance_history_data.then(data=>{
        balance_history_prev.setAttribute('data-prev-url',data.previous)
        balance_history_next.setAttribute('data-next-url',data.next)
        data = data.results

        data.forEach(t=>{
            console.log(t);
            const amount = t.amount
            const direction = t.transaction_direction
            const order_id = t.order
            const last_balance = t.last_balance
            console.log(direction);
            const li = generate_balance_history(amount,order_id,direction,last_balance)
            balance_history_list.appendChild(li)
        })
    })
}

balancehistory(balance_history_url)
const balance_history_prev = document.querySelector('.balance-histories-prev')
const balance_history_next = document.querySelector('.balance-histories-next')


balance_history_prev.addEventListener('click',event=>{
    add_loading()
    const url = balance_history_prev.getAttribute('data-prev-url')
    if(url==="null"){
        remove_loading()
        return
    }
    let first_child = balance_history_list.firstElementChild
    balance_history_list.innerHTML = ''
    balance_history_list.appendChild(first_child)
    balancehistory(url)
    remove_loading_timeout()
})

balance_history_next.addEventListener('click',event=>{
    add_loading()
    
    const url = balance_history_next.getAttribute('data-next-url')
    if(url==="null"){
        remove_loading()
        return
    }
    let first_child = balance_history_list.firstElementChild
    balance_history_list.innerHTML = ''
    balance_history_list.appendChild(first_child)
    balancehistory(url)
    remove_loading_timeout()
})

// Order Section

const pending_orders_list = document.querySelector('.pending-orders .orders-list')
const complete_orders_list = document.querySelector('.complete-orders .orders-list')
const failed_orders_list = document.querySelector('.failed-orders .orders-list')

const order_url = api_url+`api/order/?limit=8`


async function orders(order_url){
    const order_data = getDataJWT(order_url,jwtToken)

    function getOrderItemsFromSessionStorage() {
        const orderItemsJSON = sessionStorage.getItem('orderItems');
        return orderItemsJSON ? JSON.parse(orderItemsJSON) : {};
    }
    
    function saveOrderItemsToSessionStorage(orderItemsObject) {
        const orderItemsJSON = JSON.stringify(orderItemsObject);
        sessionStorage.setItem('orderItems', orderItemsJSON);
    }
    
    function setOrderItems(orderId, orderItemsArray) {
        const orderItemsObject = getOrderItemsFromSessionStorage();
        orderItemsObject[orderId] = orderItemsArray;
        saveOrderItemsToSessionStorage(orderItemsObject);
    }
    
    function getOrderItem(orderId) {
        const orderItemsObject = getOrderItemsFromSessionStorage();
        return orderItemsObject[orderId] || null;
    }
    let next_url = document.querySelector('.order-next');
    let previous_url = document.querySelector('.order-previous')

    order_data.then(data=>{
        let count = data.count
        next_url.setAttribute('data-url',data.next)
        previous_url.setAttribute('data-url',data.previous)
        data = data.results
        const order_count = document.querySelector('.total-orders-count')
        order_count.textContent = count
        let p = 0;
        let f = 0;
        let c = 0;
        data.forEach(order=>{
            let li = ""
            if(order.order_status == "P"){
                p++;
                let date = new Date(order.created_at)
                li = createPendingOrderTemplate(order.id,order.order_status,order.total,'Update','-',date.toUTCString().slice(0, 11))
                const escrow_btn = li.querySelector('.escrow-btn')
                li.setAttribute('data-escrow-id',order.escrow_id)
                escrow_btn.addEventListener('click',event=>{
                    const li = event.target.closest('li')
                    const order_id = li.querySelector('#order-id').textContent
                    const escrow_order_id = document.querySelector('.escrow-order-id')
                    escrow_order_id.textContent =`#`+ order_id
                    escrow_page.classList.toggle('hidden')
    
                    const escrow_id = li.getAttribute('data-escrow-id')
                    const update_escrow_btn = document.querySelector('.update-escrow-btn')
                    update_escrow_btn.setAttribute('data-escrow-id',escrow_id)
                    update_escrow_btn.setAttribute('data-order-id',order_id)
                })
                pending_orders_list.appendChild(li)
            }else if(order.order_status === 'F'){
                f++;
                let date = new Date(order.created_at)
                li = createFailedOrderTemplate(order.id,order.order_status,order.total,'-','-',date.toUTCString().slice(0, 11))
                failed_orders_list.appendChild(li)
                
            }else if(order.order_status ==='C'){
                c++;
                
                let date = new Date(order.created_at)
                li = createCompleteOrderTemplate(order.id,order.order_status,order.total,order.escrow_status,'-',date.toUTCString().slice(0, 11))
                complete_orders_list.appendChild(li)
                if(order.feedback !==null){
                    const feedback = li.querySelector('#order-feedback')
                    if(order.feedback.completed){
                        
                        const review_url = domain_url+`seller.html?seller__id=${order.seller}&id=${order.feedback.id}`
                        feedback.innerHTML =`<a class = "feedback_link" target = "_blank" href="${review_url}">${order.feedback.id}</a>`

                    }else{
                        feedback.innerHTML =`<div class="bg-primary submit-feedback-btn" data-feedback-id = ${order.feedback.id}>feedback</div>`
                        const submit_feedback_btn = feedback.querySelector('.submit-feedback-btn')

                        submit_feedback_btn.addEventListener('click',event=>{
                            const feedback_section = document.querySelector('.feedback-submit-section')
                            const comment = document.querySelector('.comment-feedback')
                            comment.setAttribute('placeholder',`Write a feedback for order id  ${order.id}`)
                            feedback_section.classList.toggle('hidden')
                            const post_feedback_btn = document.querySelector('.post-feedback-btn')
                            post_feedback_btn.setAttribute('data-id',`${order.feedback.id}`)
                        })
                    }
                }
            }
         
            setOrderItems(order.id, order.orderitems);
            
            //orderitems view 
            const orderitems_btn = li.querySelector('#order-id')
            orderitems_btn.setAttribute('data-seller-name',order.seller_name)
            orderitems_btn.setAttribute('data-seller-id',order.seller)
    
            orderitems_btn.addEventListener('click',event=>{
                const order_items_section = document.querySelector('.orderitems-section')
                order_items_section.classList.toggle('hidden')
                const order_id = event.target.textContent
                const items = getOrderItem(order_id)
    
                data = items[0]
                console.log(data);
    
                const seller_name = orderitems_btn.getAttribute('data-seller-name')
                const seller_id = orderitems_btn.getAttribute('data-seller-id')
    
    
                const orderitems_order_id = document.querySelector('.orderitems-order-id')
                const product_id = document.querySelector('.orderitems-product-id')
                const product_title = document.querySelector('.orderitems-product-title')
                const product_quantity = document.querySelector('.orderitems-product-quantity')
                const product_unit_price = document.querySelector('.orderitems-product-price')
    
                const order_items_name = document.querySelector('.orderitems-name')
                
                
                orderitems_order_id.textContent = `#`+order_id
                product_id.textContent = data.product
                product_title.textContent = data.product_title
                product_quantity.textContent = data.quantity
                product_unit_price.textContent = data.unit_price
    
                
                order_items_name.textContent = "Seller Profile"
                const seller_url = `${domain_url}seller.html?seller__id=${seller_id}`
                order_items_name.setAttribute('href',seller_url)
              
                
            })
            const pending_btn = document.querySelector('.pending-btn')
            const complete_btn = document.querySelector('.complete-btn')
            const failed_btn = document.querySelector('.failed-btn')
            
            pending_btn.textContent = `Pending ${p}`
            complete_btn.textContent = `Complete ${c}`
            failed_btn.textContent = `Failed ${f}`
        })
    })
}

orders(order_url)
// Next Prev Order

let next_url = document.querySelector('.order-next');
let previous_url = document.querySelector('.order-previous')


previous_url.addEventListener('click',event=>{
    add_loading()
    let url = previous_url.getAttribute('data-url')
    
    if(url==="null"){
        remove_loading()
        return
    }
    let orders_list = document.querySelectorAll('.orders-list .order')
    
    orders_list.forEach(order=>{
        order.remove()
    })

    orders(url)
    remove_loading_timeout()
})

next_url.addEventListener('click',event=>{
    add_loading()
    let url = next_url.getAttribute('data-url')
    console.log(url);
    if(url==="null"){
        remove_loading()
        return
    }
    let orders_list = document.querySelectorAll('.orders-list .order')
    
    orders_list.forEach(order=>{
        order.remove()
    })

    orders(url)
    remove_loading_timeout()

})
// Next Prev Order

const pending_orders = document.querySelector('.pending-orders')
const complete_orders = document.querySelector('.complete-orders')
const failed_orders = document.querySelector('.failed-orders ')

const pending_btn = document.querySelector('.pending-btn')
const complete_btn = document.querySelector('.complete-btn')
const failed_btn = document.querySelector('.failed-btn')

pending_btn.addEventListener('click',event=>{
    complete_btn.classList.remove('selected')
    failed_btn.classList.remove('selected')

    pending_btn.classList.add('selected')
    pending_orders.classList.remove('hidden')

    complete_orders.classList.add('hidden')
    failed_orders.classList.add('hidden')
})

complete_btn.addEventListener('click',event=>{
    pending_btn.classList.remove('selected')
    failed_btn.classList.remove('selected')

    complete_btn.classList.add('selected')
    complete_orders.classList.remove('hidden')

    pending_orders.classList.add('hidden')
    failed_orders.classList.add('hidden')
})
failed_btn.addEventListener('click',event=>{
    pending_btn.classList.remove('selected')
    complete_btn.classList.remove('selected')

    failed_btn.classList.add('selected')
    failed_orders.classList.remove('hidden')

    pending_orders.classList.add('hidden')
    complete_orders.classList.add('hidden')
})


// Remove escrow page

const remove_escrow_page_btn = document.querySelector('.remove-escrow-page-btn')
const escrow_page = document.querySelector('.escrow-page-section')
remove_escrow_page_btn.addEventListener('click',event=>{
    escrow_page.classList.toggle('hidden')
})

// Update order escrow
const update_escrow_btn = document.querySelector('.update-escrow-btn')

update_escrow_btn.addEventListener('click',event=>{
    if (update_escrow_btn.classList.contains("disabled")) {
        event.preventDefault(); // This prevents the default click action.
        return false;
    }

    add_loading()
    const escrow_id = update_escrow_btn.getAttribute('data-escrow-id')
    const order_id = update_escrow_btn.getAttribute('data-order-id')

    const update_escrow_url = api_url+`api/order/${order_id}/escrow/${escrow_id}/`
    
    const escrowSelect = document.querySelector(".escrow-select");
    const selectedValue = escrowSelect.value;
    //const comment = document.getElementById("escrow-comment").value

    if(selectedValue==="Escrow Status"){
        return
    }
    let data = {
        "escrow_status" : selectedValue,
    }
    // else if(selectedValue==="COMMENT"){
    //     data = {
    //         "escrow_status" : selectedValue,
    //         "COMMENT":comment
    //     }
    // }
    const post_data = patchDataWithJWT(update_escrow_url,data,jwtToken)

    post_data.then(data=>{
        if(data.id){
            update_escrow_btn.classList.add('disabled')
            const success = document.querySelector('.success-escrow')
            success.classList.remove('hidden')
            remove_loading()
            
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }else if(data.detail){
            remove_loading()
            const error = document.querySelector('.error-escrow')
            error.textContent = data.detail
            error.classList.remove('hidden')
        }else{
            remove_loading()
            const error = document.querySelector('.error-escrow')
            error.textContent = "error"
            error.classList.remove('hidden')
        }
        console.log(data);
    })
})
// ORDER ITEMS

const remove_orderitems_page_btn = document.querySelector('.remove-orderitems-page-btn')
const order_items_section = document.querySelector('.orderitems-section')

remove_orderitems_page_btn.addEventListener('click',event=>{
    order_items_section.classList.toggle('hidden')
})

// OrderItems

// Feedback

const remove_escrow_section_btn = document.querySelector('.remove-feedback-submit-page-btn')
const feedback_section = document.querySelector('.feedback-submit-section')
remove_escrow_section_btn.addEventListener('click',event=>{
    feedback_section.classList.toggle('hidden')
})
const post_feedback_btn = document.querySelector('.post-feedback-btn')

post_feedback_btn.addEventListener('click',event=>{
    
    const id = post_feedback_btn.getAttribute('data-id')
    const url = api_url+`api/myfeedback/${id}/`
    const feed_back_select = document.querySelector('.select-feedback-status')
    const feedbackwarning = document.querySelector('.feedback-warning ')
    if(feed_back_select.value==1){
        feedbackwarning.classList.remove('hidden')
        return
    }
    add_loading()
    const comment = document.querySelector('.comment-feedback')
    const data = {
        "status":feed_back_select.value,
        "comment":comment.value,
    }   
    const post_data = patchDataWithJWT(url,data,jwtToken)

    post_data.then(data=>{
        if(data.status){
            remove_loading_timeout_reload()
        }else{
           feedbackwarning.classList.remove('hidden')
           remove_loading()
        }
        
    })
})

