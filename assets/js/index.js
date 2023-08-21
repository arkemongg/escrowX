import { fetchData } from "./fetch.js";
import { createProductTemplate } from "./templates.js";
import { apiUrl, domainUrl } from "./urls.js";
import { nav } from "./nav.js";

const recentItemsUrl = apiUrl+`/api/products/?ordering=-id`

function recentLoader(url){
    const recentProducts = document.querySelector('.recent-products')
    const productData = fetchData(url)
    productData.then(data=>{
        data = data.results
        data.forEach(product=>{

            const productData = {
                title: product.title,
                imageSrc: apiUrl+product.image,
                verifiedSeller: product.is_verified,
                superSeller: product.super_seller,
                currentPrice: product.price,
            }
            const temp = createProductTemplate(productData)
            const a = temp.querySelector('a')
            a.href = domainUrl+`/product-details.html?product_id=${product.id}`
            recentProducts.appendChild(temp)
        })
    })
}
recentLoader(recentItemsUrl)
const featuredItemsUrl = apiUrl+`/api/featured/`

function featuredLoader(url){
    const featuredProducts = document.querySelector('.featured-products')
    const productData = fetchData(url)
    productData.then(data=>{
        data = data.results[0].products
        console.log(data);
        data.forEach(product=>{
            console.log(product);
            const productData = {
                title: product.title,
                imageSrc: apiUrl+product.image,
                verifiedSeller: product.is_verified,
                superSeller: product.super_seller,
                currentPrice: product.price,
            }
            const temp = createProductTemplate(productData)
            const a = temp.querySelector('a')
            a.href = domainUrl+`/product-details.html?product_id=${product.id}`
            featuredProducts.appendChild(temp)
        })
    })
}
featuredLoader(featuredItemsUrl)


const mostViewdUrl = apiUrl+`/api/products/?ordering=-view_count`


function mostViewdLoader(url){
    const mostViewdProducts = document.querySelector('.most-viewed-products')
    const productData = fetchData(url)
    productData.then(data=>{
        data = data.results
        data.forEach(product=>{
            const productData = {
                title: product.title,
                imageSrc: apiUrl+product.image,
                verifiedSeller: product.is_verified,
                superSeller: product.super_seller,
                currentPrice: product.price,
            }
            const temp = createProductTemplate(productData)
            const a = temp.querySelector('a')
            a.href = domainUrl+`/product-details.html?product_id=${product.id}`
            mostViewdProducts.appendChild(temp)
        })
    })
}
mostViewdLoader(mostViewdUrl)