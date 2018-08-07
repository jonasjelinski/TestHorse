var HamburgerMenu = HamburgerMenu || {};

HamburgerMenu.HamburgerMenuView = function(checkBox, unsortedList, inVisibleClass, visibleClass){
	let that = new EventTarget(),	
		isVisible = true;

	function init(){
		checkBox.addEventListener("click", handleMenuClick);
		unsortedList.addEventListener("click", handleOnClick);
	}

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
	
	function handleOnClick(ev){
		let clickedElement = ev.target,
			option = clickedElement.innerHTML;
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