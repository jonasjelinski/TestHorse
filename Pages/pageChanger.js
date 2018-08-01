var Pages = Pages || {};


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

	function init(){
		pageCreator = new Pages.PageCreator(domElement);
		pageContent = new Pages.PageContent();
	}

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

	function handlePageSwitch(htmlString){
		pageCreator.createPage(htmlString)
	}

	pageChanger.init = init;
	pageChanger.switchPage = switchPage;
	return pageChanger;
};