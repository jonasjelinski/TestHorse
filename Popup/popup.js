var Popup = Popup || {};

/**
 * @class Popup
 * @description <code>Popup</code> is a simple controll view model represting a simple popu menu
 * @param {string} text, text which is shown in the popup
 */

Popup = function (text, hasTwoButtons = true, popupElementId = "popup", popupTextId ="popupText", 
	yesButtonId = "popupTextYes", noButtonId = "popupTextNo") {
	let that = new EventTarget(),
		popupElement,
		popupText,
		yesButton,
		noButton;

	/**
	* @function init
	* @public
	* @memberof! Popup 
	* @instance
	* @description Initialize this modul.
	*/	
	function init(){
		getDomElements();
		addEventListeners();
		if(hasText()){
			setPopupText();
		}
		
	}

	function hasText(){
		return text.length > 0 ;
	}

	/**
	* @function getDomElements
	* @public
	* @memberof! Popup 
	* @instance
	* @description gets the domElement through the id
	*/
	function getDomElements(){
		popupElement = document.getElementById(popupElementId);
		popupText = document.getElementById(popupTextId);
		yesButton = document.getElementById(yesButtonId);
		if(hasTwoButtons){
			noButton = document.getElementById(noButtonId);
		}		
		setPopupInVisible();		
	}

	/**
	* @function addEventListeners
	* @public
	* @memberof! Popup 
	* @instance
	* @description adds listener to yes and no button
	*/
	function addEventListeners(){
		yesButton.addEventListener("click", handleYesClick);
		if(hasTwoButtons){
			noButton.addEventListener("click", handleNoClick);
		}		
	}

	/**
	* @function handleYesClick
	* @public
	* @memberof! Popup 
	* @instance
	* @description sends the event "onYes" and hides the popup
	*/
	function handleYesClick(){
		sendEvent("onYes");
		setPopupInVisible();
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! Popup 
	* @instance
	* @description sends the event  type "type"
	*/
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	/**
	* @function handleNoClick
	* @public
	* @memberof! Popup 
	* @instance
	* @description sends the event  type "onNo" and hides the popup
	*/
	function handleNoClick(){
		sendEvent("onNo");
		setPopupInVisible();
	}

	/**
	* @function setPopupText
	* @public
	* @memberof! Popup 
	* @instance
	* @description sets the text of the popup
	*/
	function setPopupText(){
		popupText.innerHTML = text;
	}

	/**
	* @function setPopupVisible
	* @public
	* @memberof! Popup 
	* @instance
	* @description changes the opacity of the popupElement to 1
	*/
	function setPopupVisible(){
		let visible = 1;
		popupElement.style.opacity = visible;
	}

	/**
	* @function setPopupInVisible
	* @public
	* @memberof! Popup 
	* @instance
	* @description changes the opacity of the popupElement to 0
	*/
	function setPopupInVisible(){
		let inVisible = 0;
		popupElement.style.opacity = inVisible;
	}

	that.init = init;
	that.setPopupVisible = setPopupVisible;
	that.setPopupInVisible = setPopupInVisible;
	return that;
}