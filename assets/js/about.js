import { nav } from './nav.js';
import {add_loading, remove_loading_timeout} from './loading.js'
add_loading()
window.onload = () => {
  setTimeout(() => {
    remove_loading_timeout()
  }, 1000);
};