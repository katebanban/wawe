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


//* ПЛАВНЫЙ СКРОЛЛ НА ВСЕ ССЫЛКИ ВНУТРИ СТРАНИЦЫ (+ перемещение К САМОМУ НАЧАЛУ секции для ссылок, ведущих к секциям на странице)

const allLinks = document.querySelectorAll('a');

allLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		const href = link.getAttribute('href');

		if (href === "#") {
			e.preventDefault();

			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}

		if (href !== '#' && href.startsWith('#')) {
			e.preventDefault();

			// находим секцию, на которую ведёт нажатая ранее ссылка по href (адресу)
			const sectionEl = document.querySelector(href);
			// находим координаты самого верха (начала) секции
			const sectionElPosition = sectionEl.getBoundingClientRect().top;

			window.scrollBy({
				top: sectionElPosition,
				behavior: 'smooth',
			})
		}
	})
})