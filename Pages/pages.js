var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Central modul of <code>Pages</code> which handles the communcation between the different pages.
 * <code><Pages/code> contains all pages of the app and determines which page should be showed to the client
 */
Pages = function(){
	let that = {},
		pageDomElement,
		pageChanger,
		loginPage,
		mainPage,
		userProfilPage,
		horseProfilPage,
		datesPage,
		regularDatesPage,
		appointmentsPage,
		user;

	/**
	* @function init
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @description Initialize this model.
	*/ 
	function init(){
		initPageChanger();
		initPages();				
	}

	/**
	* @function initPageChanger
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description Initialize this model.
	* <p>pageDomElement</p> is the dom-element e.g. a "div" which contains the page. 
	* <p>pageChanger</p> changes the user interface to the htmlText of the different pages.	
	*/ 
	function initPageChanger(){
		pageDomElement = document.getElementById("parentPage"),
		pageChanger = Pages.PageChanger(pageDomElement);
		pageChanger.init();
	}

	/**
	* @function initPages
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description sets the variables of this modul which contain the moduls of the different pages.
	*/ 
	function initPages(){
		mainPage = new MainPage();
		userProfilPage = new UserProfilPage();
	}

	/**
	* @function showLoginPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the loginPage to the user
	*/ 
	function showLoginPage(){
		pageChanger.switchPage("LOGIN");
	}

	/**
	* @function showMainPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the mainPage to the user
	*/ 
	function showMainPage(){
		pageChanger.switchPage("MAIN");
		mainPage.init();
	}


	/**
	* @function showUserProfilPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the mainPage to the user
	*/ 
	function showUserProfilPage(){
		pageChanger.switchPage("MAIN");
		userProfilPage.init();
	}

	that.showMainPage = showMainPage;
	that.showUserProfilPage = showUserProfilPage;
	that.init = init;
	return that;
}


