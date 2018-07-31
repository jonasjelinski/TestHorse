var HamburgerMenu = HamburgerMenu || {};

HamburgerMenu.HamburgerMenuView = function(domElement, newEntryTemplate, inVisibleClass, visibleClass){
	let that,
		menu,
		isVisible = false;

	function init(){
		that = new EventTarget(),
		menu = domElement;
		addMenuListener(menu);	
	}

	function addMenuListener(){
		menu.addEventListener("onClick", handleMenuClick);
	}

	function handleMenuClick(){
		if(isVisible){
			menu.class = inVisibleClass;
		}
		else{
			menu.class = visibleClass;
		}
		isVisible != isVisible;
	}

	function addNewEntry(data){
		let menuElement = createNewEntry();
		addElementListener(addListener);	
	}

	function createNewEntry(data){
    	let templateFunction = _.template(templateString),
    	menuElement = templateFunction(data);
    	return menuElement;
	}

	function addElementListener(element){
		element.addEventListener("onClick", handleOnClick);
	}

	function handleOnClick(){
		let event = new Event("onClick");
		if(that){
			that.dispatchEvent(event);	
		}		
	}

	that.init = init;
	return that;
};