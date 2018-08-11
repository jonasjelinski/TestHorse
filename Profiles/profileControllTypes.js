var Profil = Profil || {};

Profil.ProfilControllTypes = function(changeButtonId, okayButtonId, delteButtonId, secondEventType){
	let that = new EventTarget(),
		profileControll,	
		changeEventType = "onChange",
		deleteEventType = "onDelete";

	function init(){
		profileControll = Profil.ProfileControll(changeButtonId, okayButtonId, delteButtonId, changeEventType, secondEventType, deleteEventType);
		profileControll.init();
		addEventListeners();	
	}

	function addEventListeners(){
		profileControll.addEventListener(changeEventType, handleChange);
		profileControll.addEventListener(secondEventType, handleOkay);
		profileControll.addEventListener(deleteEventType, handleDelete);
	}

	function handleChange(){		
		sendEvent(changeEventType);
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleOkay(){		
		sendEvent(secondEventType);
	}

	function handleDelete(){		
		sendEvent(deleteEventType);
	}

	that.init = init;
	return that;
}