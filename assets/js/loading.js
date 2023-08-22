// Loading Effect

export const loading_effect = document.querySelector('.loading-effect')

export function add_loading(){
  loading_effect.classList.remove('hidden')
}
export function remove_loading(){
  loading_effect.classList.add('hidden')
}

export function remove_loading_timeout_reload(){
  setTimeout(() => {
    loading_effect.classList.add('hidden')
    window.location.reload()
  }, 2000);
}

export function remove_loading_timeout(){
  setTimeout(() => {
    loading_effect.classList.add('hidden')
  }, 2000);
}
export function remove_loading_timeout_custom(time){
  setTimeout(() => {
    loading_effect.classList.add('hidden')
  }, time);
}
export function remove_loading_timeout_custom_location(time,location){
  setTimeout(() => {
    loading_effect.classList.add('hidden')
    window.location = location
  }, time);
}
// lOADINGS