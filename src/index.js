import './sass/main.scss';
import menuCards from './menu.json';
import menuCardsTpl from "./templates/menu_template.hbs";

// refs
const menuContainerRef = document.querySelector('.js-menu');
const bodyRef = document.querySelector('body');
const switchRef = document.querySelector('#theme-switch-toggle');


const menuMarkup = createMenuMarkup(menuCards);

menuContainerRef.insertAdjacentHTML('beforeend', menuMarkup);

function createMenuMarkup(menuCards) {
    return menuCardsTpl(menuCards);
};


// Theme change

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

switchRef.addEventListener('change', onSwitchChange);


let currentTheme;
LocalStorageCurrentThemeCheck(); //определяем текущую тему в Local Storage

// Проверяем при загрузке страницы тему в Local Storage и применяем ее (учитывая чекбокс)

function themeCheck() {
    if (currentTheme === Theme.DARK) {
        switchRef.checked = true;
    } else if (localStorage.getItem('class') === null) {
        localStorage.setItem('class', Theme.LIGHT);
        LocalStorageCurrentThemeCheck();
        // bodyRef.classList.add(currentTheme);
    }
    themeChange()
};

themeCheck();

function onSwitchChange(event) {
    if (event.target.checked) {
        localStorage.setItem('class', Theme.DARK);
    } else {
        localStorage.setItem('class', Theme.LIGHT);
    };

    //переопределяем переменную чтобы узнать текущую тему после события
    LocalStorageCurrentThemeCheck();

    themeChange()
}

//Убираем все классы с body и применяем нужную тему
function themeChange() {
    bodyRef.classList.remove(Theme.LIGHT);
    bodyRef.classList.remove(Theme.DARK);

    bodyRef.classList.add(currentTheme);
}

function LocalStorageCurrentThemeCheck() {
    currentTheme = localStorage.getItem('class');
}
