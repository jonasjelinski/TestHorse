var DropdownMenu = DropdownMenu || {};


//source: https://www.w3schools.com/howto/howto_js_dropdown.asp 
DropdownMenu = function(dropDownMenuId, optionsClass, dropdownButtonClass, showClass){
	const VISIBLE = 1,
		INVISIBLE = 0;

	let that = new EventTarget(),
		dropdownMenu,
		dropdownButton,
		dropDownOptions;

	function init() {
		dropdownMenu = document.getElementById(dropDownMenuId);
		dropDownOptions = document.getElementsByClassName(optionsClass);
		dropdownButton = document.getElementsByClassName(dropdownButtonClass)[0];
		dropdownButton.addEventListener("click", handleMenuClick);
	}

	function handleMenuClick(event) {
		 showOptions();
	}
	
	function showOptions() {
		dropdownMenu.classList.toggle(showClass);
	}

	window.onclick = function(event) {
		if (userClicksOutsideTheMenu(event)) {
				closeDropdownMenu();			
		}
	}

	function userClicksOutsideTheMenu(event) {
		return event.target !== dropdownButton;
	}

	function closeDropdownMenu() {
		for (i = 0; i < dropDownOptions.length; i++) {
			let option = dropDownOptions[i];
			if (isOpen(option)) {
				hideOption(option);
			}
		}		
	}

	function isOpen(option) {
		return option.classList.contains(showClass);
	}

	function hideOption(option) {
		option.classList.remove(showClass);
	}

	function getValue() {

	}

	that.init = init;
	that.getValue = getValue;
	return that;
}