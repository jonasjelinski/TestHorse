var Popup = Popup || {};

Popup = function (text) {
	let that = new EventTarget(),
		popupElement,
		popupText,
		yesButton,
		noButton;
	
	function init(){
		getDomElements();
		addEventListeners();
		setPopupText();
	}

	function getDomElements(){
		popupElement = document.getElementById("popup");
		popupText = document.getElementById("popupText");
		yesButton = document.getElementById("popupTextYes");
		noButton = document.getElementById("popupTextNo");
		setPopupInVisible();		
	}

	function addEventListeners(){
		yesButton.addEventListener("click", handleYesClick);
		noButton.addEventListener("click", handleNoClick);
	}

	function handleYesClick(){
		sendEvent("onYes");
		setPopupInVisible();
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleNoClick(){
		sendEvent("onNo");
		setPopupInVisible();
	}

	function setPopupText(){
		popupText.innerHTML = text;
	}

	function setPopupVisible(){
		let visible = 1;
		popupElement.style.opacity = visible;
	}

	function setPopupInVisible(){
		let inVisible = 0;
		popupElement.style.opacity = inVisible;
	}

	that.init = init;
	that.setPopupVisible = setPopupVisible;
	that.setPopupInVisible = setPopupInVisible;
	return that;
}