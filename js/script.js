//* MENU
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
const menuLinks = document.querySelectorAll('.menu a');
const header = document.querySelector('.header');
const body = document.querySelector('body');

menuBtn.addEventListener('click', () => {
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
	header.classList.toggle('active');
	body.classList.toggle('no-scroll');
});

menuLinks.forEach((menuLink) => {
	menuLink.addEventListener('click', () => {
		menuBtn.classList.remove('active');
		menu.classList.remove('active');
		header.classList.remove('active');
		body.classList.remove('no-scroll');
	})
})


//* АВТОВЫЧИСЛЕНИЕ ВЫСОТЫ ШАПКИ (защищает контент секции first от "налезания" шапки, если высота шапки будет меняться по какой-то причине)
const headerActualHeight = header.offsetHeight; // создали переменную, в которую ложим актуальную высоту шапки
const root = document.querySelector(':root'); // нашли css-селектор root (хранилище глобальных переменных)

root.style.setProperty('--header-height', `${headerActualHeight}px`); // заменили переменную с заданной высотой шапки из CSS на переменную с актуальной высотой шапки из JS
