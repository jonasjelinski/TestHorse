var Pages = Pages || {};

Pages = function(){
	let that = {},
		domElement,
		pageChanger,
		mainPage;

	function init(){
		domElement = document.getElementById("parentPage"),
		pageChanger = Pages.PageChanger(domElement);
		pageChanger.init();
		mainPage = new MainPage();		
	}

	function showLoginPage(){
		pageChanger.switchPage("LOGIN");
	}

	function showMainPage(){
		pageChanger.switchPage("MAIN");
		mainPage.init();
	}

	that.showMainPage = showMainPage;
	that.init = init;
	return that;
}


