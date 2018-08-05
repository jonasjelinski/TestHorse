var DatesPage = DatesPage || {};

DatesPage.DatesPageControll = function(domElements){
	"user strict";
	let that = new EventTarget(),
		regularDatesButton,
		singleDatesButton;

	function init(){
		regularDatesButton = domElements.regularDatesButton;
		singleDatesButton = domElements.singleDatesButton;
	}

	function addEventListeners(){
		regularDatesButton.addEventListeners("onClick", handleRegularClick);
		singleDatesButton.addEventListeners("onClick", handleSingleClick);
	}

	function handleRegularClick(){
		sendEvent("onRegularClicked");
	}

	function sendEvent(type){
			let event = new Event(type);
			that.sendEvent(event);
	}

	function handleSingleClick(){
		sendEvent("onSingleClicked");
	}

	that.init = init;
	return that; 	
}