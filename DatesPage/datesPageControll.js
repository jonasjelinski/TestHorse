var DatesPage = DatesPage || {};

DatesPage.DatesPageControll = function(domElements){
	"user strict";
	let that = new EventTarget(),
		regularDatesButton,
		singleDatesButton;

	function init(){
		regularDatesButton = domElements.regularDatesButton;
		singleDatesButton = domElements.singleDatesButton;
		cancelButton = domElements.cancelButton;
		addEventListeners();
	}

	function addEventListeners(){
		regularDatesButton.addEventListener("click", handleRegularClick);
		singleDatesButton.addEventListener("click", handleSingleClick);
		cancelButton.addEventListener("click", handleCancelClick);
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

	function handleCancelClick() {
		sendEvent("onCancelDatesPage");
	}

	that.init = init;
	return that; 	
}