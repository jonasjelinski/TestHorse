var HorsePhotoUploader = HorsePhotoUploader || {};


HorsePhotoUploader = function(){
	"user strict";

	const VALID_FILE_TYPES = ["gif","png","jpg","jpeg", "image/jpeg"],
		MAX_FILE_SIZE = 2000000,
		WRONG_TYPE_FEEDBACK = "Nur Fotos vom Typ gif, png, jpg, jpeg erlaubt",
		TOO_BIG_FEEDBACK = "Foto ist zu groß";
		

	let that = new EventTarget(),
		dbRequester = new DatabaseClientInterface();

	function init(){
		dbRequester.init();
		dbRequester.addEventListener("onResult", handleResult);		
	}

	function setHorseID(newHorseID){
		horseID = newHorseID;
	}

	function handleResult(event){
		let result = event.details.result;
		console.log("result",result);
	}

	function uploadNewPhoto(photo){
		if(photo !==undefined && isValidFileType(photo)){
			if(isNotTooBig(photo)){
				peparePhotoAndSendIt(photo);
			}
			else{
				giveFeedBack(TOO_BIG_FEEDBACK);
			}
		}
		else{
			giveFeedBack(WRONG_TYPE_FEEDBACK);
		}
	}

	function isValidFileType(photo){
		let name = photo.name,
			type = name.split('.').pop().toLowerCase();
		return VALID_FILE_TYPES.includes(type);
	}

	function isNotTooBig(photo){
		  var fileSize = photo.size || photo.fileSize;
		  return fileSize < MAX_FILE_SIZE;
	}

	function peparePhotoAndSendIt(photo){
		let form_data = convertPhotoToFormDataAndAppendHorseID(photo);
		sendData(form_data);
	}

	function convertPhotoToFormDataAndAppendHorseID(photo){
		let formData = new FormData();
		formData.append("file", photo);
   		formData.append("horseID", horseID);
   		return formData;
	}

	function sendData(formData){		
		dbRequester.uploadHorsePicture(formData);
	}

	function giveFeedBack(text){
		let event = new Event("onFeedback");
		event.details = {};
		event.details.feedback = text;
		that.dispatchEvent(event);
	}

	that.init = init;
	that.uploadNewPhoto = uploadNewPhoto;
	that.setHorseID = setHorseID;
	return that;	
}