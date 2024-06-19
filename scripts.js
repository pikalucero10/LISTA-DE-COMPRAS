document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const product = document.getElementById('product').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    addProductToList(product, price, quantity);
    calculateTotal();
    clearForm();
});

function addProductToList(product, price, quantity) {
    const tableBody = document.querySelector('#shopping-list tbody');
    const row = document.createElement('tr');

    const productCell = document.createElement('td');
    productCell.textContent = product;

    const priceCell = document.createElement('td');
    priceCell.textContent = price.toFixed(2);

    const quantityCell = document.createElement('td');
    quantityCell.textContent = quantity;

    const totalCell = document.createElement('td');
    totalCell.textContent = (price * quantity).toFixed(2);

    row.appendChild(productCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);

    tableBody.appendChild(row);
}

function calculateTotal() {
    const tableBody = document.querySelector('#shopping-list tbody');
    const rows = tableBody.querySelectorAll('tr');
    let total = 0;

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowTotal = parseFloat(cells[3].textContent);
        total += rowTotal;
    });

    document.getElementById('grand-total').textContent = total.toFixed(2);
}

function clearForm() {
    document.getElementById('form').reset();
    document.getElementById('product').focus();
}
