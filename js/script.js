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


//* Скрыть HEADER при прокрутке вниз и показать его при прокрутке вверх
const defaultOffset = headerActualHeight / 2; // то расстояние, после которого исчезнет header при скролле вниз
let lastScroll = 0; // отвечает за последнюю позицию прокрутки, т.е. относительно него мы будем отмечать, куда мы скроллим страницу: вверх или вниз

// функция, определяющая позицию скролла === где мы сейчас находимся
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

// функция, которая определяет, есть ли у нас класс hidden на header
const containsHidden = () => header.classList.contains('hidden');

window.addEventListener('scroll', () => {

	if (scrollPosition() > lastScroll && !containsHidden() && scrollPosition() > defaultOffset) {
		// scroll down
		header.classList.add('hidden');
	} else if (scrollPosition() < lastScroll && containsHidden()) {
		// scroll up
		header.classList.remove('hidden');
	}


	if (scrollPosition() > headerActualHeight) {
		header.classList.add('bg-color');
	}

	if (scrollPosition() === 0) {
		header.classList.remove('bg-color');
	}

	lastScroll = scrollPosition();
})


//* ПЛАВНЫЙ СКРОЛЛ НА ВСЕ ССЫЛКИ ВНУТРИ СТРАНИЦЫ (+ перемещение К САМОМУ НАЧАЛУ секции для ссылок, ведущих к секциям на странице)

const allLinks = document.querySelectorAll('a');

allLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		const href = link.getAttribute('href');
		const headerHeight = document.querySelector('header.header').offsetHeight;
		//console.log(headerHeight);

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
			// находим координаты начала секции с учётом размера шапки сверху (чтоб шапка не налазила на секцию, а стояла ПЕРЕД ней)
			let offsetPosition = sectionElPosition - headerHeight;

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	})
})


//* ТАБЫ ГАЛЛЕРЕИ (изменение цвета при нажатии)
const allTabsBtns = document.querySelectorAll('.tabs__btn');

// сделали изначально активной первую кнопку
allTabsBtns[0].classList.add('active');

// перебираем все кнопки
allTabsBtns.forEach((tabsBtn) => {
	// добавляем событие по клику на кнопку
	tabsBtn.addEventListener('click', () => {
		// снова перебираем все кнопки
		allTabsBtns.forEach((tabsBtn) => {
			// чтобы после клика убрать active со всех кнопок
			tabsBtn.classList.remove('active');
		})

		// добавляем active конкретно нажатой кнопке
		tabsBtn.classList.add('active');
	})
})


//* ФИЛЬТРЫ ГАЛЛЕРЕИ (при нажатии на определённые табы появляются соответствующие данной категории карточки)
const allGalleryCards = document.querySelectorAll('.gallery-list__item');

// перебираем все кнопки-фильтры
allTabsBtns.forEach((tabsBtn) => {
	// чтобы добавить событие по клику
	tabsBtn.addEventListener('click', () => {
		// находим категорию конкретно нажатой кнопки
		const currentBtnCategory = tabsBtn.getAttribute('data-filter-btn');

		// перебираем все карточки
		allGalleryCards.forEach((galleryCard) => {
			// убираем класс hidden у ВСЕХ карточек (это нужно, чтобы при выборе каждой следующей категории сбросить предыдущую)
			galleryCard.classList.remove('hidden');

			// прячем все карточки, у которых значение атрибута data-filter-category НЕ СОВПАДАЕТ со значением атрибута data-filter-btn
			if (!galleryCard.getAttribute('data-filter-category').includes(currentBtnCategory)) {
				galleryCard.classList.add('hidden');
			}

			// если у нажатой кнопки значение атрибута data-filter-btn включает в себя all, то мы со всех карточек убираем класс hidden (т.е. показываем ВСЕ карточки)
			if (currentBtnCategory.includes('all')) {
				galleryCard.classList.remove('hidden');
			}
		})
	})
})


//* FANCYBOX (Галлерея)
Fancybox.bind("[data-fancybox]", {
	// Your custom options
});


//* SWIPER
const swiper = new Swiper('.blog__slider', {
	// Optional parameters
	loop: true,
	spaceBetween: 10, // от себя

	// If we need pagination
	pagination: {
		el: '.blog__pagination',
		clickable: true,
	},
});