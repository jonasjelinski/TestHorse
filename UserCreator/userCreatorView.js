class UserCreatorView extends CreatorView{
	constructor(valueBoxId, inputId, feedBackBoxId){
		super(valueBoxId, inputId);
		this.feedBackBoxId = feedBackBoxId;
	}

	init(){
		this.feedBackBox = document.getElementById(this.feedBackBoxId);
		super.init();
	}

	testPasswords(secondPasswordInputId){
		this.secondPWInput = document.getElementById(secondPasswordInputId);
		this.secondPWInput.addEventListener("input", this.handlePWInput.bind(this));				
	}

	handlePWInput(){
		let secondPassword = this.secondPWInput.value,
			firstPassword = this.input.value;
		if(secondPassword!==firstPassword){
			this.giveNegativePWFeedback();
			this.sendEvent("onValidation", false);
		}
		else{
			this.givePositivePWFeedback();
			this.sendEvent("onValidation", true);
		}		
	}

	giveNegativePWFeedback(){	
		this.feedBackBox.innerHTML = "Passwörter stimme nicht überein";
	}

	givePositivePWFeedback(){	
		this.feedBackBox.innerHTML = "Passwörter stimmen überein";
	}

	sendEvent(type, booleanValue){
		let event = new Event(type);
		event.details = {};
		event.details.isValid = booleanValue;
		this.dispatchEvent(event);
		console.log(type);
	}

	testEmail(){
		this.input.addEventListener("input", this.handleEmailInput.bind(this));
	}

	handleEmailInput(){
		let email = this.input.value;
		if(this.emailIsCorrect(email)){
			this.sendEvent("onValidation", true);
			this.givePositiveEmailFeedback();
		}
		else{
			this.sendEvent("onValidation", false);
			this.giveNegativeEmailFeedback();
		}
	}

	emailIsCorrect(email) {
		var regex = /\S+@\S+\.\S+/;
    	return regex.test(email);
	}

	givePositiveEmailFeedback(){
		this.feedBackBox.innerHTML = "Email ist okay";
	}

	giveNegativeEmailFeedback(){
		this.feedBackBox.innerHTML = "Emailaddresse muss valide sein";
	}
}
