var StartPage = StartPage || {};

/**
 * @namespace MainPage
 * @memberOf! MainPage
 * @description Modul handles the communcation between the different moduls of the mainpage
 * <p><code><dropList</code> is a modul which handles a dom-element of the type unsorted list </p>
 * <p><code><hamburgerMenu</code> is a modul which handles a hamburgerMenu, which is a kind of droplist</p>
 */
StartPage = function(){
	let that = new EventTarget(),
		hamburgerMenu,
		dropList,
		dropListId = "horseList",
		listElementsData = [{id: "1", photo: "/src/xy"}, {id: "2", photo: "/src/xy"},{id: "3", photo: "/src/xy"}],
		elementTemplateString;
		
	/**
	* @function init
	* @public
	* @memberof! MainPage  
	* @instance
	* @description Initialize this model. Sets the elementTemplateString, the hamburgerMenu and the dropList
	*/ 
	function init(){
		elementTemplateString = document.getElementById("horseBoxElement").innerHTML;
		viewDomElement = document.getElementById("mainpage");
		//hamburgerMenu = new HamburgerMenu(menuElements,menuId, newEntryTemplate, inVisibleClass, visibleClass);
		dropList = new DropList(dropListId, listElementsData, elementTemplateString, "horseId");
		dropList.init();

	}

	that.init = init;
	return that;
}