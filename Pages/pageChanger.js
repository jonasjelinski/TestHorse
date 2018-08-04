var Pages = Pages || {};

/**
 * @namespace PageChanger
 * @memberOf! Pages
 * @description Modul is a stateMachine which switches between different pages
 * @param {object} domElement Is an html objet eg. an div containing the different pages
 */
Pages.PageChanger = function(domElement){
	"use strict";
	let pageChanger = {},
		pageCreator,
		pageContent;

	const PAGES = {
		LOGIN_PAGE: "LOGIN",
		MAIN_PAGE: "MAIN",
		DATES_PAGE: "DATES",
		USER_PAGE: "USER_PROFILE",
		HORSE_PAGE: "HORSE_PROFILE",
		CREATE_DATE: "CREATE_DATE",
		CREATE_USER: "CREATE_USER",
		CREATE_HORSEBOX: "CREATE_HORSEBOX",
	}

	/**
	* @function init
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @description Initialize this model.
	* <p>pageCreator</p> is a modul which attaches new html-text to the domElement through the function pageCreator.createPage(htmlString)
	* <p>pageContent</p> is a modul which contains and returns the htmlStrings which are used for pageCreator.createPage(htmlString) in this modul
	*/ 	
	function init(){
		pageCreator = new Pages.PageCreator(domElement);
		pageContent = new Pages.PageContent();
	}

	/**
	* @function switchPage
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @param {String} page Name of the page which should be switched to
	* @description creates the page "page" bay using handlePageSwitch. Selects the page by comaparing the paramater "page" with the properties of the const PAGES
	*/ 	
	function switchPage(page){
		switch(page){
			case PAGES.LOGIN_PAGE:
				handlePageSwitch();
				break;
			case PAGES.MAIN_PAGE:
				handlePageSwitch(pageContent.MAIN_PAGE);
				break;
			case PAGES.DATES_PAGE:
				handlePageSwitch();
				break;
			case PAGES.USER_PAGE:
				handlePageSwitch();
				break;
			case PAGES.HORSE_PAGE:
				handlePageSwitch();
				break;
			case PAGES.CREATE_DATE:
				handlePageSwitch();
				break;
			case PAGES.CREATE_USER:
				handlePageSwitch();
				break;
			case CREATE_HORSEBOX:
				handlePageSwitch();
				break;
			default:
				break;
		}
	}

	/**
	* @function handlePageSwitch
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @param {String} htmlString String containing the html-text of this page
	* @description creates the page "page" bay using pageCreator.createPage(htmlString)
	*/ 	
	function handlePageSwitch(htmlString){
		pageCreator.createPage(htmlString)
	}

	pageChanger.init = init;
	pageChanger.switchPage = switchPage;
	return pageChanger;
};