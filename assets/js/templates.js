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

export function generateTransaction(transactionData) {
  const liElement = document.createElement("li");
  liElement.className = "transaction";
  const direction = transactionData.transaction_direction == 'IN' ? `<p style="color:green" id="transaction-direction">${transactionData.transaction_direction}</p>`:`<p style="color:red" id="transaction-direction">${transactionData.transaction_direction}</p>`

  const payment = transactionData.payment_url == '-'?`<p id="transaction-payment-url">-</p>`:`<p id="transaction-payment-url"><a class="btn btn-primary" href="${transactionData.payment_url}">Pay Here</a></p>`

  const transactionTemplate = `
      <p id="transaction-id">${transactionData.id}</p>
      <p id="transaction-amount">${transactionData.amount}</p>
      <p id="transaction-status">${transactionData.status}</p>
      ${payment}
      ${direction}
      <p id="transaction-created-at">${transactionData.created_at}</p>
  `;

  liElement.innerHTML = transactionTemplate;

  return liElement
}

export function generateBalanceHistory(balanceHistoryData) {
  const liElement = document.createElement("li");
  liElement.className = "balance-history";

  const direction = balanceHistoryData.direction === 'IN' ?
      `<p style="color:green" id="balance-history-direction">${balanceHistoryData.direction}</p>` :
      `<p style="color:red" id="balance-history-direction">${balanceHistoryData.direction}</p>`;

  const lastBalance = balanceHistoryData.last_balance ?
      `<p id="balance-history-last-balance">${balanceHistoryData.last_balance}</p>` :
      `<p id="balance-history-last-balance">-</p>`;

  const balanceHistoryTemplate = `
      <p id="balance-history-amount">${balanceHistoryData.amount}</p>
      <p id="balance-history-order-id">${balanceHistoryData.order_id}</p>
      ${direction}
      ${lastBalance}
  `;

  liElement.innerHTML = balanceHistoryTemplate;

  return liElement;
}

//Pending order
export function generatePendingOrder(pendingOrderData) {
  const liElement = document.createElement("li");
  liElement.className = "order";

  const orderTemplate = `
      <p id="order-id">${pendingOrderData.id}  |   <span style="background-color: #0D6EFD; padding: 5px;">more details</span></p>
      <p id="order-status">${pendingOrderData.status}</p>
      <p id="order-total">${pendingOrderData.total}</p>
      <p id="escrow-status"><a class="escrow-btn bg-primary text-white">Update Escrow Status</a></p>
      <p id="order-feedback">${pendingOrderData.feedback}</p>
      <p id="order-created-at">${pendingOrderData.created_at}</p>
  `;

  liElement.innerHTML = orderTemplate;

  return liElement;
}

//failed order

export function generateFailedOrder(failedOrderData) {
  const liElement = document.createElement("li");
  liElement.className = "order";
  const order_id = `${failedOrderData.id}  |  <span style="background-color: #0D6EFD; padding: 5px;">more details</span>`;
  const orderTemplate = `
      <p id="order-id">${order_id}</p>
      <p id="order-status">${failedOrderData.status}</p>
      <p id="order-total">${failedOrderData.total}</p>
      <p id="escrow-status">Failed</p>
      <p id="order-feedback">${failedOrderData.feedback}</p>
      <p id="order-created-at">${failedOrderData.created_at}</p>
  `;

  liElement.innerHTML = orderTemplate;

  return liElement;
}

//Complete

export function generateCompleteOrder(completeOrderData) {
  const liElement = document.createElement("li");
  liElement.className = "order";
  console.log(completeOrderData);
  const order_id = `${completeOrderData.id}  |  <span style="background-color: #0D6EFD; padding: 5px;"> more details</span>`;

  const orderTemplate = `
      <p id="order-id">${order_id}</p>
      <p id="order-status">${completeOrderData.status}</p>
      <p id="order-total">${completeOrderData.total}</p>
      <p id="escrow-status">COMPLETE</p>
      <p id="order-feedback"></p>
      <p id="order-created-at">${completeOrderData.created_at}</p>
  `;

  liElement.innerHTML = orderTemplate;

  return liElement;
}

