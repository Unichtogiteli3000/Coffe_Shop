/* проверка выолняется ли код на нужной странице, а потом гранатия того, что всё заугрзится до скрипта*/
if (window.location.pathname.includes('coffee-details.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const coffeeData = JSON.parse(localStorage.getItem('selectedCoffee'));

        let basePrice = 0;/** */

        // Заполнение страницы данными о выбранном кофе
        if (coffeeData) {
            document.querySelector('.coffee-info h1').textContent = coffeeData.name;
            document.querySelector('.coffee-image img').src = coffeeData.image;
            document.querySelector('.price-section h2').textContent = coffeeData.price;
            basePrice = parseFloat(coffeeData.price.replace('$', ''));
        }

        //Логика изменения количества чашек кофе
        const decreaseBtn = document.querySelector('.decrease-btn');
        const increaseBtn = document.querySelector('.increase-btn');
        const quantityNumber = document.querySelector('.quantity-number');
        let quantity = 1;//кол-во

        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityNumber.textContent = quantity;
                updatePrice();
            }
        });

        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityNumber.textContent = quantity;
            updatePrice();
        });

        //Логика выбора параметрров кофе
        const sizeButtons = document.querySelectorAll('.size-btn');
        const extraButtons = document.querySelectorAll('.extra-btn');
        const milkButtons = document.querySelectorAll('.milk-btn');

        function handleOptionSelection(buttons) {
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    updatePrice();
                });
            });
        }

        handleOptionSelection(sizeButtons);
        handleOptionSelection(extraButtons);
        handleOptionSelection(milkButtons);

        function updatePrice() {
            const selectedSize = document.querySelector('.size-btn.active').textContent;
            let finalPrice = basePrice;

            if (selectedSize === 'TALL') finalPrice += 1.0;
            if (selectedSize === 'GRANDE') finalPrice += 1.5;
            if (selectedSize === 'VENTI') finalPrice += 2.0;

            document.querySelector('.price-section h2').textContent = `$${(finalPrice * quantity).toFixed(2)}`;
        }

        if (coffeeData) {
            updatePrice();
        }

        //*офоррмляем зказа и сохраняем все данные в локальное хранилище*/ */
        document.querySelector('.place-order-btn').addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-btn.active').textContent;
            const selectedExtra = document.querySelector('.extra-btn.active').textContent;
            const selectedMilk = document.querySelector('.milk-btn.active').textContent;
            const finalPrice = parseFloat(document.querySelector('.price-section h2').textContent.replace('$', ''));

            const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
            orderDetails.push({
                name: coffeeData.name,
                size: selectedSize,
                extra: selectedExtra,
                milk: selectedMilk,
                quantity: quantity,
                totalPrice: `$${finalPrice.toFixed(2)}`
            });

            localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            alert('Order added to cart!');
            updateCartCount();
        });

        // создаем эл-т корщины на странице
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart-container');
        document.body.appendChild(cartContainer);

        const orderStatusBtn = document.querySelector('.status-btn');

        orderStatusBtn.addEventListener('click', () => {
            showCart();
        });

        function showCart() {
            const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
            let cartHTML = `
                <div class="cart-overlay">
                    <div class="cart-content">
                        <button class="close-cart">&times;</button>
                        <h2>Order Status</h2>
                        ${orderDetails.length > 0 ? orderDetails.map(order => `
                            <div class="cart-item">
                                <h3>${order.name}</h3>
                                <p>Size: ${order.size}</p>
                                <p>Milk: ${order.milk}</p>
                                <p>Extras: ${order.extra}</p>
                                <p>Quantity: ${order.quantity}</p>
                                <p>Total: ${order.totalPrice}</p>
                            </div>
                        `).join('') : '<p>Your cart is empty.</p>'}
                    </div>
                </div>
            `;

            cartContainer.innerHTML = cartHTML;
            cartContainer.style.display = 'block';

            document.querySelector('.close-cart').addEventListener('click', () => {
                cartContainer.style.display = 'none';
            });
        }

        //обновление счетчика корз
        function updateCartCount() {
            const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
            const totalCount = orderDetails.reduce((sum, order) => sum + order.quantity, 0);
            document.querySelector('.cart-count').textContent = totalCount;
        }

        //Обновляем счетчик при загрузке страницы
        updateCartCount();
    });
}
