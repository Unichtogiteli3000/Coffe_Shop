const coffeeLinks = document.querySelectorAll('.coffee-type') //все эл-ты sidebar
const menuItems = document.querySelectorAll('.menu-item') // все эл-ты main-container
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