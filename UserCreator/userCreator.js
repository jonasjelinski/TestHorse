class UserCreatorClass extends Creator{
  constructor(entityCreator, creatorModel, view){
    super(entityCreator, creatorModel, view);
    this.passwordInput2Id = "userInteractionInput2";
    this.validator = new UserCreator.InputValidator();
  }

  init(){
    super.init();
    this.addValidatorListeners();
    this.addViewListenersForValidation();
  }

  addValidatorListeners(){
    this.validator.addEventListener("onOnePWFieldIsEmpty", this.handleEmptyPWField.bind(this));
    this.validator.addEventListener("onPaswordsNotEqual", this.handlePWNotEqual.bind(this));
    this.validator.addEventListener("onPaswordsTooShort", this.handlePasswordTooShort.bind(this));
    this.validator.addEventListener("onPaswordValid", this.handlePWValid.bind(this));
    this.validator.addEventListener("onEmailValid", this.handleEmailValid.bind(this));
    this.validator.addEventListener("onEmailInvalid", this.handleEmailInValid.bind(this));
  }

  handleEmptyPWField(){
    this.view.setFeedback("Beide Passwortfelder müssen ausgefüllt sein");
  }

  handlePWNotEqual(){
    this.view.setFeedback("Beide Passwortfelder müssen übereinstimmen");
  }

  handlePasswordTooShort(){
    this.view.setFeedback("Das Passwort ist zu kurz");
  }

  handlePWValid(){
    this.view.setFeedback("Das Passwort ist valide");
    this.enableSliderSoUserCanGetToTheNextPage();
  }

  handleEmailInValid(){
    this.view.setFeedback("Bitte geben Sie eine korrekte Email ein");
  }

  handleEmailValid(){
    this.view.setFeedback("Emailadresse ist valide");
    this.enableSliderSoUserCanGetToTheNextPage();
  }

  addViewListenersForValidation(){
    this.view.addEventListener("onEmailInput", this.validateEmail.bind(this));
    this.view.addEventListener("onPasswordInput", this.validatePW.bind(this));
  }

  validateEmail(event){
    let email = event.details.data.email; 
    this.validator.validateEmail(email);   
  }

  validatePW(event){
    let passwords = event.details.data,
      pw1 = passwords.firstPassword,
      pw2 = passwords.secondPassword;
    this.validator.validatePW(pw1, pw2);
  }

 
  handlePageChangeAndOldValues(event){
    super.handlePageChangeAndOldValues(event);    
    this.updateUserCreatorAccordingToAttribute(event);
  }

  updateUserCreatorAccordingToAttribute(event){
    let attributeAndValue = this.getAttributeAndValueFromEvent(event),
      attribute = attributeAndValue[0];
      this.updateSliderControllsAccordingToInput(attribute);
      this.updateViewAccordingToAttribute(attribute);     
  }

  updateViewAccordingToAttribute(attribute){
    switch(attribute){
      case "name": this.reloadViewAfterPageChange();
                  break;
      case "email": this.reloadViewAfterPageChangeAndSetEmailListener();
                  break;
      case "password": this.reloadViewAfterPageChangeAndSecondInputField();
                  break;
      default: break;
    }
  }

  updateSliderControllsAccordingToInput(attribute){
    switch(attribute){
      case "email": this.blockSliderSoUserCanNotGetToTheNextPage();
                  break;
      case "password": this.blockSliderSoUserCanNotGetToTheNextPage();
                  break;
      default: break;
    }
  }

  blockSliderSoUserCanNotGetToTheNextPage(){
    this.stopPageSlider();   
  }

  enableSliderSoUserCanGetToTheNextPage(){
    this.proceedPageSlider(); 
  }

  reloadViewAfterPageChangeAndSetEmailListener(){
    this.reloadViewAfterPageChange();
    this.view.addEmailListener();
  }

  reloadViewAfterPageChangeAndSecondInputField(){
    this.reloadViewAfterPageChange();
    this.view.addPWListener(this.passwordInput2Id);
  }
 
  
}

