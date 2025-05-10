// Select DOM elements
const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateUI() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
    total += expense.amount;
  });

  totalDisplay.textContent = total;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (name === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter valid name and amount');
    return;
  }

  expenses.push({ name, amount });
  updateUI();

  nameInput.value = '';
  amountInput.value = '';
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

// Initial UI update on load
updateUI();
