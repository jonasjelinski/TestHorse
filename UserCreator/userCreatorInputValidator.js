var UserCreator = UserCreator || {};

UserCreator.InputValidator = function(){
	const MIN_PW_LENGTH = 5;

	let that = new EventTarget();

	function validatePW(pw1, pw2){
		if(!pw2 || !pw1){
			sendEvent("onOnePWFieldIsEmpty");
		}
		if(pw1 !== pw2){
			sendEvent("onPaswordsNotEqual");
		}
		if(pw1.length < MIN_PW_LENGTH){
			sendEvent("onPaswordsTooShort");
		}
		else{
			sendEvent("onPaswordValid");
		}
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function validateEmail(email){
		if(isEmailCorrect(email)){
			sendEvent("onEmailValid");
		}
		else{
			sendEvent("onEmailInvalid");
		}
	}

	function isEmailCorrect(email) {
		var regex = /\S+@\S+\.\S+/;
    	return regex.test(email);
	}
}