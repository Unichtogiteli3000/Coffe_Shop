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
