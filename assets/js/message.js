import { userAndToken } from './cookies.js';
import { fetchDataWithJwt } from './fetch.js';
import { add_loading, remove_loading_timeout, remove_loading_timeout_custom } from './loading.js';
import { nav } from './nav.js';
import { createConversationElement, createMyMessageLi, createOtherMessageLi } from './templates.js';
import { apiUrl, websocket_url } from './urls.js';
// add_loading()
// window.onload = () => {
//   remove_loading_timeout_custom(4000)
// };
const jwtToken = userAndToken.token

const conversations = document.querySelector('.conversations')

const conversations_url = apiUrl+`/api/conversations/`

function getSellerSubstring(seller) {
  if (seller.length <= 3) {
    return seller;
  } else {
    return seller.slice(0, 3)+'...';
  }
}
const list = []
function conversation_loader(conversations_url){
    const get_conversation = fetchDataWithJwt(conversations_url,userAndToken.token)
    const prev_btn = document.querySelector('.prev-btn')
    const next_btn = document.querySelector('.next-btn')
    get_conversation.then(data=>{
      console.log(data);
      prev_btn.setAttribute('data-prev-url',data.previous)
      next_btn.setAttribute('data-next-url',data.next)
      data = data.results
      
      data.forEach(conversation=>{
        console.log(conversation);
          let seller = getSellerSubstring(conversation.seller.toString());
          if(typeof(conversation.seller)==="number"){
            seller = "seller"+conversation.seller
          }
          let li = ""
          if(conversation.last_message === null){
              li = createConversationElement(seller,"No Message","","")
          }else{
            const time = new Date(conversation.last_message.created_at)
            
              li = createConversationElement(seller,conversation.last_message.sender +" : ",conversation.last_message.message,time.toLocaleString())
              
          }
          li.setAttribute("data-id",conversation.id)
          li.setAttribute("data-me",conversation.me)
          li.setAttribute("data-seller",conversation.seller)
          conversations.appendChild(li)
          li.addEventListener('click',event=>{
              add_loading()
              let seller_name_btn = document.querySelector('.seller-conversation-name')
              seller_name_btn.textContent = conversation.seller
              if(typeof(conversation.seller)==="number"){
                seller_name_btn.textContent = "seller"+conversation.seller
              }
             
              
              const id = li.getAttribute("data-id")
              const me = li.getAttribute("data-me")
              const seller = li.getAttribute("data-seller")
              let ws_url = `${websocket_url}/conversations/${id}/${jwtToken}/`
              
              if(list.length===0){
                
              }else{
                const socket = list[0]
                socket.close()
                
              }
              socket_connect(ws_url,id,me,seller)
              setTimeout(() => {
                remove_loading_timeout()
                const messageLoader = document.getElementById('message-input');
                messageLoader.scrollIntoView({ behavior: "smooth" });
            }, 1000);
              
          })
      })
    })
}

conversation_loader(conversations_url)


function socket_connect(ws_url,id,me,seller){
  console.log(ws_url);
  const ws = new WebSocket(ws_url+'')
  console.log(ws_url);
    if(list.length===0){
      list.push(ws)
    }else{
      list[0]=ws
    }

    
    ws.onmessage = (event)=>{
      
      const data = JSON.parse(event.data)
        if(data.accepted){

            get_message(id,me,seller)
        }else if(data.message){
          createNewMessage(data)
        }
    }
    ws.onerror = (event)=>{
      console.log(event);
    }

}
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

//get preload conversation from the url

const url = new URL(window.location)
const id = url.searchParams.get("id")
if(id!==null){
  const preload_url = apiUrl+`/api/conversations/${id}/`
  const get_preload_data = fetchDataWithJwt(preload_url,jwtToken)

  get_preload_data.then(data=>{
    let ws_url = ""

    ws_url = `${websocket_url}/conversations/${id}/${jwtToken}/`
    
    socket_connect(ws_url,id,data.me,data.seller)
    setTimeout(() => {
        const messageLoader = document.getElementById('message-input');
        messageLoader.scrollIntoView({ behavior: "smooth" });
    }, 1000);
    
  })

}

//get preload conversation from the url

// Example usage:
const messageLoader = document.querySelector('.message-loader');

const message_list = document.querySelector('.messages')
function get_message(id,me,seller){
  message_list.innerHTML = ``
  const message_api = apiUrl+`/api/conversations/${id}/message/`
  const get_message = fetchDataWithJwt(message_api,jwtToken)
  get_message.then(data=>{
    const load_more = document.querySelector('.load-more')
    load_more.setAttribute('data-more',data.next)
    load_more.disabled = false
    data = data.results
    message_list.setAttribute('data-seller',seller)
    message_list.setAttribute('data-me',me)
    data.forEach(message=>{
      let li = ""

      const created_at = new Date(message.created_at).toLocaleString()
      if(message.sender==me){
        
        li = createMyMessageLi(created_at,message.message,'me')
      }else{
        
        li = createOtherMessageLi(created_at,message.message,"seller")
      }
      message_list.prepend(li)
    })
    scrollToBottom(messageLoader)
  })

}

const load_more_btn = document.querySelector('.load-more')
load_more_btn.addEventListener('click',event=>{
  const more_url = load_more_btn.getAttribute('data-more')
  if(more_url==null || more_url ==="null"){
    load_more_btn.disabled = true
    return;
  }
  add_loading()
  const data_get = fetchDataWithJwt(more_url,jwtToken)
  const seller = message_list.getAttribute('data-seller')
  const me = message_list.getAttribute('data-me')

  data_get.then(data=>{
    load_more_btn.setAttribute('data-more',data.next)
    data = data.results
    data.forEach(message=>{
      let li = ""
      
      const created_at = new Date(message.created_at).toLocaleString()
      if(message.sender==me){
        li = createMyMessageLi(created_at,message.message,'me')
      }else{
        li = createOtherMessageLi(created_at,message.message,"seller")
      }
      message_list.prepend(li)
    })
    remove_loading_timeout()
  })
})

function createNewMessage(data){
  const message = data.message
  
  const seller = message_list.getAttribute('data-seller')
  const me = message_list.getAttribute('data-me')

  let li = ""
  const created_at = new Date(message.created_at).toLocaleString()
  if(message.sender==me){
    li = createMyMessageLi(created_at,message.message,'me')
  }else{
    const beepSound = new Audio('/assets/beep.mp3');
    beepSound.play();
    li = createOtherMessageLi(created_at,message.message,"seller")
  }
  message_list.appendChild(li)
  scrollToBottom(messageLoader)
}

// let lastMessage = new Date()
// const fiveMinutes = 6000;


// setInterval(() => {
//   const currentTime = new Date();
//   if (currentTime - lastMessage >= fiveMinutes) {
//     let socket = ""
//     if(list.length>0){
//         socket = list[0]
//         list.pop()
//         socket.close()
//         message_list.innerHTML = `
//         <li><h1 style="color: white; text-align: center;">Please select a conversation.</h1></li>
//         `
//     }
//   } else {
      
//   }
// }, fiveMinutes);


const send_btn = document.querySelector('.send')
const message_input = document.querySelector('.send-box')

send_btn.addEventListener('click',event=>{
  
  if(message_input.value.trim()===""){
    return
  }
  const socket = list[0]

  socket.send(message_input.value)
  message_input.value = ""

})