var DatesPage = DatesPage || {};

DatesPage.DatesPageControll = function(domElements){
	"user strict";
	let that = new EventTarget(),
		regularDatesButton,
		singleDatesButton;

	function init(){
		regularDatesButton = domElements.regularDatesButton;
		singleDatesButton = domElements.singleDatesButton;
		addEventListeners();
	}

	function addEventListeners(){
		regularDatesButton.addEventListener("click", handleRegularClick);
		singleDatesButton.addEventListener("click", handleSingleClick);
	}

	function handleRegularClick(){
		sendEvent("onRegularClicked");
	}

	function sendEvent(type){
			let event = new Event(type);
			that.dispatchEvent(event);
	}

	function handleSingleClick(){
		sendEvent("onSingleClicked");
	}

	that.init = init;
	return that; 	
}