import { userAndToken } from './cookies.js';
import { fetchData, postDataJWT } from './fetch.js';
import { add_loading, remove_loading_timeout, remove_loading_timeout_custom } from './loading.js';
import {nav} from './nav.js'
import { createReviewLi } from './templates.js';
// add_loading()

// window.onload = () => {
//   remove_loading_timeout()
// };

import { apiUrl, domainUrl } from './urls.js';

// Seller Profile
const url= new URL(window.location)
const seller__id = url.searchParams.get('seller__id')

const contact_seller_btn = document.querySelector('.contact-seller-btn')

contact_seller_btn.addEventListener('click',event=>{
  if(userAndToken===null){
    add_loading()
    setTimeout(() => {
      window.location = domainUrl+`/login.html`
    }, 2000);
  }else{
    add_loading()
    const url = new URL(window.location)
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

const seller_profile_url = apiUrl+`/api/seller/${seller__id}/`

function SellerLoader(seller_profile_url){
    const seller_img = document.querySelector('.seller-img')
    const first_name = document.getElementById('firstname')
    const last_name = document.getElementById('lastname')
    const verified_seller = document.getElementById('verified-seller')
    const super_seller = document.getElementById('super-seller')
    const member_since  = document.getElementById('member-since')
    const feedback_counts  = document.getElementById('feedback-counts')


    const seller_data = fetchData(seller_profile_url)

    seller_data.then(data=>{
      
      if(data.id){

        if(data.avatar.profile!==null){
          seller_img.src = data.avatar.profile
        }
        
        if(data.first_name == ''){
          first_name.textContent = 'not_set'
        }else{
          first_name.textContent = data.first_name
        }

        if(data.last_name == ''){
          last_name.textContent = 'not_set'
        }else{
          last_name.textContent = data.last_name
        }

        verified_seller.textContent = data.verified_seller ? "Yes":"No"
        super_seller.textContent = data.super_seller ? "Yes":"No"

        let date = new Date(data.member_since)
        member_since.textContent = date.toUTCString()

        const excellent = document.querySelector('.excellent-rating')
        const good = document.querySelector('.good-rating')
        const bad = document.querySelector('.bad-rating')

        excellent.textContent = data.feedback_counter.E
        good.textContent = data.feedback_counter.G
        bad.textContent = data.feedback_counter.B
      }
      
    })

}

SellerLoader(seller_profile_url)
// Review

let  id = url.searchParams.get('id')

if(id===null){
  id = ''
}
const reviews_list =  document.querySelector('.reviews-list')

const reviews_url = apiUrl+`/api/feedback/?seller__id=${seller__id}&id=${id}`

function ReviewsLoader(reviews_url){
  const reviews_data = fetchData(reviews_url)

  reviews_data.then(data=>{
    if(data.count === 0){
      reviews_list.innerHTML = `<h1 style="text-align:center; padding:20px">Empty</h1>`
    }else if(data.results){
      data = data.results

      data.forEach(review=>{
        const  li = createReviewLi(review.status,review.seller_name,review.reviewer_name,review.comment)
        reviews_list.appendChild(li)
      })
    }else{
      reviews_list.innerHTML = `<h1 style="text-align:center; padding:20px">Error</h1>`
    }
  })
}

ReviewsLoader(reviews_url)