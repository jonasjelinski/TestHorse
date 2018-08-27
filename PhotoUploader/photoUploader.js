var PhotoUploader = PhotoUploader || {};


PhotoUploader = function(horseID, uploadButtonId, photoContainerId, feedBackBoxId){
	"user strict";

	let that = new EventTarget(),
		dbRequester,
		view;

	function init(){
		dbRequester = new PhotoUploader.DBRequester(horseID);
		view = new PhotoUploader.View(uploadButtonId, photoContainerId, feedBackBoxId);
		dbRequester.init();
		view.init();		
		dbRequester.addEventListener("onFeedback", giveFeedBack);
		view.addEventListener("onNewPhoto", handlePhotoUpload);
	}

	function handlePhotoUpload(event){
		let photo = event.details.photo;
		uploadNewPhoto(photo);
	}

	function uploadNewPhoto(photo){
		dbRequester.uploadNewPhoto(photo);
	}

	function giveFeedBack(event){
		let feedback = event.details.feedback;
		view.showFeedBack(feedback);
	}

	that. init = init;
	return that;	
}