







document.addEventListener("DOMContentLoaded", function() {
	
	//image zoom init
	//initDriftZoom();

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		Carousel: {
			Thumbs: {
			  type: "classic",
			  Carousel: {
				center: (ref) => {
				  return (
					!ref.isVertical() || ref.getTotalSlideDim() > ref.getViewportDim()
				  );
				},
				vertical: false,
				breakpoints: {
				  "(min-width: 1024px)": {
					vertical: true,
				  },
				},
			  },
			},
		  },
	});




	//catalog menu header toggle
	const catalogToggleButtons = document.querySelectorAll('.js-btn-catalog-toggle');
	const catalogPopup = document.querySelector('.catalog-header-popup');
	catalogToggleButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			document.body.classList.remove('menu-show')
			document.body.classList.remove('filter-show')
			document.body.classList.remove('search-show')
			document.body.classList.toggle('catalog-show');
		});
	});
	document.addEventListener('click', (e) => {
	if (catalogPopup && !catalogPopup.contains(e.target) && !e.target.closest('.js-btn-catalog-toggle')) {
		document.body.classList.remove('catalog-show');
	}
	});


	//files add
	const fileBlocks = document.querySelectorAll('.js-field-file');
	if (fileBlocks) {
		fileBlocks.forEach(fileBlock => {
			const fileInput = fileBlock.querySelector('.js-field-input');
			const fileAttachButton = fileBlock.querySelector('.js-file-button-attach');
			const fileDeleteButton = fileBlock.querySelector('.js-file-button-del');
			const fileName = fileBlock.querySelector('.file-name');
		
			fileAttachButton.addEventListener('click', function() {
				fileInput.click();
			});
		
			fileInput.addEventListener('change', function() {
				if (fileInput.files.length > 0) {
					fileName.textContent = fileInput.files[0].name;
					fileBlock.classList.add('file-active');
				} else {
					fileName.textContent = '';
					fileBlock.classList.remove('file-active');
				}
			});
		
			fileDeleteButton.addEventListener('click', function(e) {
				e.preventDefault();
				fileName.textContent = '';
				fileBlock.classList.remove('file-active');
				fileInput.value = null;
			});
		});
	}


	//select toggle content visibility
	const inputs = document.querySelectorAll(
	"input[data-content], input[data-content-check], input[data-content-uncheck]"
	);

	inputs.forEach(function (input) {
	toggleContent(input);
	});

	inputs.forEach((input) => {
	input.addEventListener("click", function () {
		document.querySelectorAll(".frm-content").forEach((content) => {
		content.classList.remove("active");
			});

		inputs.forEach(toggleContent);
		});
	});

	document.querySelectorAll(".btn[data-content]").forEach((button) => {
	button.addEventListener("click", function () {
		let dataContent = this.getAttribute("data-content");
		this.disabled = true;
		document
		.querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
		.forEach((content) => {
			content.classList.add("active");
			});
		return false;
		});
	});

	function toggleContent(input) {
	let selectContent;
	if (input.checked) {
		selectContent =
		input.getAttribute("data-content-check") ||
		input.getAttribute("data-content");
		} else {
		selectContent = input.getAttribute("data-content-uncheck");
		}
	document
		.querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		.forEach((content) => {
		content.classList.add("active");
		});
	}
	document.querySelectorAll('.catalog-menu-box').forEach((catalogBox) => {
		catalogBox.addEventListener('change', (e) => {
			const changedInput = e.target;
	
			if (!changedInput.matches('.tags-inner-wrap input')) return;
	
			catalogBox
				.querySelectorAll('.menu-inner-wrap input:checked')
				.forEach((menuInput) => {
					menuInput.checked = false;
				});
			catalogBox
				.querySelectorAll('.submenu-action-wrap .frm-content.active')
				.forEach((menuInput) => {
					menuInput.classList.remove('active')
				});
		});
	});
	document.querySelectorAll(".catalog-menu-box").forEach((catalogBox) => {
		const clearHoverState = () => {
			catalogBox
				.querySelectorAll(".submenu-action-wrap .frm-content.active-hover")
				.forEach((content) => content.classList.remove("active-hover"));
		};
	
		catalogBox.querySelectorAll(".frm-select-text").forEach((selectText) => {
			const input = selectText.querySelector("input[data-content]");
			if (!input) return;
	
			selectText.addEventListener("mouseenter", () => {
				const dataContent = input.getAttribute("data-content");
				if (!dataContent) return;
	
				clearHoverState();
				catalogBox
					.querySelectorAll(`.frm-content[data-content="${dataContent}"]`)
					.forEach((content) => content.classList.add("active-hover"));
			});
	
			selectText.addEventListener("mouseleave", () => {
				clearHoverState();
			});
		});
	});



	


	//field-password
	const passwordToggle = document.querySelectorAll(".js-password-toggle");
	for (let i = 0; i < passwordToggle.length; i++) {
	  passwordToggle[i
		].addEventListener("click", function (e) {
		if (this.classList.contains("active")) {
		  this.classList.remove("active");
		  const input = this.closest(".frm-field-input").querySelector(
			".form-input"
		  );
		  input.type = "password";
			} else {
		  this.classList.add("active");
		  const input = this.closest(".frm-field-input").querySelector(
			".form-input"
		  );
		  input.type = "text";
			}
		e.preventDefault();
		})
	}

	//mask phone
	let telInputs = document.querySelectorAll('input[type="tel"]');
	if (telInputs.length > 0) {
		let im = new Inputmask("+7 (999) 999-99-99");
		im.mask(telInputs);
	}
    const phoneInput = document.querySelector('input[type="tel"]');
	const emailInput = document.querySelector('input[type="email"]');
    if (phoneInput) {
        const phoneContainer = phoneInput.closest('.frm-field-input');

        phoneInput.addEventListener('input', function() {
            const digits = this.value.replace(/\D/g, '');
            const isValid = digits.length === 11;
            updateValidationClass(phoneContainer, isValid);
        });
    }
    if (emailInput) {
        const emailContainer = emailInput.closest('.frm-field-input');
        
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
        
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
    }
	function updateValidationClass(container, isValid) {
		const input = container.querySelector('input');
		const hasValue = input.value.trim().length > 0;
		const isAutofilled = input.matches(':-webkit-autofill');
		const shouldBeVerified = isValid || isAutofilled;
		if (shouldBeVerified) {
			container.classList.add('inp-verify');
			container.classList.remove('inp-error');
			if (isAutofilled) {
				container.classList.add('inp-autofilled');
			} else {
				container.classList.remove('inp-autofilled');
			}
		} else {
			container.classList.remove('inp-verify', 'inp-autofilled');
			
			if (hasValue) {
				container.classList.add('inp-error');
			} else {
				container.classList.remove('inp-error');
			}
		}
	}
    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});

	

	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')

	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('catalog-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		const wrapEl = document.querySelector('.wrap')
		const wrapWidth = wrapEl ? wrapEl.offsetWidth : 0
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (let i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			return false
		})
	}
	for (let i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block') && !event.target.closest('.js-btn-popup-toggle')) {
			//popupElementsClear()
			popupElementsClose()
		}
	}


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')

	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().split(' ').indexOf(tabsNavElementActive) > -1) {
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
	}

	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				for (let j = 0; j < tabsButtonTitle.length; j++) {
					if (tabsButtonTitle[j].classList.contains('active')) {
						tabsButtonTitle[j].classList.remove('active')
					}
				}
				this.classList.add('active')
			}
			e.preventDefault()
			return false
		})
	}

	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				return false
			}
		})
	}

	tabsActiveStart()



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box');
	let popupTimer = null;

	// Функция для добавления таймера в кнопку закрытия
	function initPopupTimer(popupElement, timerSeconds) {
		const closeBtn = popupElement.querySelector('.js-popup-close');
		if (!closeBtn) return;
		
		const originalBtnHtml = closeBtn.innerHTML;
		
		const timerSpan = document.createElement('span');
		timerSpan.className = 'button-timer';
		closeBtn.appendChild(timerSpan);
		
		let remainingSeconds = timerSeconds;
		
		function updateTimer() {
			if (remainingSeconds > 0) {
				timerSpan.textContent = `Закрыть через ${remainingSeconds} сек`;
				remainingSeconds--;
				popupTimerInterval = setTimeout(updateTimer, 1000);
			} else {
				document.body.classList.remove("popup-open");
				popupElement.classList.remove("active");
				
				closeBtn.innerHTML = originalBtnHtml;
				clearTimeout(popupTimerInterval);
			}
		}
		
		let popupTimerInterval;
		updateTimer();
		
		closeBtn.addEventListener('click', function() {
			if (popupTimerInterval) {
				clearTimeout(popupTimerInterval);
			}
			closeBtn.innerHTML = originalBtnHtml;
		});
	}

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
		element.addEventListener("click", function (e) {
			document.querySelector(".popup-outer-box")?.classList.remove("active");
			document.body.classList.add("popup-open");
			
			if (popupTimer) {
				clearTimeout(popupTimer);
				popupTimer = null;
			}
			
			for (let i = 0; i < popupsList.length; i++) {
				popupsList[i].classList.remove("active");
			}
			
			popupCurrent = this.getAttribute("data-popup");
			const popupElement = document.querySelector(`.popup-outer-box[id="${popupCurrent}"]`);
			popupElement.classList.add("active");
			
			const timerValue = popupElement.getAttribute("data-timer");
			if (timerValue) {
				const timerMs = parseInt(timerValue);
				if (!isNaN(timerMs) && timerMs > 0) {
					initPopupTimer(popupElement, timerMs);
					
					popupTimer = setTimeout(function() {
						document.body.classList.remove("popup-open");
						document.body.classList.remove("popup-open-scroll");
						popupElement.classList.remove("active");
						popupTimer = null;
					}, timerMs * 1000);
				}
			}
			
			e.preventDefault();
			return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
		element.addEventListener("click", function (event) {
			if (popupTimer) {
			clearTimeout(popupTimer);
			popupTimer = null;
			}
			
			document.body.classList.remove("popup-open");
			for (let i = 0; i < popupsList.length; i++) {
			popupsList[i].classList.remove("active");
			}
			event.preventDefault();
			//event.stopPropagation();
		});
	});
	window.openPopupMessage = function(selector) {
		const popupElement = document.querySelector(selector);
		if (!popupElement) return;
	  
		document.body.classList.add('popup-open');
		popupElement.classList.add('active');
	};


	
	//slider tiles
	const sliderstiles = document.querySelectorAll(".slider-tiles");

	sliderstiles.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tiles-pagination");
		const nextEl = container.querySelector(".button-slider-tiles-next");
		const prevEl = container.querySelector(".button-slider-tiles-prev");

		if (!swiperEl) return;
		const hasAutoHeight = container.dataset.height === "auto";
		
		const hasCatalogTiles = container.querySelectorAll(".item-tile-catalog").length > 0;
		
		const swiperConfig = {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: hasAutoHeight,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		};
		
		if (hasCatalogTiles) {
			swiperConfig.breakpoints = {
				1024: {
					allowTouchMove: false,
				},
			};
		}
		
		new Swiper(swiperEl, swiperConfig);
	});



	//slider catalog photos
	const sliderscat = document.querySelectorAll(".slider-cat");
	
	sliderscat.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".tile-slider-cat-pagination");
	
		if (!swiperEl) return;
		const hasAutoHeight = container.dataset.height === "auto";
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: hasAutoHeight,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: false,
		});
	});


	//slider lead
	const slidersmain = document.querySelectorAll(".slider-main");
	
	slidersmain.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-main-pagination");
	
		if (!swiperEl) return;
	const hasAutoHeight = container.dataset.height === "auto";
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: hasAutoHeight,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation:false,
		});
	});



	//slider photos thumbs preview
		document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 6,
			spaceBetween: 0,
			threshold: 5,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: {
				nextEl: nextTBtn,
				prevEl: prevTBtn,
			},
			breakpoints: {
				1400: {
					direction: 'vertical',
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: false,
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});


	// cart: table-wrapper totals (data-table="table-price" | table-count | table-total | table-total-all")
	initCartTableTotals();

})

