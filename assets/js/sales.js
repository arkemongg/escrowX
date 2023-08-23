import { userAndToken } from './cookies.js'
import { fetchData, fetchDataWithJwt, patchDataandImageJWT, postDataJWT, postDataandImageJWT } from './fetch.js'
import { add_loading, remove_loading, remove_loading_timeout, remove_loading_timeout_custom } from './loading.js'
import {nav} from './nav.js'
import { createProductTemplate, generateCompleteSale, generateFailedSales, generateMyProductItem, generatePendingSale } from './templates.js'
import { apiUrl, domainUrl } from './urls.js'
add_loading()
window.onload = () => {
  setTimeout(() => {
    remove_loading_timeout()
  }, 1000);
};

// Sales 
const pending_sales_list = document.querySelector('.pending-sales .sales-list')
const complete_sales_list = document.querySelector('.complete-sales .sales-list')
const failed_sales_list = document.querySelector('.failed-sales .sales-list')


// OrderItems AKA saleitems page
const salesItemsSection = document.querySelector('.sellitems-section')
const remove_sellitems_page_btn = document.querySelector(".remove-sellitems-page-btn")

remove_sellitems_page_btn.addEventListener('click',event=>{
    salesItemsSection.classList.toggle('hidden')
})

// OrderItems Aka SaleItems page
const customerData = userAndToken
const jwtToken = userAndToken.token
console.log(customerData);

const sale_url = apiUrl+`/api/sales/?order_status=P`

async function sales(sale_url) {
    const sale_data = fetchDataWithJwt(sale_url, jwtToken);
    const sales_prev_btn = document.querySelector('.sales-previous')
    const sales_next_btn = document.querySelector('.sales-next')

    // Save to localstorage
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

    sale_data.then(data=>{
        let count = data.count
        sales_prev_btn.setAttribute('data-prev-url',data.previous)
        sales_next_btn.setAttribute('data-next-url',data.next)
        const sales_count = document.querySelector('.total-sales-count')
        sales_count.textContent = count
        data = data.results

        data.forEach(order=>{
            let li = ""
            let date = new Date(order.created_at)
            const formattedDate = date.toUTCString().slice(0, 11);
            
            if(order.order_status == "P"){
                const pendingSaleData = {
                    id: order.id,
                    status: "Pending",
                    total: order.total,
                    escrowStatus: order.escrow_status,
                    feedback: '-',
                    created_at: formattedDate
                };
                console.log(order);
                li = generatePendingSale(
                    pendingSaleData
                )
                pending_sales_list.appendChild(li)
            }else if(order.order_status == "C"){

                let feedback;
                if(order.feedback!=null){
                    if(order.feedback.completed===false){
                        feedback = "None"
                    }else{
                        feedback = `<a class="bg-primary p-1" target="_blank" href="${domainUrl}/seller.html?seller__id=${userAndToken.user.id}&id=${order.feedback.id}" class="feedback_sales">${order.feedback.id}</a>`
                    }
                }

                console.log(feedback);
                const completedSaleData = {
                    id: order.id,
                    status: "Completed",
                    total: order.total,
                    escrowStatus: "Received",
                    feedback: feedback,
                    created_at: "Sun, 23 Jul"
                  };
                  
                li = generateCompleteSale(
                   completedSaleData
                )
                complete_sales_list.appendChild(li)
            }else if(order.order_status == "F"){
                const failedSaleData = {
                    id: order.id,
                    status: "Failed",
                    total: order.total,
                    escrowStatus: "Not_Received",
                    feedback: '-',
                    created_at: formattedDate
                };
                console.log(order);
                li = generateFailedSales(
                    failedSaleData
                )
                failed_sales_list.appendChild(li)
            }
            
            setOrderItems(order.id, order.orderitems);
            const orderitems_btn = li.querySelector('#sale-id')
            orderitems_btn.setAttribute('data-order-id',order.id)
            orderitems_btn.setAttribute('data-buyer-id',order.buyer)
            orderitems_btn.addEventListener('click',event=>{
                
                salesItemsSection.classList.toggle('hidden')
                
                const sell_items_id = document.querySelector('.sellitems-order-id')
                const sell_items_product_id = document.querySelector('.sellitems-product-id')
                const sell_items_product_title = document.querySelector('.sellitems-product-title')
                const sell_items_product_quantity = document.querySelector('.sellitems-product-quantity')
                const sell_items_product_price = document.querySelector('.sellitems-product-price')



                let order = event.target.closest('p')
                
                const order_id = order.getAttribute('data-order-id');
                
                const items = getOrderItem(order_id)[0]
                sell_items_id.textContent = "#"+order_id
                sell_items_product_id.textContent = items.product
                sell_items_product_title.textContent = items.product_title
                sell_items_product_quantity.textContent = items.quantity
                sell_items_product_price.textContent = items.unit_price +"$"
                
                
                const shipping_email = document.querySelector('.shipping-email')
                const shipping_details = document.querySelector('.shipping-details')
                
                shipping_email.textContent = items.shipping[0].email
                shipping_details.textContent = items.shipping[1].comment
                
                const contact = document.querySelector('.contact-buyer')
                contact.addEventListener('click',event=>{
                    const seller_id = order.getAttribute('data-buyer-id');
                    console.log(seller_id);
                    if(userAndToken===null){
                        add_loading()
                        setTimeout(() => {
                          window.location = domainUrl+`login.html`
                        }, 2000);
                      }else{
                        add_loading()
                        if(userAndToken.user.id == seller_id){
                            remove_loading_timeout_custom(1000)
                            alert("Own Account")
                            return
                        }
                        const post_url = apiUrl+`/api/conversations/`
                        const send_data = {
                          "seller_id":seller_id
                        }
                        const post_data = postDataJWT(post_url,send_data,userAndToken.token)
                    
                        post_data.then(data=>{
                          if(data.id){
                            setTimeout(() => {
                              window.location = domainUrl+`/messages.html?id=${data.id}`
                            }, 3000);
                          }else{
                            remove_loading_timeout()
                            alert(data.error)
                          }
                        })
                      }
                })

            })

        })
    })


    
}

