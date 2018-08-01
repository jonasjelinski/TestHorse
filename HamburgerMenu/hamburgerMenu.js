var HamburgerMenu = HamburgerMenu || {};

HamburgerMenu = function(menuElements,menuId, newEntryTemplate, inVisibleClass, visibleClass){
	let hamburgerMenu = new EventTarget(),
		hamburgerMenuView,
		hamburgerMenuModel,
		menuDomElement;

	function init(){
		initView();
		initModel();
		addListeners();
	}

	function initView(){
		menuDomElement = d3.selectElementById(menuId);
		hamburgerMenuView = new HamburgerMenuView(menuDomElement, newEntryTemplate, inVisibleClass, visibleClass);	
	}

	function addMenuElements(){
		for(let i = 0; i < menuElements.length; i++){
			let data = menuElements[i];
			hamburgerMenuView.addNewEntry(data);
		}
	}

	function initModel(){		
		hamburgerMenuModel = new HamburgerMenuModel(menuElements);
	}

	function addListeners(){
		hamburgerMenuView.addEventListener("onClick", handleMenuClick);
	}

	function handleMenuClick(ev){
		let event = Event("onClick");
		event.details = {};
		event.details.elementId = ev.details.elementId;
	}

	hamburgerMenu.init = init;
	return hamburgerMenu;
}