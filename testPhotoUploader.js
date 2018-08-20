var TestPhotoUploader = TestPhotoUploader || {};


//Quelle: https://www.youtube.com/watch?v=ut-NcYgFRKI
TestPhotoUploader =function(inputId, buttonId){
	let that = {},
		button,
		inputForm,
		formData;

	function init(){
		button = document.getElementById(buttonId);
		inputForm = document.getElementById(inputId);
		inputForm.addEventListener("input", handleInput);
		button.addEventListener("click", sendPhoto);
	}

	function handleInput(){
		let photo = inputForm.files[0];
			formData = new FormData();
		formData.append("file", photo);
		console.log("photo", formData);
	}

	function sendPhoto(){
		if(formData!==undefined){
			makeAjaxRequest(formData);
		}
	}

	function makeAjaxRequest(data){
		//This is for inserting Horse
		$.ajax({
	    type: 'POST',
	    url: 'https://h2795767.stratoserver.net/database/actions/set.php',
	    data: data,
	    success: function(msg){
	        alert("insert horse"+msg);
	    }
		});
	}

	that.init = init;
	return that;
}