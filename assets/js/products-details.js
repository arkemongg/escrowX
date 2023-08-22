import { userAndToken } from './cookies.js';
import { fetchData, postDataJWT } from './fetch.js';
import { add_loading, loading_effect, remove_loading_timeout, remove_loading_timeout_custom } from './loading.js';
import {nav} from './nav.js'
import { apiUrl, domainUrl } from './urls.js';

// loading_effect.classList.remove('hidden')

// window.onload = () => {
  
//   setTimeout(() => {
//   loading_effect.classList.add('hidden')
//   }, 3000);
// };


const url_params = new URL(window.location)

const searchParams = new URLSearchParams(url_params.search);
const product_id = searchParams.get('product_id');

const product_url = apiUrl+`/api/products/${product_id}/`


const buy_now_btn = document.querySelector('.buy-now-btn')

if(userAndToken===null){
  buy_now_btn.textContent = `Login To Buy`
  buy_now_btn.addEventListener('click',event=>{
    add_loading()
      setTimeout(() => {
        window.location =domainUrl+`/login.html`
      }, 2000);
  })
}else{
  buy_now_btn.addEventListener('click',event=>{
        const product_warning = document.querySelector('.product-warning')
        const product_inventory = document.querySelector('.inventory')
        const inventory = parseInt(product_inventory.textContent)
        
        const quantity_select = document.querySelector('.quantity-select')
        
        const quantity = parseInt(quantity_select.value)

        if(quantity>inventory || quantity>100 || quantity<1){
          alert("quantity error")
          return
        }

        const seller_id_url = document.querySelector('.seller-details').href
        add_loading()
        const url = new URL(seller_id_url)
        const seller_id = url.searchParams.get('seller__id')
        if(userAndToken.user.id == seller_id){
            remove_loading_timeout_custom(1000)
            alert("Own product")
            return
        }
        const create_order_url =apiUrl+`/api/create-order/`
        const data_post = {
          "product_id":product_id,
          "quantity":quantity
        }
        const post_create_order = postDataJWT(create_order_url,data_post,userAndToken.token)
        
        post_create_order.then(data=>{
          if(data.id){  
            const products_details_section = document.querySelector('.product-details-section')
            const success_section = document.querySelector('.buy-now-success-section')
            success_section.classList.remove('hidden')
            const order_id = document.getElementById('order-id')
  
            order_id.textContent = data.id
  
            remove_loading_timeout_custom(1000)
  
            setTimeout(() => {
              window.location = domainUrl
            }, 5000);
          }else if(data.error){
            remove_loading_timeout_custom(1000)
            alert(data.error)
          }else if(data.detail){
            remove_loading_timeout_custom(1000)
            alert(data.detail)
          }else {
            remove_loading_timeout_custom(1000)
            alert("error")
          }
        })
  }) 
}




function buy_now_product_loader(url){
  // Edit the data 

  const product_image = document.querySelector('.product-image')
  const product_title = document.querySelector('.product-title')
  const product_description = document.querySelector('.description')
  const product_price = document.querySelector('.prodcut-price')
  const product_id = document.querySelector('.product-id')
  const product_category = document.querySelector('.product-category')
  const product_inventory = document.querySelector('.inventory')
  const prodcut_condition = document.querySelector('.condition')
  const product_view_count = document.querySelector('.prodcut-view-count')

  const product_seller_id = document.querySelector('.seller-id')
  const product_verified_seller = document.getElementById('verified-seller')
  const product_seller_super = document.getElementById('super-seller')
  const product_seller_btn = document.querySelector('.seller-details')

    const product_data = fetchData(url)

    product_data.then(data=>{
      let image = "/assets/tests.jpg"
      if(data.image!==null){
        image = apiUrl+data.image
      }
      console.log(data);
      product_image.src = image
      product_title.textContent = data.title
      product_description.textContent = data.description
      product_price.textContent = data.price +' $'

      product_id.textContent = data.id
      product_category.textContent = data.category.title
      product_inventory.textContent = data.inventory
      prodcut_condition.textContent = data.condition

      product_seller_btn.href = domainUrl+`/seller.html?seller__id=${data.seller}`
      product_verified_seller.textContent = data.is_verified ? "Verified Seller":"-"
      product_seller_super.textContent = data.super_seller ? "Super Seller":"-"
      product_view_count.textContent = data.view_count
      
    })

}

buy_now_product_loader(product_url)



const contact_seller_btn = document.querySelector('.contact-seller')

contact_seller_btn.addEventListener('click',event=>{
  if(userAndToken===null){
    add_loading()
    setTimeout(() => {
      window.location = domainUrl+`login.html`
    }, 2000);
  }else{
    const seller_id_url = document.querySelector('.seller-details').href
    add_loading()
    const url = new URL(seller_id_url)
    const seller_id = url.searchParams.get('seller__id')
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