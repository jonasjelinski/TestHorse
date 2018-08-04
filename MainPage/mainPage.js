var MainPage = MainPage || {};

/**
 * @namespace MainPage
 * @memberOf! MainPage
 * @description Modul handles the communcation between the different moduls of the mainpage
 * <p><code><dropList</code> is a modul which handles a dom-element of the type unsorted list </p>
 * <p><code><hamburgerMenu</code> is a modul which handles a hamburgerMenu, which is a kind of droplist</p>
 */
MainPage = function(){
	let mainPage = new EventTarget(),
		hamburgerMenu,
		dropList,
		dropListId = "horseList",
		listElementsData = [{id: "1", name: "hans"}, {id: "2", name: "max"},{id: "3", name: "moritz"}],
		profileViewData = {userProfileName:"Hans", userProfileMail: "h@h", userProfilePassword: "123"},
		elementTemplateString,
		slideShow,
		forwardButtonId = "forward",
		backwardsButtonId = "backwards",
		progressBoxId = "textBox",
		numberOfPages = 9,
		profilePage;


	/**
	* @function init
	* @public
	* @memberof! MainPage  
	* @instance
	* @description Initialize this model. Sets the elementTemplateString, the hamburgerMenu and the dropList
	*/ 
	function init(){
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		profilViewTemplateString = document.getElementById("userProfileTemplate").innerHTML;
		viewDomElement = document.getElementById("mainpage");		

		//hamburgerMenu = new HamburgerMenu(menuElements,menuId, newEntryTemplate, inVisibleClass, visibleClass);
		//dropList = new DropList(dropListId, listElementsData, elementTemplateString, "tid");
		//dropList.init();
		//slideShow = new Slideshow(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages);
		//slideShow.init();
		//profilePage = new UserProfilPage.UserProfilPageViewControll("mainpage", profilViewTemplateString, profileViewData);
		//profilePage.init();
	}

	mainPage.init = init;
	return mainPage;
}