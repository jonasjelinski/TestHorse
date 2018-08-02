var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Central modul of <code>Pages</code> which handles the communcation between the different pages.
 * <code><Pages/code> contains all pages of the app and determines which page should be showed to the client
 */
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


