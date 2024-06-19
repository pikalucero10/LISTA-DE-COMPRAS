// JavaScript en scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const shoppingList = document.getElementById('shopping-list');
    const totalElement = document.getElementById('grand-total');
    const tbody = shoppingList.querySelector('tbody');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const product = document.getElementById('product').value;
        const price = parseFloat(document.getElementById('price').value);
        const quantity = parseInt(document.getElementById('quantity').value);

        if (product && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
            const total = price * quantity;
            const newRow = `
                <tr>
                    <td>${product}</td>
                    <td>$${price.toFixed(2)}</td>
                    <td>${quantity}</td>
                    <td>$${total.toFixed(2)}</td>
                    <td><button class="delete-btn">Eliminar</button></td>
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', newRow);

            updateTotal();
            form.reset();
        } else {
            alert('Por favor ingresa un producto válido, precio y cantidad.');
        }
    });

    tbody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            row.remove();
            updateTotal();
        }
    });

    const downloadBtn = document.getElementById('download-pdf');

    downloadBtn.addEventListener('click', function() {
        const doc = new jsPDF();

        doc.text('Lista de Compras', 20, 10);

        const table = document.getElementById('shopping-list');
        const tableHtml = table.outerHTML;

        doc.autoTable({ html: tableHtml });

        // Descarga el archivo PDF con nombre 'lista_compras.pdf'
        doc.save('lista_compras.pdf');
    });

    function updateTotal() {
        let total = 0;
        tbody.querySelectorAll('tr').forEach(row => {
            const totalPrice = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
            total += totalPrice;
        });
        totalElement.textContent = total.toFixed(2);
    }
});
