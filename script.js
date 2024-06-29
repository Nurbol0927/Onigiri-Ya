document.addEventListener('DOMContentLoaded', () => {
    const cart = {};

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const foodItem = event.target.closest('.food-item'); // Находим ближайший родительский элемент .food-item
            const foodId = foodItem.getAttribute('data-id'); // Получаем data-id товара
            const foodName = foodItem.querySelector('h2').textContent.trim(); // Получаем название товара
            const foodPriceText = foodItem.querySelector('.price').textContent.trim(); // Получаем цену товара
            const foodPrice = parseFloat(foodPriceText.replace('Price: ', '').replace('¥', '')); // Преобразуем цену в число

            console.log(`Adding item: ${foodName}, ID: ${foodId}, Price: ${foodPrice}`);

            if (!cart[foodId]) {
                cart[foodId] = { name: foodName, price: foodPrice, quantity: 1 };
            } else {
                cart[foodId].quantity++;
            }

            updateCart(); 
        });
    });

    function updateCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; 

        let totalPrice = 0;

        Object.keys(cart).forEach(id => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const itemTotalPrice = cart[id].price * cart[id].quantity;
            totalPrice += itemTotalPrice;

            cartItem.innerHTML = `
                <span>${cart[id].name} x${cart[id].quantity}</span>
                <span>${itemTotalPrice.toFixed(2)} ¥</span>
                <button class="remove-item" data-id="${id}">delete</button>
            `;

            cartItemsContainer.appendChild(cartItem); 
        });

        const totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = `Total price: ${totalPrice.toFixed(2)} ¥`;

        cartItemsContainer.appendChild(totalPriceElement); 

        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', event => {
                const foodId = event.target.getAttribute('data-id');
                if (cart.hasOwnProperty(foodId)) {
                    delete cart[foodId]; 
                    updateCart(); 
                }
            });
        });
    }
});
