var Profil = Profil || {};

Profil.ProfilControllTypes = function(changeButtonId, okayButtonId, delteButtonId, secondEventType){
	let that = new EventTarget(),
		userProfile,	
		changeEventType = "onChange",
		deleteEventType = "onDelete";

	function init(){
		userProfile = Profil.ProfileControll(changeButtonId, okayButtonId, delteButtonId, changeEventType, secondEventType, deleteEventType);
		userProfile.init();
		addEventListeners();	
	}

	function addEventListeners(){
		userProfile.addEventListener(changeEventType, handleChange);
		userProfile.addEventListener(secondEventType, handleOkay);
		userProfile.addEventListener(deleteEventType, handleDelete);
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