sales(sale_url)
const sales_prev_btn = document.querySelector('.sales-previous')
const sales_next_btn = document.querySelector('.sales-next')

sales_prev_btn.addEventListener('click',event=>{
    const url = sales_prev_btn.getAttribute('data-prev-url')
    if(url==="null"){
        return;
    }
    add_loading()
    let orders_list = document.querySelectorAll('.sales-list .sale')
    
    orders_list.forEach(order=>{
        order.remove()
    })
    sales(url)
    remove_loading_timeout()
})
sales_next_btn.addEventListener('click',event=>{
    const url = sales_next_btn.getAttribute('data-next-url')
    if(url==="null"){
        return;
    }
    add_loading()
    let orders_list = document.querySelectorAll('.sales-list .sale')
    
    orders_list.forEach(order=>{
        order.remove()
    })
    sales(url)
    remove_loading_timeout()

})

// SalesItems

const pending_sales = document.querySelector('.pending-sales')
const complete_sales = document.querySelector('.complete-sales')
const failed_sales= document.querySelector('.failed-sales')

const pending_sales_btn = document.querySelector('.pending-sales-btn')
const complete_sales_btn = document.querySelector('.complete-sales-btn')
const failed_sales_btn = document.querySelector('.failed-sales-btn')

pending_sales_btn.addEventListener('click',event=>{
    add_loading()
    let orders_list = document.querySelectorAll('.sales-list .sale')
    
    orders_list.forEach(order=>{
        order.remove()
    })
    complete_sales_btn.classList.remove('selected')
    failed_sales_btn.classList.remove('selected')

    pending_sales_btn.classList.add('selected')
    pending_sales.classList.remove('hidden')

    complete_sales.classList.add('hidden')
    failed_sales.classList.add('hidden')

    const sale_url = apiUrl+`/api/sales/?order_status=P`
    sales(sale_url)
    remove_loading_timeout()
})

