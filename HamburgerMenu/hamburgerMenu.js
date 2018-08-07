var HamburgerMenu = HamburgerMenu || {};

HamburgerMenu = function(clickBoxId, unsortedListId, inVisibleClass, visibleClass){
	let that = new EventTarget(),
		unsortedList,
		clickBox,
		hamburgerMenuView,
		hamburgerMenuModel,
		menuDomElement;

	function init(){
		initView();
		addListeners();
	}

	function initView(){
		clickBox = document.getElementById(clickBoxId);
		unsortedList = document.getElementById(unsortedListId);
		hamburgerMenuView = new HamburgerMenu.HamburgerMenuView(clickBox, unsortedList, inVisibleClass, visibleClass);
		hamburgerMenuView.init();	
	}

	function addListeners(){
		hamburgerMenuView.addEventListener("onClick", handleMenuClick);
	}

	function handleMenuClick(ev){
		let event = new Event("onOption");
		event.details = {};
		event.details.option = ev.details.option;
		that.dispatchEvent(event);;
	}

	that.init = init;
	return that;
}