export function createProductTemplate(data) {
    const vs = data.verifiedSeller?`<li class="vs">Verified Seller</li>`: `<div style="height:27px"></div>`
    const ss = data.verifiedSeller?`<li class="ss">Super Seller</li>`: `<div style="height:27px"></div>`
    const div = document.createElement('div');
    div.classList.add('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-6', 'col-12');
    
    const hasSuperSeller = data.superSeller;
  
    const innerHTML = `
      <div class="single-tranding">
        <a href="product-details.html">
          <div class="tranding-pro-img">
            <img class="prod-img" src="${data.imageSrc}" alt="">
          </div>
          <div class="tranding-pro-title">
            <h3>${data.title}</h3>
            <div class="product_desc">
              <ul>
                ${vs}
                ${ss}
              </ul>
            </div>
          </div>

          <div class="order_button">
            <button type="submit"><span class="current_price">$${data.currentPrice}</span></button>
          </div>
        </a>
      </div>
    `;
  
    div.innerHTML = innerHTML;
    return div;
}