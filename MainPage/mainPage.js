MainPage = new MainPage || {};

MainPage = function(){
	let mainPage,
		hamburgerMenu;

	init(){
		mainPage = new EventTarget(),
		hamburgerMenu = new HamburgerMenu(menuElements,menuId, newEntryTemplate, inVisibleClass, visibleClass);
		dropList = new DropList(domElementId, listElementsData, elementTemplateString);
	}
}