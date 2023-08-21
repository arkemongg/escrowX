import { add_loading, createReviewLi, getData, loading_effect, postDataJWT, remove_loading } from './templates.js';

loading_effect.classList.remove('hidden')

window.onload = () => {
  setTimeout(() => {
  loading_effect.classList.add('hidden')
  }, 1000);
};


import {} from './nav.js'

import {insertFooter} from './footer.js'
document.addEventListener('DOMContentLoaded', insertFooter);

import {jwtToken} from './validate_account.js'
import { api_url, domain_url } from './urls.js';

// Seller Profile
const url= new URL(window.location)
const seller__id = url.searchParams.get('seller__id')

const contact_seller_btn = document.querySelector('.contact-seller-btn')

contact_seller_btn.addEventListener('click',event=>{
  if(jwtToken==undefined){
    add_loading()
    setTimeout(() => {
      window.location = domain_url+`login.html`
    }, 2000);
  }else{
    
    add_loading()

    const post_url = api_url+`api/conversations/`
    const send_data = {
      "seller_id":seller__id
    }
    const post_data = postDataJWT(post_url,send_data,jwtToken)

    post_data.then(data=>{
      if(data.id){
        setTimeout(() => {
          window.location = domain_url+`message.html?id=${data.id}`
        }, 3000);
      }else{
        remove_loading()
        contact_seller_btn.textContent = 'Please try later'
      }
    })
  }

})
const seller_profile_url = api_url+`api/seller/${seller__id}/`

function SellerLoader(seller_profile_url){
    const seller_img = document.querySelector('.seller-img')
    const first_name = document.getElementById('firstname')
    const last_name = document.getElementById('lastname')
    const verified_seller = document.getElementById('verified-seller')
    const super_seller = document.getElementById('super-seller')
    const member_since  = document.getElementById('member-since')
    const feedback_counts  = document.getElementById('feedback-counts')


    const seller_data = getData(seller_profile_url)

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

const reviews_url = api_url+`api/feedback/?seller__id=${seller__id}&id=${id}`

function ReviewsLoader(reviews_url){
  const reviews_data = getData(reviews_url)

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
console.log(reviews_url);
ReviewsLoader(reviews_url)