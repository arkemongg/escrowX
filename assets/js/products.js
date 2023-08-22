import { fetchData } from './fetch.js';
import { add_loading, remove_loading_timeout,loading_effect } from './loading.js';
import { createProductTemplate } from './templates.js';
import { apiUrl, domainUrl } from './urls.js';
import { nav } from './nav.js';
add_loading()
window.onload = () => {
  setTimeout(() => {
  remove_loading_timeout()
  }, 1000);
};

// add the category to select
const category_data = fetchData(apiUrl + `/api/category/`)
category_data.then(data => {
  const category = document.getElementById('category')
  data.forEach(c => {
    const option = document.createElement('option');

    option.value = c.id;
    option.textContent = c.title;
    category.appendChild(option);

  })
})

// add the category to select

// Product Loader

const url = new URL(window.location)
let search_item = url.searchParams.get('search')
console.log(search_item);
const products_list = document.querySelector('.products-list')
let products_url = ""

if(search_item!=null){
  const search_input = document.querySelector('#search-product')
  search_input.value = search_item
  products_url =  apiUrl + `/api/products/?limit=8&&search=${search_item}`
}else{
  products_url =  apiUrl + `/api/products/?limit=8`
}

function ProductLoader(product_url) {

  const url = new URL(product_url)
  const products_data = fetchData(product_url)
  const prev_prdouct_btn = document.querySelector('.prev-product-btn')
  const next_prdouct_btn = document.querySelector('.next-product-btn')
  const page_number = document.getElementById('page-number')
  products_data.then(data => {
    if (data.count) {

      const searchParams = new URLSearchParams(url.search);

      let offset = searchParams.get('offset')
      let limit = searchParams.get('limit')

      if (offset === null) {
        page_number.value = 1
      } else if (limit !== null && offset !== null) {
        page_number.value = 1 + (offset / limit)
      }

      prev_prdouct_btn.setAttribute('data-prev-url', data.previous)
      next_prdouct_btn.setAttribute('data-next-url', data.next)

      const data_length = data.results.length
      const data_count = data.count
      const total = Math.ceil(data_count / limit);

      const total_page = document.getElementById('total-page')
      total_page.textContent = total

      // Set Btns

      // Set Data

      data = data.results

      data.forEach(product => {
        const productData = {
          title: product.title,
          imageSrc: apiUrl + product.image,
          verifiedSeller: product.is_verified,
          superSeller: product.super_seller,
          currentPrice: product.price,
        }
        const temp = createProductTemplate(productData)
        const a = temp.querySelector('a')
        a.href = domainUrl + `/product-details.html?product_id=${product.id}`
        products_list.appendChild(temp)
      })

      // Set DATA 


    } else {

    }

  })

}

ProductLoader(products_url)
// Product Loader

//NEXT PREV
const product_section = document.querySelector('.products-section')

const prev_prdouct_btn = document.querySelector('.prev-product-btn')
const next_prdouct_btn = document.querySelector('.next-product-btn')


prev_prdouct_btn.addEventListener('click', event => {
  const url = prev_prdouct_btn.getAttribute('data-prev-url')
  // prev_prdouct_btn.setAttribute('data-next-url',data.next)
  if (url === 'null') {
    return
  }
  add_loading()
  products_list.innerHTML = ``

  product_section.scrollIntoView({ behavior: "smooth" });

  ProductLoader(url)
  remove_loading_timeout()
})

next_prdouct_btn.addEventListener('click', event => {

  const url = next_prdouct_btn.getAttribute('data-next-url')
  if (url === 'null') {
    return
  }
  add_loading()
  products_list.innerHTML = ``
  product_section.scrollIntoView({ behavior: "smooth" });

  ProductLoader(url)
  remove_loading_timeout()
})

const go_to_btn = document.querySelector('.go-to-page')

