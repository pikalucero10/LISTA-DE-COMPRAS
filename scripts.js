document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const shoppingList = document.getElementById('shopping-list');
    const totalElement = document.getElementById('grand-total');
    const tbody = shoppingList.querySelector('tbody');
    const addUpdateBtn = document.getElementById('add-update-btn');
    const cancelUpdateBtn = document.getElementById('cancel-update-btn');
    const rowIndexInput = document.getElementById('row-index');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const product = document.getElementById('product').value;
        const price = parseFloat(document.getElementById('price').value);
        const quantity = parseInt(document.getElementById('quantity').value);

        if (product && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
            if (rowIndexInput.value) {
                // Modo edición
                const rowIndex = parseInt(rowIndexInput.value);
                const row = tbody.rows[rowIndex];
                row.cells[0].textContent = product;
                row.cells[1].textContent = `$${price.toFixed(2)}`;
                row.cells[2].textContent = quantity;
                const total = price * quantity;
                row.cells[3].textContent = `$${total.toFixed(2)}`;

                rowIndexInput.value = '';
                addUpdateBtn.textContent = 'Agregar';
                cancelUpdateBtn.style.display = 'none';
            } else {
                // Modo agregar nueva fila
                const total = price * quantity;
                const newRow = `
                    <tr>
                        <td>${product}</td>
                        <td>$${price.toFixed(2)}</td>
                        <td>${quantity}</td>
                        <td>$${total.toFixed(2)}</td>
                        <td>
                            <button class="edit-btn">Editar</button>
                            <button class="delete-btn">Eliminar</button>
                        </td>
                    </tr>
                `;
                tbody.insertAdjacentHTML('beforeend', newRow);
            }

            updateTotal();
            form.reset();
        } else {
            alert('Por favor ingresa un producto válido, precio y cantidad.');
        }
    });

    tbody.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            // Obtener la fila actual
            const row = target.closest('tr');
            const cells = row.cells;
            const product = cells[0].textContent;
            const price = parseFloat(cells[1].textContent.replace('$', ''));
            const quantity = parseInt(cells[2].textContent);

            // Llenar el formulario de edición
            document.getElementById('product').value = product;
            document.getElementById('price').value = price;
            document.getElementById('quantity').value = quantity;

            // Guardar el índice de la fila para edición
            rowIndexInput.value = row.rowIndex - 1;

            // Cambiar el texto y mostrar el botón de cancelar
            addUpdateBtn.textContent = 'Actualizar';
            cancelUpdateBtn.style.display = 'inline-block';
        } else if (target.classList.contains('delete-btn')) {
            // Eliminar la fila
            const row = target.closest('tr');
            row.remove();
            updateTotal();
        }
    });

    cancelUpdateBtn.addEventListener('click', function() {
        // Cancelar la edición
        rowIndexInput.value = '';
        addUpdateBtn.textContent = 'Agregar';
        cancelUpdateBtn.style.display = 'none';
        form.reset();
    });

    const downloadBtn = document.getElementById('download-pdf');

    downloadBtn.addEventListener('click', function() {
        const doc = new jsPDF();

        doc.text('Lista de Compras', 20, 10);

        const table = document.getElementById('shopping-list');
        const tableHtml = table.outerHTML;

        doc.autoTable({ html: tableHtml });

        // Descargar el archivo PDF con nombre 'lista_compras.pdf'
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
