var MainPage = MainPage || {};

MainPage = function(){
	let mainPage = new EventTarget(),
		hamburgerMenu,
		dropList,
		dropListId = "horseList",
		listElementsData = [{id: "1", name: "hans"}, {id: "2", name: "max"},{id: "3", name: "moritz"}],
		elementTemplateString = document.getElementById("ul-element").innerHTML;

	function init(){
		//hamburgerMenu = new HamburgerMenu(menuElements,menuId, newEntryTemplate, inVisibleClass, visibleClass);
		dropList = new DropList(dropListId, listElementsData, elementTemplateString);
		dropList.init();
	}

	mainPage.init = init;
	return mainPage;
}