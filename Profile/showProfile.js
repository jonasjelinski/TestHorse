var Profile = Profile || {};

Profile = function(firstButtonId, secondButtonId, thirdButtonId, firstEventType, secondEventType, thirdEventType){
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
		delteButton = document.getElementById(thirdButtonId);		
	}

	function addListeners(){
		firstButton.addEventListner("click", handleFirstButtonClicked);
		secondButton.addEventListner("click", handleSecondButtonClicked);
		thirdButton.addEventListner("click", handleThirdButtonClicked);
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

	return that;
}