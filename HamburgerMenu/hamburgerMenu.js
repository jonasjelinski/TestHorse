var HamburgerMenu = HamburgerMenu || {};

HamburgerMenu = function(menuElements,menuId, newEntryTemplate, inVisibleClass, visibleClass){
	let hamburgerMenu = new EventTarget(),
		hamburgerMenuView,
		hamburgerMenuModel,
		menuDomElement;

	init(){
		initView();
		initModel();
		addListeners();
	}

	initView(){
		menuDomElement = d3.selectElementById(menuId);
		hamburgerMenuView = new HamburgerMenuView(menuDomElement, newEntryTemplate, inVisibleClass, visibleClass);	
	}

	addMenuElements(){
		for(let i = 0; i < menuElements.length; i++){
			let data = menuElements[i];
			hamburgerMenuView.addNewEntry(data);
		}
	}

	initModel(){		
		hamburgerMenuModel = new HamburgerMenuModel(menuElements);
	}

	addListeners(){
		hamburgerMenuView.addEventListener("onClick", handleMenuClick);
	}

	handleMenuClick(ev){
		let event = Event("onClick");
		event.details = {};
		event.details.elementId = ev.details.elementId;
	}

	hamburgerMenu.init = init;
	return hamburgerMenu;
}