complete_sales_btn.addEventListener('click',event=>{
    add_loading()
    let orders_list = document.querySelectorAll('.sales-list .sale')
    
    orders_list.forEach(order=>{
        order.remove()
    })
    pending_sales_btn.classList.remove('selected')
    failed_sales_btn.classList.remove('selected')

    complete_sales_btn.classList.add('selected')
    complete_sales.classList.remove('hidden')

    pending_sales.classList.add('hidden')
    failed_sales.classList.add('hidden')

    const sale_url = apiUrl+`/api/sales/?order_status=C`
    sales(sale_url)
    remove_loading_timeout()
})

failed_sales_btn.addEventListener('click',event=>{
    add_loading()
    let orders_list = document.querySelectorAll('.sales-list .sale')
    
    orders_list.forEach(order=>{
        order.remove()
    })
    pending_sales_btn.classList.remove('selected')
    complete_sales_btn.classList.remove('selected')

    failed_sales_btn.classList.add('selected')
    failed_sales.classList.remove('hidden')

    pending_sales.classList.add('hidden')
    complete_sales.classList.add('hidden')
    const sale_url = apiUrl+`/api/sales/?order_status=F`
    sales(sale_url)
    remove_loading_timeout()
})

// My Product Area
const my_products_list = document.querySelector('.myproducts-list')

const my_product_api_url = apiUrl+`/api/myproducts/?limit=8&ordering=-id`

// Save to sessionStorage
function getItemFromSessionStorage(itemName) {
    const itemJSON = sessionStorage.getItem(itemName);
    return itemJSON ? JSON.parse(itemJSON) : null;
}

function saveItemToSessionStorage(itemName, item) {
    const itemJSON = JSON.stringify(item);
    sessionStorage.setItem(itemName, itemJSON);
}

function setItem(itemName, id, array) {
    const itemsObject = getItemFromSessionStorage(itemName) || {};
    itemsObject[id] = array;
    saveItemToSessionStorage(itemName, itemsObject);
}

function getItem(itemName, id) {
    const itemsObject = getItemFromSessionStorage(itemName) || {};
    return itemsObject[id] || null;
}

// Create Category Select
const category_data = fetchData(apiUrl+`/api/category/`)
category_data.then(data=>{
    
    const edit_category = document.getElementById('edit-category')
    const create_category = document.getElementById('create-category')
    data.forEach(category=>{
        const option = document.createElement('option');
        const option2 = document.createElement('option');

        option.value = category.id;
        option.textContent = category.title;
        option2.value = category.id;
        option2.textContent = category.title;
        edit_category.appendChild(option);

        create_category.appendChild(option2)
    })
})

function myProductsLoader(my_product_api_url){
    
    const myproducts_data = fetchDataWithJwt(my_product_api_url,jwtToken)
    const product_count = document.querySelector('.product-count')

    const myproducts_prev_btn = document.querySelector('.myproduct-prev')
    const myproducts_next_btn = document.querySelector('.myproduct-next')


    myproducts_data.then(data=>{
        product_count.textContent = data.count
        
        myproducts_prev_btn.setAttribute('data-prev-url',data.previous)
        myproducts_next_btn.setAttribute('data-prev-url',data.next)

        data = data.results
        
        data.forEach(product=>{

            const image = apiUrl+ product.image

            const title = product.title
            const price = product.price
            const product_id = product.id

            const li = generateMyProductItem(title,image,price)
            my_products_list.appendChild(li)
            li.setAttribute('data-product-id',product_id)
            
            setItem("myproducts",product_id,product)
            
            
            
            // Edit the product data
            li.addEventListener('click',event=>{
                const edit_products_page_section = document.querySelector('.edit-product-section')
                const product_id = li.getAttribute('data-product-id')
                // The data 
                const edit_product_id = document.querySelector('.edit-product-id')
                const edit_title = document.getElementById('edit-title')
                const edit_description = document.getElementById('edit-description')
                const edit_price = document.getElementById('edit-price')
                const edit_inventory = document.getElementById('edit-inventory')
                const edit_category = document.getElementById('edit-category')
                const edit_condition = document.getElementById('edit-condition')
                
                const expire_product = document.getElementById('edit-exipred')


                // Image area
                const edit_image_preview = document.getElementById('edit-img-preview')
                const edit_image = document.getElementById('edit-img')
                const image_preview = apiUrl+ product.image
                edit_image_preview.src = image_preview

                edit_image.addEventListener('change', function() {
                    const file = this.files[0]; // Get the selected file (first file in the FileList)
                    
                    if (file) {
                      const reader = new FileReader();
                  
                      reader.onload = function() {
                        edit_image_preview.src = reader.result; // Load the image data into the image preview element
                      };
                  
                      reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded image)
                    } else {
                        edit_image_preview.src = ""; // Clear the image preview if no file is selected
                    }
                  });

                // Image Area


               

                const item = getItem('myproducts',product_id)
                // Edit data
                edit_product_id.textContent = '#'+product_id
                edit_title.value = item.title
                edit_description.value = item.description
                edit_price.value = item.price
                edit_inventory.value = item.inventory
                edit_category.value = item.category.id
                edit_condition.value = item.condition


                console.log(item);
                edit_products_page_section.classList.toggle('hidden')

                
            })



        })
    })
}
myProductsLoader(my_product_api_url)


