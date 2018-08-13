var Profil = Profil || {};

Profil.GeneralProfileControll = function(firstButtonId, secondButtonId, thirdButtonId, firstEventType, secondEventType, thirdEventType){
	let that = new EventTarget(),
		firstButton,
		secondButton,
		thirdButton;

	function init(){
		getDomElements();		
		addListeners();
	}

	function getDomElements(){
		firstButton = document.getElementById(firstButtonId);
		secondButton = document.getElementById(secondButtonId);
		thirdButton = document.getElementById(thirdButtonId);	
	}

	function addListeners(){
		firstButton.addEventListener("click", handleFirstButtonClicked);
		secondButton.addEventListener("click", handleSecondButtonClicked);
		thirdButton.addEventListener("click", handleThirdButtonClicked);
	}

	function handleFirstButtonClicked(){
		sendEvent(firstEventType);
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleSecondButtonClicked(){
		sendEvent(secondEventType);
	}

	function handleThirdButtonClicked(){
		sendEvent(thirdEventType);
	}

	that.init = init;
	return that;
}