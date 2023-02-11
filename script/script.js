document.querySelector('.header_burger').addEventListener('click', (e) => {

    if (document.querySelector('.header_burger').classList.contains('active')) {
        document.querySelector('.menu_active').classList.remove('active');
        document.querySelector('.header_burger').classList.remove('active');
    }
    else {
        document.querySelector('.menu_active').classList.add('active');
        document.querySelector('.header_burger').classList.add('active');
    }
})

//Закриваєм коли не нажато на блок
document.addEventListener('click', (e) => {

    if (!e.target.closest('.menu_active') && !e.target.classList.contains('active') && !e.target.closest('.header_burger') && !e.target.classList.contains('active')) {

        document.querySelector('.menu_active').classList.remove('active');
        document.querySelector('.header_burger').classList.remove('active');
    }
})
//Якщо нажато мімо
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown') && document.querySelector('.dropdown__list.active')) {
        document.querySelectorAll('.dropdown__list.active').forEach(item => {
            item.classList.remove('active');
        })
        document.querySelector('.dropdown__value.active').classList.remove('active');
        document.querySelector('.dropdown__arrow.active').classList.remove('active');
    }
})





//Перебираємо значення списка 
for (let j = 0; j < document.querySelectorAll('.dropdown').length; j++) {
    let dropdown = document.querySelectorAll('.dropdown')[j];
    dropdown.querySelector('.dropdown__value').addEventListener('click', function () {
        dropdown.querySelector('.dropdown__list').classList.toggle('active');
        dropdown.querySelector('.dropdown__value').classList.toggle('active');
        dropdown.querySelector('.dropdown__arrow').classList.toggle('active');
    })

    for (let i = 0; i < dropdown.querySelectorAll('.dropdown__item').length; i++) {
        let myEl = dropdown.querySelectorAll('.dropdown__item')[i];

        myEl.addEventListener('click', (e) => {
            dropdown.querySelector('.dropdown__value').textContent = myEl.textContent;
            dropdown.querySelector('.dropdown__list.active').classList.remove('active');
            dropdown.querySelector('.dropdown__value.active').classList.remove('active');
            dropdown.querySelector('.dropdown__arrow.active').classList.remove('active');

            if (myEl.classList.contains('active')) return false;

            if (dropdown.querySelector('.dropdown__item.active')) {
                dropdown.querySelector('.dropdown__item.active').classList.remove('active');
            }

            myEl.classList.add('active');
        })
    }
}



document.querySelector('.search-btn').addEventListener('click', () => {

    document.getElementById('search-box').focus();

    if (document.querySelector('.search-btn.active')) {
        document.getElementById('search-box').value = "";
    }
    document.querySelector('.search-box').classList.toggle('active');
    document.querySelector('.search-btn').classList.toggle('active');
})

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box') && !e.target.classList.contains('active')) {
        document.querySelector('.search-box').classList.remove('active');
        document.querySelector('.search-btn').classList.remove('active');
        document.getElementById('search-box').value = "";
    }
})

// INDEX PAGE
if (location.href.includes('index')) {
    window.onscroll = function () {
        let scroll = window.pageYOffset || document.documentElement.scrollTop;

        if (scroll > 315 && !document.querySelector('.header.scroll_active')) {
            document.querySelector('.header').classList.add('scroll_active');
        }
        else if (scroll < 315 && document.querySelector('.header.scroll_active')) {
            document.querySelector('.header.scroll_active').classList.remove('scroll_active');
        }
    }
}

//CATALOG PAGE
if (location.href.includes('catalog') && !document.querySelector('.header.scroll_active')) {
    document.querySelector('.header').classList.add('scroll_active');
}



if (window.innerWidth < 768) {

    let acc = document.getElementsByClassName('title_footer');
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function () {
            this.classList.toggle('active');
            let footerItem = this.nextElementSibling;
            if (footerItem.style.maxHeight) {
                footerItem.style.maxHeight = null;
            } else {
                footerItem.style.maxHeight = footerItem.scrollHeight + "px";
            }
        })
    }

    const addDropDownMoneyMobile = document.querySelector('#dropdown_money');
    const addDropDownLangMobile = document.querySelector('#dropdown_lang')

    document.querySelector('.logo').insertAdjacentElement('beforebegin', addDropDownLangMobile);
    document.querySelector('.mobile_search-lang').insertAdjacentElement('afterbegin', addDropDownMoneyMobile);
}




if (document.querySelector('.button_subscription') && document.querySelector('.subscription_input')) {

    let newValue = document.querySelector('.subscription_input');
    let btnEmail = document.querySelector('.button_subscription');

    document.querySelector('.button_subscription').addEventListener('click', (e) => {

        var mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // check for empty field
        if (newValue.value == "" || !newValue.value.match(mailFormat)) {
            newValue.style.border = "1px solid red";
            newValue.focus();
            btnEmail.setAttribute('disabled', 'true');
            btnEmail.style.backgroundColor = "gray";
            return false;
        } else {
            btnEmail.setAttribute('disabled', false);
            alert('Valid e-mail: ' + newValue.value);
            newValue.value = '';
        }
    })

    newValue.addEventListener('input', (e) => {
        newValue.style.borderColor = "black";
        btnEmail.removeAttribute('disabled');
        btnEmail.removeAttribute('style');
        return true;
    })
}
// перебираємо масив filter_value та вибираэмо на яке нажати
// вішаєм подію кліка на filter_value -- якщо нажато то добавляємо active і відкриваємо список
// перебрать значения масива filter_list
// вішаєм подію клік на filter_item
// якщо клікнутий якийсь елемент filter_item, то додаємо класс .active та зписуємо значення в filter_value
// 
//Створюємо пустий масив chosen_item, якщо натиснутий filter_item то значення з нього передаємо пустому масиву


const filterList = document.querySelectorAll('.filter');
let filterChoosenList = [];
filterChoosenList.push(2);

console.log(filterChoosenList)

filterList.forEach((filterEl) => {
    filterEl.addEventListener('click', (e) => {

        if (document.querySelector('.filter.active') && document.querySelector('.filter.active') !== filterEl) {
            document.querySelector('.filter.active').classList.remove('active')
        }

        if (filterEl.classList.contains('active')) {
            filterEl.classList.remove('active')
        } else {
            filterEl.classList.add('active')
        }


        if (e.target.classList.contains('filter_item')) {
            const itemValue = e.target.innerText.trim();

            if (filterChoosenList.includes(itemValue)) {
                console.log('Remove from filter list:', itemValue)
                filterChoosenList = filterChoosenList.filter(item => {
                    return item !== itemValue
                })
            } else {
                console.log('Add to filter list:', itemValue)
                filterChoosenList.push(itemValue)
            }

            console.log('Filters:', filterChoosenList);
            renderHtmlFilter(filterChoosenList);
        }
    })
});


function renderHtmlFilter(list) {
    const filterContainerEl = document.querySelector('.filter_chosen');
    filterContainerEl.innerHTML = '';

    list.forEach(item => {
        const elFilter = document.createElement('div');
        elFilter.classList.add('chosen_item');
        elFilter.innerText = item;

        filterContainerEl.insertAdjacentElement('beforeend', elFilter);

        elFilter.addEventListener('click', function () {
            list = list.filter(val => {
                return val !== item
            })
            renderHtmlFilter(list);
        })
    })
}



