// Search Area
const search_btn = document.querySelector('.myproduct-search-btn')
const search_input = document.getElementById('myproducts-search-input')
search_btn.addEventListener('click',event=>{
    const search_value = search_input.value
    const url = apiUrl+`/api/myproducts/?limit=8&search=${search_value}`
    my_products_list.innerHTML = ``
    myProductsLoader(url)
})

// remove search 
search_input.addEventListener('input',event=>{
    if(event.target.value===""){
        const url = apiUrl+`/api/myproducts/?limit=8`
        my_products_list.innerHTML = ``
        myProductsLoader(url)
    }
})

// Next Btn

const myproducts_prev_btn = document.querySelector('.myproduct-prev')
const myproducts_next_btn = document.querySelector('.myproduct-next')

myproducts_prev_btn.addEventListener('click',event=>{
    const url = myproducts_prev_btn.getAttribute('data-prev-url')
    if(url==="null"){
        return;
    }
    add_loading()
    remove_loading_timeout()
    my_products_list.innerHTML = ``
    myProductsLoader(url)
})
myproducts_next_btn.addEventListener('click',event=>{
    const url = myproducts_next_btn.getAttribute('data-prev-url')
    if(url==="null"){
        return;
    }
    add_loading()
    remove_loading_timeout()
    my_products_list.innerHTML = ``
    myProductsLoader(url)
})
// Prev Btn

// Create Product Area

// Image area
const create_image_preview = document.getElementById('create-img-preview');
const create_image = document.getElementById('create-img');

create_image_preview.src = "/assets/gamer.png"; // Clear the image preview initially

create_image.addEventListener('change', function() {
    const file = this.files[0]; // Get the selected file (first file in the FileList)

    if (file) {
        const reader = new FileReader();

        reader.onload = function() {
            create_image_preview.src = reader.result; // Load the image data into the image preview element
        };

        reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded image)
    } else {
        create_image_preview.src = ""; // Clear the image preview if no file is selected
    }
});
// Image Area

const create_products_page_section = document.querySelector('.create-product-section');
const create_products_page_btn = document.querySelector('.remove-create-product-page-btn');
const add_product_btn =  document.querySelector('.add-products-btn')
create_products_page_btn.addEventListener('click', event => {
    
    create_products_page_section.classList.toggle('hidden');
});

add_product_btn.addEventListener('click', event => {
    create_products_page_section.classList.toggle('hidden');
});

const create_submit_btn = document.querySelector('.create-submit');

