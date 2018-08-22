var HamburgerMenu = HamburgerMenu || {};

/**
 * @instance HamburgerMenu 
 * @memberof! HamburgerMenu
 * @param {string} clickBoxId,id of the clickbbox which oprens and close the menu
 * @param {string} unsortedListId, id of the unsorted list which contains the options of the menu
 * @param {string} inVisibleClass, class which sets the menu inVisible
 * @param {string} visibleClass, class which sets the menu visible
 * @description simple burgermenu. is a simple viewcontroll
 * source: https://codepen.io/eduardoboucas/pen/BNyKwO, 17.08.2018
 */
HamburgerMenu = function(clickBoxId, unsortedListId, inVisibleClass, visibleClass){
	let that = new EventTarget(),
		unsortedList,
		clickBox,
		hamburgerMenuView,
		hamburgerMenuModel,
		menuDomElement;


	/**
	* @function init
	* @public
	* @memberof! HamburgerMenu  
	* @instance
	* @description inits this modul.
	*/ 	
	function init(){
		initView();
		addListeners();
	}

	/**
	* @function initView
	* @private
	* @memberof! HamburgerMenu  
	* @instance
	* @description gets the domElements by id and gives them to the view. inits the view.
	*/ 	
	function initView(){
		clickBox = document.getElementById(clickBoxId);
		unsortedList = document.getElementById(unsortedListId);
		hamburgerMenuView = new HamburgerMenu.HamburgerMenuView(clickBox, unsortedList, inVisibleClass, visibleClass);
		hamburgerMenuView.init();	
	}

	/**
	* @function addListeners
	* @private
	* @memberof! HamburgerMenu  
	* @instance
	* @description adds a clickListener to the view
	*/ 
	function addListeners(){
		hamburgerMenuView.addEventListener("onClick", handleMenuClick);
	}

	/**
	* @function handleMenuClick
	* @private
	* @memberof! HamburgerMenu  
	* @instance
	* @description sends the option which has been selected in the menu as an event
	*/ 
	function handleMenuClick(ev){
		let event = new Event("onOption");
		event.details = {};
		event.details.option = ev.details.option;
		that.dispatchEvent(event);;
	}

	that.init = init;
	return that;
}