go_to_btn.addEventListener('click', event => {
  //Add loading
  loading_effect.classList.remove('hidden')


  let total_page = document.getElementById('total-page').textContent

  let go_to_page = document.getElementById('page-number').value

  total_page = parseInt(total_page)
  go_to_page = parseInt(go_to_page)

  if (go_to_page > total_page || go_to_page < 1) {
    //remove loading 
    loading_effect.classList.add('hidden')
    return
  }

  let url = next_prdouct_btn.getAttribute('data-next-url')

  if (url === 'null') {
    url = prev_prdouct_btn.getAttribute('data-prev-url')
  }

  if (url === 'null') {
    loading_effect.classList.add('hidden')
    return;
  }

  const url_search = new URL(url)
  const searchParams = new URLSearchParams(url_search.search);

  let limit = searchParams.get('limit')

  if (go_to_page === 1) {
    products_list.innerHTML = ``
    product_section.scrollIntoView({ behavior: "smooth" });
    url_search.searchParams.delete('offset');
    const product_url = url_search.href
    ProductLoader(product_url)
    // remove loading 
    setTimeout(() => {
      loading_effect.classList.add('hidden')
    }, 2000);
  } else {
    products_list.innerHTML = ``
    product_section.scrollIntoView({ behavior: "smooth" });
    const offset = (limit * go_to_page) - limit
    url_search.searchParams.set('offset', offset)
    const product_url = url_search.href
    console.log(product_url);
    ProductLoader(product_url)
    // remove loading 
    setTimeout(() => {
      loading_effect.classList.add('hidden')
    }, 2000);
  }

})

// Filter Search

const search_products_input = document.getElementById('search-product')
const list_per_page = document.getElementById('list-per-page')
const category = document.getElementById('category')
const min_price = document.getElementById('min-price')
const max_price = document.getElementById('max-price')

// Search BTN
const filter_product_btn = document.querySelector('.filter-products')
const error = document.querySelector('.filter-error')

filter_product_btn.addEventListener('click', event => {
  //add laoding
  loading_effect.classList.remove('hidden')

  const search_value = search_products_input.value
  const list_per_page_value = list_per_page.value
  const category_value = category.value

  const min_price_value = min_price.value
  const max_price_value = max_price.value

  const min_int = parseInt(min_price_value)
  const max_int = parseInt(max_price_value)

  if (min_int !== NaN && max_int !== NaN) {
    if (min_int >= max_int) {
      error.textContent = 'Min Price shouldn\'t be greater than or equal to Max Price'
      error.classList.remove('hidden')
      setTimeout(() => {
        error.classList.add('hidden')
      }, 5000);
      //remove loading
      loading_effect.classList.add('hidden')
      return
    }
  }

  let filter_value = ''

  if (list_per_page_value === '') {
    filter_value = filter_value + `?limit=8`
  } else {
    filter_value = filter_value + `?limit=${list_per_page_value}`
  }


  if (category_value === "") {

  } else {
    filter_value = filter_value + `&category=${category_value}`
  }

  if (min_price_value === "") {

  } else {
    filter_value += `&price__gt=${min_price_value}`
  }

  if (max_price_value === "") {

  } else {
    filter_value += `&price__lt=${max_price_value}`
  }

  if (search_value === '') {

  } else {
    filter_value += `&search=${search_value}`
  }

  if (filter_value === '?limit=8') {
    //remove loading
    loading_effect.classList.add('hidden')
    return
  }

  const filtered_url = apiUrl + `/api/products/` + filter_value


  // Load the product
  products_list.innerHTML = ``
  product_section.scrollIntoView({ behavior: "smooth" });
  ProductLoader(filtered_url)

  // remove loading 
  setTimeout(() => {
    loading_effect.classList.add('hidden')
  }, 2000);
})
// Clear filter 
const clear_filter_btn = document.querySelector('.clear-filter-products')

clear_filter_btn.addEventListener('click', event => {
  // Load the product
  loading_effect.classList.remove('hidden')
  const products_url = api_url + `api/products/?limit=8`

  products_list.innerHTML = ``
  product_section.scrollIntoView({ behavior: "smooth" });
  ProductLoader(products_url)
  // remove loading 
  setTimeout(() => {
    loading_effect.classList.add('hidden')
  }, 2000);
})

// Go To Buy Now
products_list.addEventListener('click', event => {
  const li = event.target.closest('li')
  const id = li.getAttribute('data-id')
  loading_effect.classList.remove('hidden')
  setTimeout(() => {
    window.location = domain_url + `buynow.html?id=${id}`
  }, 2000);
})