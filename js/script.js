
/*-----------------------------ПЕРЕМЕННЫЕ----------------------------------------*/

//ПЕРЕМЕННЫЕ ДЛЯ МОБИЛЬНОГО МЕНЮ
var mobileMenuButton = document.querySelector(".site-header .mobile-nav-btn");
var mobileMenuButtonActive = false;
var mobileMenu = document.querySelector(".site-navigation .mobile-menu");
var mobileMenuItemCopy = document.querySelector(".mobile-menu-item-copy");

//КНОПКА ВОЗВРАТА НАВЕРХ
var upButton = document.querySelector("body .up-button");
var upButtonLink = document.querySelector("body .up-button a");

//ПЕРЕМЕННЫЕ ДЛЯ АНИМАЦИИ ВЕРХНЕГО МЕНЮ
var lastId,
	topMenu = $("#top-menu"),
	topMenuHeight = topMenu.outerHeight(),
	topHeader = $("#top-header"),
	topHeaderHeight = topHeader.outerHeight(),
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});

/*-------------------------------------------------------------------------------------*/



/*-----------------------------------СОБЫТИЯ--------------------------------------*/

//КНОПКА ОТКРЫВАНИЯ МОБИЛЬНОГО МЕНЮ
mobileMenuButton.addEventListener("click", function (event) {
	event.preventDefault();
	
	//Закрывание меню
	if (mobileMenu.classList.contains("mobile-menu-opened"))
	{
		mobileMenu.classList.remove("mobile-menu-opened");
		mobileMenu.classList.add("mobile-menu-closed");
		
		/*mobileMenu.classList.remove("mobile-menu-show");*/
		//Без !important стили не задаются
		mobileMenu.style.visibility = "hidden";
		mobileMenu.style.opacity = "0";
		
		mobileMenuButton.classList.remove("mobile-nav-btn-active");
		//Без !important стиль не задается
		mobileMenuButton.style.top = "0";
		mobileMenuButtonActive = false;
		
		$("#about-me-id").stop().animate({ 
			paddingTop: 0
		}, 600, "swing");

	}
	
	//Открывание меню
	else if 	(mobileMenu.classList.contains("mobile-menu-closed") ||
				(mobileMenu.classList.contains("mobile-menu")))
	{
		/*mobileMenu.classList.add("mobile-menu-show");*/
		//Без !important стили не задаются
		mobileMenu.style.visibility = "visible";
		mobileMenu.style.opacity = "1";
		
		
		mobileMenu.classList.remove("mobile-menu-closed");
		mobileMenu.classList.add("mobile-menu-opened");
		
		mobileMenuButton.classList.add("mobile-nav-btn-active");
		//Без !important стиль не задается
		mobileMenuButton.style.top = "20px";
		mobileMenuButtonActive = true;
		
		$("#about-me-id").stop().animate({ 
			paddingTop: topMenuHeight - topHeaderHeight +10
		}, 600, "swing");

	}
});

//КЛИК ПО ПУНКТУ МЕНЮ С ПОСЛЕДУЮЩИМ СКРОЛЛОМ
menuItems.click(function(e){
	var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topHeaderHeight+1;
		
	if (mobileMenuButtonActive) {
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight;
	}
	
	$('html, body').stop().animate({ 
		scrollTop: offsetTop
	}, 600);
	e.preventDefault();
});

//КЛИК ПО КНОПКЕ ВОЗВРАЩЕНИЯ НАВЕРХ
$(document).on("click", "body .up-button a", function(e){
	
	$('html, body').stop().animate({ 
		scrollTop: 0
	}, 600);
	
	e.preventDefault();
});

//СКРОЛЛ
$(window).scroll(function(){
	
	if (window.pageYOffset > 600) {
		upButton.style.right = "30px";
	} 
	else {
		upButton.style.right = "-1000px";
	}
	
	//Берет позицию скролла контейнера
	var fromTop = $(this).scrollTop()+topHeaderHeight;
	
	if (mobileMenuButtonActive) {
		fromTop = $(this).scrollTop() + topMenuHeight + 10;
	}
	
	//Берет id текущего скролл элемента
	var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop)
		return this;
	});
	//Берет id текущего элемента
	cur = cur[cur.length-1];
	var id = cur && cur.length ? cur[0].id : "";
   
	if (lastId !== id) {
		lastId = id;
		// Задает/удаляет класс .active
		menuItems
			.parent().removeClass("active")
			.end().filter("[href='#"+id+"']").parent().addClass("active");
		
		//Копирование текущего пункта меню в мобильный header
		var mobileMenuLiActive = document.querySelector(".site-navigation .mobile-menu .active a");
		
		if (window.pageYOffset > 100) {
			$(".mobile-menu-item-copy").animate({ 
				opacity: "0"
			}, 0);
		}
		
		mobileMenuItemCopy.innerHTML = mobileMenuLiActive.innerHTML;
		
		if (window.pageYOffset > 100) {
			$(".mobile-menu-item-copy").animate({ 
				opacity: "1"
			}, 600);
		}
		
	}     
});


/*-------------------------------------------------------------------------------------*/