function initCartTableTotals() {
	const wrappers = document.querySelectorAll('.table-wrapper');
	if (!wrappers.length) return;

	function parseNumericText(str) {
		if (str == null || str === '') return 0;
		const cleaned = String(str).replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '');
		const n = parseFloat(cleaned);
		return isNaN(n) ? 0 : n;
	}

	function unitPrice(wrapper) {
		const el = wrapper.querySelector('[data-table="table-price"]');
		return el ? parseNumericText(el.textContent) : 0;
	}

	function sumQty(wrapper) {
		let sum = 0;
		wrapper.querySelectorAll('table input[type="text"]').forEach(function (input) {
			sum += parseNumericText(input.value);
		});
		return sum;
	}

	function formatMoneyRu(n) {
		return Math.round(n).toLocaleString('ru-RU');
	}

	function setTotalNodeText(el, value, formatFn) {
		el.textContent = formatFn(value);
	}

	let recalcT = null;
	function scheduleRecalc() {
		clearTimeout(recalcT);
		recalcT = setTimeout(recalcAll, 0);
	}

	function getCartTotalsObserveRoot() {
		const wraps = document.querySelectorAll('.table-wrapper');
		if (!wraps.length) return null;

		function ancestors(el) {
			const list = [];
			let n = el;
			while (n) {
				list.push(n);
				n = n.parentElement;
			}
			return list;
		}

		let common = ancestors(wraps[0]);
		for (let i = 1; i < wraps.length; i++) {
			const a = ancestors(wraps[i]);
			const set = new Set(a);
			common = common.filter(function (node) {
				return set.has(node);
			});
		}

		const allEl = document.querySelector('[data-table="table-total-all"]');
		if (allEl) {
			const set = new Set(ancestors(allEl));
			common = common.filter(function (node) {
				return set.has(node);
			});
		}

		return common[0] || null;
	}

	function recalcAll() {
		let grand = 0;
		document.querySelectorAll('.table-wrapper').forEach(function (wrapper) {
			const price = unitPrice(wrapper);
			const qty = sumQty(wrapper);
			const lineTotal = price * qty;
			grand += lineTotal;

			const countEl = wrapper.querySelector('[data-table="table-count"]');
			const totalEl = wrapper.querySelector('[data-table="table-total"]');
			if (countEl) {
				setTotalNodeText(countEl, qty, function (v) {
					return Number.isInteger(v) || Math.abs(v - Math.round(v)) < 1e-9
						? String(Math.round(v))
						: String(v);
				});
			}
			if (totalEl) {
				setTotalNodeText(totalEl, lineTotal, formatMoneyRu);
			}
		});

		const allEl = document.querySelector('[data-table="table-total-all"]');
		if (allEl) {
			setTotalNodeText(allEl, grand, formatMoneyRu);
		}
	}

	function targetInWrapperTable(target) {
		if (!target || !target.closest) return null;
		const wrap = target.closest('.table-wrapper');
		if (!wrap) return null;
		const table = wrap.querySelector('table');
		if (!table || !table.contains(target)) return null;
		return wrap;
	}

	document.addEventListener(
		'click',
		function (e) {
			if (targetInWrapperTable(e.target)) queueMicrotask(recalcAll);
		},
		false
	);

	document.addEventListener(
		'input',
		function (e) {
			if (e.target.matches && e.target.matches('table input[type="text"]') && e.target.closest('.table-wrapper')) {
				scheduleRecalc();
			}
		},
		false
	);

	document.addEventListener(
		'change',
		function (e) {
			if (e.target.matches && e.target.matches('table input[type="text"]') && e.target.closest('.table-wrapper')) {
				recalcAll();
			}
		},
		false
	);

	document.addEventListener(
		'focusout',
		function (e) {
			if (e.target.matches && e.target.matches('table input[type="text"]') && e.target.closest('.table-wrapper')) {
				recalcAll();
			}
		},
		true
	);

	document.addEventListener(
		'mouseup',
		function (e) {
			if (targetInWrapperTable(e.target)) recalcAll();
		},
		false
	);

	document.addEventListener(
		'touchend',
		function (e) {
			if (targetInWrapperTable(e.target)) recalcAll();
		},
		false
	);

	const observeRoot = getCartTotalsObserveRoot();
	if (observeRoot) {
		new MutationObserver(function (records) {
			for (let r = 0; r < records.length; r++) {
				const rec = records[r];
				let i;
				for (i = 0; i < rec.removedNodes.length; i++) {
					const n = rec.removedNodes[i];
					if (
						n.nodeType === 1 &&
						(n.classList.contains('table-wrapper') || n.querySelector('.table-wrapper'))
					) {
						scheduleRecalc();
						return;
					}
				}
				for (i = 0; i < rec.addedNodes.length; i++) {
					const n = rec.addedNodes[i];
					if (
						n.nodeType === 1 &&
						(n.classList.contains('table-wrapper') || n.querySelector('.table-wrapper'))
					) {
						scheduleRecalc();
						return;
					}
				}
			}
		}).observe(observeRoot, { childList: true, subtree: true });
	}

	recalcAll();
}

//image zoom
function initDriftZoom() {
	const zoomImages = document.querySelectorAll('.photo-zoom img');
  
	zoomImages.forEach(img => {
	  if (img.dataset.driftInitialized) return;
  
	  const link = img.closest('a');
	  if (!link) return;
	  const largeImageUrl = link.getAttribute('href');
  
	  if (!img.hasAttribute('data-zoom')) {
		img.setAttribute('data-zoom', largeImageUrl);
	  }
  
	  const wrap = img.closest('.sl-wrap') || img.parentNode;
	  let paneContainer = wrap.querySelector('.drift-zoom-pane');
	  if (!paneContainer) {
		paneContainer = document.createElement('div');
		paneContainer.className = 'drift-zoom-pane';
		wrap.style.position = 'relative';
		wrap.appendChild(paneContainer);
	  }
  
	  new Drift(img, {
		paneContainer: paneContainer,
		inlinePane: true,  // ← Главное изменение: было false, нужно true
		zoomFactor: 3,
		handleTouch: true,
		sourceAttribute: 'data-zoom',
		containInline: false,
		hoverBoundingBox: false
	  });
  
	  img.dataset.driftInitialized = 'true';
	});
  }
  