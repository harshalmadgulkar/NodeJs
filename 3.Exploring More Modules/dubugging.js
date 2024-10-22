function calculateTotal(products) {
  let total = 0;
  products.forEach((product) => {
    total += product.quantity * product.price;
  });
  return total;
}

function printTotalValue(value) {
  console.log(value);
}

const productsList = [
  { name: 'shoes', price: 50, quantity: 2 },
  { name: 'Hat', price: 25, quantity: 1 },
  { name: 'Gloves', price: 30, quantity: 2 },
];

const grandTotal = calculateTotal(productsList);
printTotalValue(grandTotal);