// Create Review
export function createReviewLi(status, sellerName, reviewerName, comment) {
  // Map status to color
  let color;
  switch (status) {
      case 'E':
          color = 'green';
          status = 'Excellent';
          break;
      case 'B':
          color = 'red';
          status = 'Bad';
          break;
      case 'G':
          color = 'blue';
          status = 'Good';
          break;
      default:
          color = 'black'; // Default color if status is not recognized
          break;
  }

  // Create the <li> element
  const li = document.createElement('li');
  li.className = 'review';

  // Create the name area
  const nameArea = document.createElement('div');
  nameArea.className = 'name-area';

  const sellerNameArea = document.createElement('div');
  sellerNameArea.className = 'seller-name-area';
  sellerNameArea.innerHTML = `Seller: <span class="seller-name">${sellerName}</span>`;
  nameArea.appendChild(sellerNameArea);

  const reviewerNameArea = document.createElement('div');
  reviewerNameArea.className = 'reviewer-name-area';
  reviewerNameArea.innerHTML = `Reviewer: <span class="reviewer-name">${reviewerName}</span>`;
  nameArea.appendChild(reviewerNameArea);

  const rating = document.createElement('div');
  rating.className = 'rating';
  rating.innerHTML = `Rating: <span class="status" style="color: ${color};">${status}</span>`;
  nameArea.appendChild(rating);

  li.appendChild(nameArea);

  // Create the comment area
  const commentArea = document.createElement('div');
  commentArea.className = 'comment-area';

  const heading = document.createElement('h6');
  heading.style.textAlign = 'center';
  heading.style.padding = '10px';
  heading.textContent = 'Comment';
  commentArea.appendChild(heading);

  const hr = document.createElement('hr');
  hr.style.width = '80%';
  hr.style.margin = 'auto';
  commentArea.appendChild(hr);

  const commentText = document.createElement('div');
  commentText.className = 'comment';
  commentText.textContent = comment;
  commentArea.appendChild(commentText);

  li.appendChild(commentArea);

  return li;
}

// Create Review

// Pending sales

export function generatePendingSale(pendingSaleData) {
  const liElement = document.createElement("li");
  liElement.className = "sale";

  const saleTemplate = `
    <p id="sale-id">${pendingSaleData.id} <span>|</span> <span class="bg-primary py-1">Order Details</span></p>
    <p id="sale-status">${pendingSaleData.status}</p>
    <p id="sale-total">${pendingSaleData.total}</p>
    <p id="escrow-status">${pendingSaleData.escrowStatus}</p>
    <p id="sale-feedback">${pendingSaleData.feedback}</p>
    <p id="sale-created-at">${pendingSaleData.created_at}</p>
  `;

  liElement.innerHTML = saleTemplate;

  return liElement;
}

// Failed sales 
export function generateFailedSales(failedOrderData) {
  const liElement = document.createElement("li");
  liElement.className = "sale";

  const failedOrderTemplate = `
    <p id="sale-id">${failedOrderData.id} <span>|</span> <span class="bg-primary py-1">Order Details</span></p>
    <p id="sale-status">Failed</p>
    <p id="sale-total">${failedOrderData.total}</p>
    <p id="escrow-status">${failedOrderData.escrowStatus}</p>
    <p id="sale-feedback">${failedOrderData.feedback}</p>
    <p id="sale-created-at">${failedOrderData.created_at}</p>
  `;

  liElement.innerHTML = failedOrderTemplate;

  return liElement;
}

// Complete Sales

export function generateCompleteSale(completedSaleData) {
  const liElement = document.createElement("li");
  liElement.className = "sale";

  const saleTemplate = `
    <p id="sale-id">${completedSaleData.id} <span>|</span> <span class="bg-primary py-1">Order Details</span></p>
    <p id="sale-status">Completed</p>
    <p id="sale-total">${completedSaleData.total}</p>
    <p id="escrow-status">${completedSaleData.escrowStatus}</p>
    <p id="sale-feedback">${completedSaleData.feedback}</p>
    <p id="sale-created-at">${completedSaleData.created_at}</p>
  `;

  liElement.innerHTML = saleTemplate;

  return liElement;
}
