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
		NEW_USER: "NEW_USER",
		LOGIN_PAGE: "LOGIN",
		START_PAGE: "START",
		DATES_PAGE: "DATES",
		REGULAR_DATES_PAGE : "REGULAR_DATES_PAGE",
		REGULAR_DATES_CREATER_PAGE : "REGULAR_DATES_CREATER_PAGE",
		SINGLE_DATE_CREATER_PAGE: "SINGLE_DATE_CREATER_PAGE",
		USER_PAGE: "USER_PROFILE",
		USER_PROFILE_SAVER: "USER_PROFILE_SAVER",
		HORSE_PAGE: "HORSE_PROFILE",		
		CREATE_USER: "CREATE_USER",
		CREATE_HORSEBOX: "CREATE_HORSEBOX",
		HORSE_PROFILE_SAVER:"HORSE_PROFILE_SAVER",		
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
			case PAGES.CREATE_USER:
				handlePageSwitch(pageContent.CREATE_USER);
				break;
			case PAGES.LOGIN_PAGE:
				handlePageSwitch(pageContent.LOGIN_PAGE);
				break;
			case PAGES.START_PAGE:
				handlePageSwitch(pageContent.START_PAGE);
				break;
			case PAGES.DATES_PAGE:
				handlePageSwitch(pageContent.DATES_PAGE);
				break;
			case PAGES.REGULAR_DATES_PAGE:
				handlePageSwitch(pageContent.REGULAR_DATES_PAGE);
				break;
			case PAGES.REGULAR_DATES_CREATER_PAGE:
				handlePageSwitch(pageContent.REGULAR_DATES_CREATER_PAGE);
				break;
			case PAGES.SINGLE_DATE_CREATER_PAGE:
				handlePageSwitch(pageContent.CREATE_SINGLE_DATE);
				break;
			case PAGES.USER_PAGE:
				handlePageSwitch(pageContent.USER_PAGE);
				break;
			case PAGES.HORSE_PAGE:
				handlePageSwitch(pageContent.HORSE_PROFIL);
				break;			
			case PAGES.CREATE_HORSEBOX:
				handlePageSwitch(pageContent.CREATE_HORSEBOX);
				break;
			case PAGES.HORSE_PROFILE_SAVER:
				handlePageSwitch(pageContent.HORSE_PROFILE_SAVER);
				break;
			case PAGES.USER_PROFILE_SAVER:
				handlePageSwitch(pageContent.USER_PROFILE_SAVER);
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