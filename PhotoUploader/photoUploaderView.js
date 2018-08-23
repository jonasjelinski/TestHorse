var PhotoUploader = PhotoUploader || {};


PhotoUploader.View = function(uploadButtonId, photoContainerId, feedBackBoxId){
	"user strict";

	let that = new EventTarget(),
		photoContainer,
		feedBackBox,
		uploadButton;

	function init(){
		console.log("uploadButtonId", uploadButtonId, photoContainerId, feedBackBoxId);
		feedBackBox = document.getElementById(feedBackBoxId);
		photoContainer = document.getElementById(photoContainerId);
		uploadButton = document.getElementById(uploadButtonId);
		uploadButton.addEventListener("click", uploadNewPhoto)
	}

	function uploadNewPhoto(){
		let photo = photoContainer.files[0];
		sendEvent("onNewPhoto", photo);
	}

	function sendEvent(type, photo){
		let event = new Event(type);
		event.details = {};
		event.details.photo = photo;
		that.dispatchEvent(event);
	}

	function showFeedBack(text){
		feedBackBox.value = text;
	}

	that.init = init;
	that.showFeedBack = showFeedBack;
	return that;	
}