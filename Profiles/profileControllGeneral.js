var Profil = Profil || {};

/** 
 * namespace GeneralProfileControll 
 * @memberof! Profil
 * @param{string} firstButtonId, id of firstButton
 * @param{string} secondButtonId, id of secondButton
 * @param{string} thirdButtonId, id of thirdButton
 * @param{string} firstEventType, event type which is send if the button has beeen clicked
 * @param{string} secondEventType, event type which is send if the button has beeen clicked
 * @param{string} thirdEventType, event type which is send if the button has beeen clicked
 * @description simple modul to controll a view with three buttons
 */

Profil.GeneralProfileControll = function(firstButtonId, secondButtonId, thirdButtonId, firstEventType, secondEventType, thirdEventType){
	let that = new EventTarget(),
		firstButton,
		secondButton,
		thirdButton;

	/**
	* @function init
	* @public
	* @memberof! HorseProfileSaver
	* @instance
	* @description Initialize this model
	*/ 
	function init(){
		getDomElements();		
		addListeners();
	}

	/**
	* @function getDomElements
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description Gets dom eLements from the html page
	*/ 
	function getDomElements(){
		firstButton = document.getElementById(firstButtonId);
		secondButton = document.getElementById(secondButtonId);
		thirdButton = document.getElementById(thirdButtonId);	
	}

	/**
	* @function addListeners
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description adds listener to the buttons
	*/
	function addListeners(){
		firstButton.addEventListener("click", handleFirstButtonClicked);
		secondButton.addEventListener("click", handleSecondButtonClicked);
		thirdButton.addEventListener("click", handleThirdButtonClicked);
	}

	/**
	* @function handleFirstButtonClicked
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description send event of type firstEventType
	*/ 
	function handleFirstButtonClicked(){
		sendEvent(firstEventType);
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description send event of type type
	*/ 
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	/**
	* @function handleSecondButtonClicked
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description send event of type secondEventType
	*/ 
	function handleSecondButtonClicked(){
		sendEvent(secondEventType);
	}

	/**
	* @function handleSecondButtonClicked
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description send event of type thirdEventType
	*/ 
	function handleThirdButtonClicked(){
		sendEvent(thirdEventType);
	}

	that.init = init;
	return that;
}