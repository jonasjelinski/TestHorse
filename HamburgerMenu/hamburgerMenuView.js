var HamburgerMenu = HamburgerMenu || {};

/**
 * @instance HamburgerMenu.HamburgerMenuView 
 * @memberof! HamburgerMenu
 * @param {string} clickBoxId,id of the clickbbox which opens and closes the menu
 * @param {string} unsortedListId, id of the unsorted list which contains the options of the menu
 * @param {string} inVisibleClass, class which sets the menu inVisible
 * @param {string} visibleClass, class which sets the menu visible
 * @description viewcontroll of the burgermenu. sets the visible and invisible classes and sends the clicked options.
 * source: https://codepen.io/eduardoboucas/pen/BNyKwO, 17.08.2018
 */
HamburgerMenu.HamburgerMenuView = function(checkBox, unsortedList, inVisibleClass, visibleClass){
	let that = new EventTarget(),	
		isVisible = true;

	/**
	* @function init
	* @public
	* @memberof! HamburgerMenu  
	* @instance
	* @description inits this modul.
	*/ 	
	function init(){
		checkBox.addEventListener("click", handleMenuClick);
		unsortedList.addEventListener("click", handleOnClick);
	}

	/**
	* @function handleMenuClick
	* @private
	* @memberof! HamburgerMenu  
	* @instance
	* @description sets the menu visible, invisible
	*/
	function handleMenuClick(){
		if(isVisible){
			//unsortedList.class = inVisibleClass;
			unsortedList.style.opacity = 0;
		}
		else{
			//unsortedList.class = visibleClass;
			unsortedList.style.opacity = 1;
		}
		isVisible = !isVisible;
	}

	/**
	* @function clickedElement
	* @private
	* @memberof! HamburgerMenu  
	* @instance
	* @param {event} ev, used to get the even.target, the element which has been clicked
	* @description sends the id of the clicked otpion as an event
	*/
	function handleOnClick(ev){
		let clickedElement = ev.target,
			option = clickedElement.getAttribute("id");
			event = new Event("onClick");
		event.details = {};
		event.details.option = option;
		if(that){
			that.dispatchEvent(event);	
		}		
	}

	that.init = init;
	return that;
};