create_submit_btn.addEventListener('click', event => {
    // The data 
    const create_title = document.getElementById('create-title');
    const create_description = document.getElementById('create-description');
    const create_price = document.getElementById('create-price-input');
    const create_inventory = document.getElementById('create-inventory');
    const create_category = document.getElementById('create-category');
    const create_condition = document.getElementById('create-condition');
    const create_image = document.getElementById('create-img');
    const imageFile = create_image.files[0];
    if (imageFile) {
        const fileSizeInMB = imageFile.size / (1024 * 1024); // Convert bytes to megabytes
      
        if (fileSizeInMB > 2) {
          alert("Selected image is larger than 2MB");
          return;
        }
    }
    if (
        create_title.value.trim() === '' ||
        create_description.value.trim() === '' ||
        create_price.value.trim() === '' ||
        create_inventory.value.trim() === '' ||
        create_category.value === 'Select Category' ||
        create_condition.value === 'Select Condition'||
        imageFile === undefined
    ) {
        const create_product_error = document.querySelector('.create-product-error')
        create_product_error.classList.remove('hidden')
        create_product_error.textContent = 'Please recheck the blank inputs'
        return false;
    }
    
    const data = {
        "title": create_title.value,
        "description": create_description.value,
        "price": create_price.value,
        "category": create_category.value,
        "inventory": create_inventory.value,
        "condition": create_condition.value,
    };

    const post_url = apiUrl+`/api/myproducts/`
    const post_data = postDataandImageJWT(post_url,imageFile,data,jwtToken)
    add_loading()
    post_data.then(data=>{
        if(data.id){
            remove_loading_timeout()
            my_products_list.innerHTML = ""
            
            setTimeout(() => {
                myProductsLoader(my_product_api_url)
                alert("success")
            }, 1000);
            const remove = document.querySelector('.remove-create-product-page-btn');
           
            remove.click()
        }else{
            setTimeout(() => {
                remove_loading()
                const error = document.querySelector('.create-product-error')
                error.classList.remove('hidden')
                error.textContent = data
            }, 2000);
        }
    })

});

// Edit Product Area
const edit_products_page_section = document.querySelector('.edit-product-section')
const edit_products_page_btn = document.querySelector('.remove-edit-product-page-btn')

edit_products_page_btn.addEventListener('click',event=>{
    console.log(event);
    edit_products_page_section.classList.toggle('hidden')
})

const edit_submit_btn = document.querySelector('.edit-submit')

edit_submit_btn.addEventListener('click',event=>{
        // The data 
        const edit_product_id = document.querySelector('.edit-product-id')
        const edit_title = document.getElementById('edit-title')
        const edit_description = document.getElementById('edit-description')
        const edit_price = document.getElementById('edit-price')
        const edit_inventory = document.getElementById('edit-inventory')
        const edit_category = document.getElementById('edit-category')
        const edit_condition = document.getElementById('edit-condition')     
        const expire_product = document.getElementById('edit-exipred')
        const edit_image = document.getElementById('edit-img')
        
        const product_id = edit_product_id.textContent.replace("#", "")

        const patch_api_url = apiUrl+`/api/myproducts/${product_id}/`

        const imageFile = edit_image.files[0];
        if (imageFile) {
            const fileSizeInMB = imageFile.size / (1024 * 1024); // Convert bytes to megabytes
          
            if (fileSizeInMB > 2) {
              alert("Selected image is larger than 2MB");
              return;
            }
        }

        let src =""

        const data = {
            "title": edit_title.value,
            "description": edit_description.value,
            "price": edit_price.value,
            "category": edit_category.value,
            "inventory": edit_inventory.value,
            "condition": edit_condition.value,
            "expired": expire_product.checked,
        }
        
        if(imageFile!==undefined){
            src = imageFile
        }

        const patch_data = patchDataandImageJWT(patch_api_url,src,data,jwtToken)
        
        add_loading()
        patch_data.then(data=>{
            if(data.id){
                remove_loading_timeout()
                my_products_list.innerHTML = ""
                setTimeout(() => {
                    myProductsLoader(my_product_api_url)
                    alert("success")
                }, 1000);
                const remove = document.querySelector('.remove-edit-product-page-btn');
                remove.click()
            }else{
                console.log(data);
                setTimeout(() => {
                    loading_effect.classList.add('hidden')
                    const error = document.querySelector('.edit-product-error')
                    error.classList.remove('hidden')
                    error.textContent = data
                }, 2000);
            }
        })
})
