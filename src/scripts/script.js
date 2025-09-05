const modal = document.getElementById('modal');
const productNameElem = document.getElementById('product-name');
const closeModalBtn = document.getElementById('close-modal');
const purchaseForm = document.getElementById('purchase-form');

document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    productNameElem.textContent = `You are purchasing: ${product}`;
    modal.classList.remove('hidden');
  });
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your purchase!');
  purchaseForm.reset();
  modal.classList.add('hidden');
});