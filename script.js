// для открытия и закрытия корзины
const orderStatusBtn = document.querySelector('.status-btn');
const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
document.body.appendChild(cartContainer);

// для сортировки
const coffeeLinks = document.querySelectorAll('.coffee-type') //все эл-ты sidebar
const menuItems = document.querySelectorAll('.menu-item') // все эл-ты main-container

// Для sidebar
const coffeeList = document.getElementById('coffee-list');
const coffeeItems = coffeeList.querySelectorAll('li');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn'); 

// обработчик события на каждый тип кофе
coffeeLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        console.log('click')
        event.preventDefault() // предотвращение стандартного поведения ссылки, то есть перезагрузки страницы
        const coffeeType = this.getAttribute('data-type')
        menuItems.forEach(item => {
            const itemType = item.getAttribute('data-type') // если сделать this, то оно почему-то снова будет ссылаться на link
            if (coffeeType === 'all' || coffeeType === itemType) {
                item.style.display = 'block'
            }
            else {
                item.style.display = 'none'
            }
        })
    })
})





/* ставит ша каждую кноаку add обработчки событий, благодаря которому мы переходим на страницу с конкртным кофе */
const addButtons = document.querySelectorAll('.add-btn');

addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const coffeeCard = event.target.closest('.menu-item');
        const coffeeName = coffeeCard.querySelector('h3').textContent;
        const coffeeImageSrc = coffeeCard.querySelector('img').src;
        const coffeePrice = coffeeCard.querySelector('.price').textContent;

        const coffeeData = {
            name: coffeeName,
            image: coffeeImageSrc,
            price: coffeePrice
        };
        localStorage.setItem('selectedCoffee', JSON.stringify(coffeeData));
        // Переход на страницу карточки кофе
        window.location.href = 'coffee-details.html';
    });
});





/* показывается три типа кофе в sidebar - не больше - не меньше */
let currentIndex = 0;
const itemsPerPage = 3;
// Функция для отображения элементов - типов в Sidebar
function showItems(startIndex) {
    coffeeItems.forEach((item, index) => {
        if (index >= startIndex && index < startIndex + itemsPerPage) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}
showItems(currentIndex);
// Обработчик для кнопки вниз В сайдбаре
nextBtn.addEventListener('click', () => {
    if (currentIndex + itemsPerPage < coffeeItems.length) {
        currentIndex++;
        showItems(currentIndex);
    }
});
// Обработчик для кнопки вверх в сайдбар
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showItems(currentIndex);
    }
});




/* фильтрация поиска */
// Получаем элементы для поиска
const searchBar = document.getElementById('search-bar');
//
// Функция для поиска и фильтрации кофе
searchBar.addEventListener('input', function () {
    const searchTerm = searchBar.value.toLowerCase();

    menuItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

//
// Открытие и закрытие корзины
orderStatusBtn.addEventListener('click', () => {
    showCart();
});




// dunc для отображения корзинки
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

    //Закрытие корзины
    document.querySelector('.close-cart').addEventListener('click', () => {
        cartContainer.innerHTML = '';
    });
}


//Обновление счетчика корзины
function updateCartCount() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
    const totalCount = orderDetails.reduce((sum, order) => sum + order.quantity, 0);
    document.querySelector('.cart-count').textContent = totalCount;
}

/*Обновляем счетчик при загрузке страницы*/
updateCartCount();
