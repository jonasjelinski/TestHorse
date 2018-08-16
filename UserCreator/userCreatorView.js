class UserCreatorView extends CreatorView{
	constructor(valueBoxId, inputId, feedBackBoxId){
		super(valueBoxId, inputId);
		this.feedBackBoxId = feedBackBoxId;
	}

	init(){
		this.feedBackBox = document.getElementById(this.feedBackBoxId);
		super.init();
	}

	addPWListener(secondPasswordInputId){
		this.secondPWInput = document.getElementById(secondPasswordInputId);
		this.input.addEventListener("input", this.handlePWInput.bind(this));
		this.secondPWInput.addEventListener("input", this.handlePWInput.bind(this));				
	}

	addEmailListener() {
		this.input.addEventListener("input", this.validateEmailInput.bind(this));
		this.testEmailIfThereIsAnOldInput();
	}

	testEmailIfThereIsAnOldInput(){
		if(this.inputHasAllreadyAValue()){
			this.validateEmailInput();
		}
	}

	inputHasAllreadyAValue(){
		let value = this.input.value;
		if(value){
			return true;
		}
		else false;
	}


	validateEmailInput(){
		let email = this.input.value;
		this.sendEmail(email);
	}

	sendEmail(email){
		let data = {email: email};
		this.sendEvent("onEmailInput", data);
	}	

	handlePWInput(){
		let secondPassword = this.secondPWInput.value,
			firstPassword = this.input.value;
		this.sendPasswords(firstPassword, secondPassword);
	}

	sendPasswords(firstPassword, secondPassword){
		let data = {
			firstPassword: firstPassword,
			secondPassword: secondPassword,
		};
		this.sendEvent("onPasswordInput", data);
	}

	setFeedback(text){
		this.feedBackBox.innerHTML = text;
	}

	sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.data = data;
		this.dispatchEvent(event);
	}
}
