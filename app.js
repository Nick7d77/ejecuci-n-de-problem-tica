function addProduct() {
    const name = document.getElementById('product-name').value;
    const stock = parseInt(document.getElementById('product-stock').value);

    if (name && stock) {
        db.collection('products').add({
            name: name,
            stock: stock
        })
        .then(() => {
            alert('Producto agregado correctamente');
            loadProducts();
        })
        .catch(error => {
            console.error('Error agregando producto: ', error);
        });
    } else {
        alert('Por favor completa todos los campos');
    }
}

function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    db.collection('products').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const item = document.createElement('li');
            item.textContent = `${doc.data().name} - Stock: ${doc.data().stock}`;
            productList.appendChild(item);
        });
    });
}

// Cargar productos al iniciar
window.onload = loadProducts;
