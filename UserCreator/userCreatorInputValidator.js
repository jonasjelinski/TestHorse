var UserCreator = UserCreator || {};

/** 
 * namespace InputValidator 
 * @memberof! UserCreator
 * @description Validates the input of user if he wantsto create a new userProfil
 */

UserCreator.InputValidator = function(){
	const MIN_PW_LENGTH = 5;

	let that = new EventTarget();

	/**
	* @function init
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @param {string} pw1, first password
	* @param {string} pw2, second password
	* @description sends an event if the password is valide else a event which tells the input is wrong
	*/ 	
	function validatePW(pw1, pw2){
		if(!pw2 || !pw1){
			sendEvent("onOnePWFieldIsEmpty");
			return;
		}
		if(pw1 !== pw2){
			sendEvent("onPaswordsNotEqual");
			return;
		}
		if(pw1.length < MIN_PW_LENGTH){
			sendEvent("onPaswordsTooShort");
			return;
		}
		else{
			sendEvent("onPaswordValid");
		}
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @param {string} type, event type
	* @description sends an event of type "type"
	*/ 
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	/**
	* @function validateEmail
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @param {string} email, email
	* @param {string} pw2, second password
	* @description sends an event if the email is valide else a event which tells the input is wrong
	*/ 	
	function validateEmail(email){
		if(isEmailCorrect(email)){
			sendEvent("onEmailValid");
		}
		else{
			sendEvent("onEmailInvalid");
		}
	}

	/**
	* @function isEmailCorrect
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @param {string} email, email
	* @description returns true if the email is valide else false
	*/
	function isEmailCorrect(email) {
		var regex = /\S+@\S+\.\S+/;
    	return regex.test(email);
	}

	that.validatePW = validatePW;
	that.validateEmail = validateEmail;
	return that;
}