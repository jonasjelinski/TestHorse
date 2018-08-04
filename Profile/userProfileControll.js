var ProfileControll = ProfileControll || {};

ProfileControll.UserProfileControll = function(){
	let that = new EventTarget(),
		userProfile,
		changeButtonId = "userProfileChange";
		okayButtonId = "userProfileOk";
		delteButtonId = "userProfileDelete",
		changeEventType = "onChange",
		okayEventType = "onOkay",
		deleteEventType = "onDelete";

	function init(){
		userProfile = ProfileControll(changeButtonId, okayButtonId, delteButtonId, changeEventType, okayEventType, deleteEventType);
		userProfile.init();
		addEventListeners();	
	}

	function addEventListeners(){
		userProfile.addEventListener(changeEventType, handleChange);
		userProfile.addEventListener(okayEventType, handleOkay);
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
		sendEvent(okayEventType);
	}

	function handleDelete(){		
		sendEvent(deleteEventType);
	}

	that.init = init;
	return that;
}