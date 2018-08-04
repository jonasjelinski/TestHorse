var ProfileControll = ProfileControll || {};

ProfileControll.ProfileDisplayControll = function(changeButtonId, saveButtonId, delteButtonId){
	let that = new EventTarget(),
		userProfile,
		changeEventType = "onChange",
		saveEventType = "onSave",
		deleteEventType = "onDelete";

	function init(){
		userProfile = ProfileControll(changeButtonId, saveButtonId, delteButtonId, changeEventType, saveEventType, deleteEventType);
		userProfile.init();
		addEventListeners();	
	}

	function addEventListeners(){
		userProfile.addEventListener(changeEventType, handleChange);
		userProfile.addEventListener(saveEventType, handleOkay);
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
		sendEvent(saveEventType);
	}

	function handleDelete(){		
		sendEvent(deleteEventType);
	}

	that.init = init;
	return that;
}