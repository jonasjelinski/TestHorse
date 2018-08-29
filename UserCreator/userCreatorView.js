/**
 * @class UserCreatorView
 * @description Class <code>UserCreatorView</code> inherits from the parenclass <code>CreatorView</code>
 * extends this class by adding listeners to the extra domElements which are not jandled in the <code>CreatorView</code>
 * @param {string} valueBoxId. id of the valueBox, int the valueBox the values are saved
 * @param {string} inputId. id of the input wehre the user puts its input int
 * @param {string} feedBackBoxId. id of the feedbackBox where the user can see feedback
 * @param {string} passwordInput2Id. id of the second inputfield where the user puts in the second passowrd
 */

class UserCreatorView extends CreatorView{
	constructor(valueBoxId, inputId, feedBackBoxId, passwordInput2Id){
		super(valueBoxId, inputId);
		this.feedBackBoxId = feedBackBoxId;
		this.passwordInput2Id = passwordInput2Id;
	}


	/**
	* @function init
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description Initialize this.creator gets the domElements and calss the superclass
	*/ 	
	init(){
		this.feedBackBox = document.getElementById(this.feedBackBoxId);
		super.init();
	}


	/**
	* @function addPWListener
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description adds lsitener to the inputfields for the password
	*/ 	
	addPWListener(){
		this.secondPWInput = document.getElementById(this.passwordInput2Id);
		this.input.addEventListener("input", this.validatePWInput.bind(this));
		this.secondPWInput.addEventListener("input", this.validatePWInput.bind(this));				
	}

	/**
	* @function addEmailListener
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description adds listener to the inputfields for the email
	*/ 	
	addEmailListener() {
		this.input.addEventListener("input", this.validateEmailInput.bind(this));
		this.testEmailIfThereIsAnOldInput();
	}

	/**
	* @function testEmailIfThereIsAnOldInput
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description starts the validation of the email if the user put seomething into it
	*/ 
	testEmailIfThereIsAnOldInput(){
		if(this.inputHasAllreadyAValue()){
			this.validateEmailInput();
		}
	}

	/**
	* @function inputHasAllreadyAValue
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description returns true if this.input.value is not undefined
	*/ 
	inputHasAllreadyAValue(){
		let value = this.input.value;
		if(value){
			return true;
		}
		else false;
	}

	/**
	* @function validateEmailInput
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description sends an event with the email which should be validate
	*/ 
	validateEmailInput(){
		let email = this.input.value;
		data = {email: email};
		this.sendEvent("onEmailInput", data);
	}

	/**
	* @function validatePWInput
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @description reads paswords from domElements and fives them sendPasswords
	*/ 
	validatePWInput(){
		let secondPassword = this.secondPWInput.value,
			firstPassword = this.input.value;
		this.sendPasswords(firstPassword, secondPassword);
	}

	/**
	* @function sendPasswords
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @param {string} firstPassword
 	* @param {string} secondPassword
	* @description sends an event with the both password which should be validated
	*/ 
	sendPasswords(firstPassword, secondPassword){
		let data = {
			firstPassword: firstPassword,
			secondPassword: secondPassword,
		};
		this.sendEvent("onPasswordInput", data);
	}

	/**
	* @function setFeedback
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @param {string} text
	* @description setter for the feedBackBox
	*/ 
	setFeedback(text){
		let visible = 1;
		this.feedBackBox.style.opacity = visible;
		this.feedBackBox.innerHTML = text;
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! UserCreatorView
	* @instance
	* @param {string} type, eventtype
	* @param {obejct} data
	* @description sends event of type type and data
	*/ 
	sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.data = data;
		this.dispatchEvent(event);
	}
}
