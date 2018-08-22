/**
 * @class Creator
 * @description Class <code>UserCreatorClass</code> inherits from the parenclass <code>Creator</code>
 * extends this class by adding a validator ,which tests the input of the user and give the user feedback if
 * the input is correct or wrong
 * @param {object} entityCreator. An instance of EntityCreator which creates and entity whith a slideshow
 * @param {object} creatorModel. An instance of CreatorModel which contains the attributes of the entity
 * @param {object} view. An instance of CreatorView, which handles the inputs of the user.
 */

class UserCreatorClass extends Creator{
  constructor(entityCreator, creatorModel, view){
    super(entityCreator, creatorModel, view);
    this.validator = new UserCreator.InputValidator();
  }


  /**
  * @function init
  * @public
  * @memberof! Creator
  * @instance
  * @description Initialize this class.
  */  
  init(){
    super.init();
    this.addValidatorListeners();
    this.addViewListenersForValidation();
  }


  /**
  * @function addValidatorListeners
  * @private
  * @memberof! Creator
  * @instance
  * @description adds lsitener to the validator
  */  
  addValidatorListeners(){
    this.validator.addEventListener("onOnePWFieldIsEmpty", this.handleEmptyPWField.bind(this));
    this.validator.addEventListener("onPaswordsNotEqual", this.handlePWNotEqual.bind(this));
    this.validator.addEventListener("onPaswordsTooShort", this.handlePasswordTooShort.bind(this));
    this.validator.addEventListener("onPaswordValid", this.handlePWValid.bind(this));
    this.validator.addEventListener("onEmailValid", this.handleEmailValid.bind(this));
    this.validator.addEventListener("onEmailInvalid", this.handleEmailInValid.bind(this));
  }

  /**
  * @function handleEmptyPWField
  * @public
  * @memberof! Creator
  * @instance
  * @description tells the view to show that he passoerd is empty
  */
  handleEmptyPWField(){
    this.view.setFeedback("Beide Passwortfelder müssen ausgefüllt sein");
  }

  /**
  * @function handleEmptyPWField
  * @public
  * @memberof! Creator
  * @instance
  * @description tells the view to show that both pwassord are different
  */
  handlePWNotEqual(){
    this.view.setFeedback("Beide Passwortfelder müssen übereinstimmen");
  }

  /**
  * @function handlePasswordTooShort
  * @public
  * @memberof! Creator
  * @instance
  * @description tells the view to show that pwassord is too short
  */
  handlePasswordTooShort(){
    this.view.setFeedback("Das Passwort ist zu kurz");
  }

  /**
  * @function handlePWValid
  * @public
  * @memberof! Creator
  * @instance
  * @description tells the view to show that pawssword is valid
  */
  handlePWValid(){
    this.view.setFeedback("Das Passwort ist valide");
    this.enableSliderSoUserCanGetToTheNextPage();
  }

  /**
  * @function handlePWValid
  * @public
  * @memberof! Creator
  * @instance
  * @description tells the view to show that email is not valid
  */
  handleEmailInValid(){
    this.view.setFeedback("Bitte geben Sie eine korrekte Email ein");
  }

  /**
  * @function handlePWValid
  * @public
  * @memberof! Creator
  * @instance
  * @description tells the view to show that email is valid
  */
  handleEmailValid(){
    this.view.setFeedback("Emailadresse ist valide");
    this.enableSliderSoUserCanGetToTheNextPage();
  }

  /**
  * @function addValidatorListeners
  * @public
  * @memberof! Creator
  * @instance
  * @description adds listener to the view
  */  
  addViewListenersForValidation(){
    this.view.addEventListener("onEmailInput", this.validateEmail.bind(this));
    this.view.addEventListener("onPasswordInput", this.validatePW.bind(this));
  }

  /**
  * @function validateEmail
  * @public
  * @memberof! Creator
  * @instance
  * @param {event}, event, contains email
  * @description validates email with this.validator
  */  
  validateEmail(event){
    let email = event.details.data.email; 
    this.validator.validateEmail(email);   
  }

  /**
  * @function validatePW
  * @public
  * @memberof! Creator
  * @instance
  * @param {event}, event, contains password
  * @description validates passwords with this.validator
  */
  validatePW(event){
    let passwords = event.details.data,
      pw1 = passwords.firstPassword,
      pw2 = passwords.secondPassword;
    this.validator.validatePW(pw1, pw2);
  }


  /**
  * @function handlePageChangeAndOldValues
  * @public
  * @memberof! Creator
  * @instance
  * @param {event}, event, contains password
  * @description extens the function of the superclass
  * so the view and model are updated
  */ 
  handlePageChangeAndOldValues(event){
    super.handlePageChangeAndOldValues(event);    
    this.updateUserCreatorAccordingToAttribute(event);
  }

  /**
  * @function handlePageChangeAndOldValues
  * @public
  * @memberof! Creator
  * @instance
  * @param {event}, event, contains password
  * @description reads the values of the event and starts the updateprocess
  * of the view and the sliderControlls
  */ 
  updateUserCreatorAccordingToAttribute(event){
    let attributeAndValue = this.getAttributeAndValueFromEvent(event),
      attribute = attributeAndValue[0];
      this.updateSliderControllsAccordingToInput(attribute);
      this.updateViewAccordingToAttribute(attribute);     
  }

  /**
  * @function updateViewAccordingToAttribute
  * @public
  * @memberof! Creator
  * @instance
  * @param {attribute}, attribute, attribute which is shown to the user
  * @description for each attribute a different listener has to be set to the view
  */ 
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

  /**
  * @function updateSliderControllsAccordingToInput
  * @public
  * @memberof! Creator
  * @instance
  * @param {attribute}, attribute, attribute which is shown to the user
  * @description stops the slidershow of the entityCreator so it cant move forward ore backwards
  */ 
  updateSliderControllsAccordingToInput(attribute){
    switch(attribute){
      case "email": this.blockSliderSoUserCanNotGetToTheNextPage();
                  break;
      case "password": this.blockSliderSoUserCanNotGetToTheNextPage();
                  break;
      default: break;
    }
  }

  /**
  * @function blockSliderSoUserCanNotGetToTheNextPage
  * @public
  * @memberof! Creator
  * @instance
  * @param {attribute}, attribute, attribute which is shown to the user
  * @description stops the slidershow of the entityCreator so it cant move forward
  */
  blockSliderSoUserCanNotGetToTheNextPage(){
    this.stopPageSlider();   
  }

  /**
  * @function enableSliderSoUserCanGetToTheNextPage
  * @public
  * @memberof! Creator
  * @instance
  * @param {attribute}, attribute, attribute which is shown to the user
  * @description allows the slidershow of the entityCreator that it can move forward
  */
  enableSliderSoUserCanGetToTheNextPage(){
    this.proceedPageSlider(); 
  }

  /**
  * @function reloadViewAfterPageChangeAndSetEmailListener
  * @public
  * @memberof! Creator
  * @instance
  * @description reloads the view and adds the listener so the user can put in an email
  */
  reloadViewAfterPageChangeAndSetEmailListener(){
    this.reloadViewAfterPageChange();
    this.view.addEmailListener();
  }

  /**
  * @function reloadViewAfterPageChangeAndSecondInputField
  * @public
  * @memberof! Creator
  * @instance
  * @description reloads the view and adds the listener so the user can put in a second
  * password in a second input field
  */
  reloadViewAfterPageChangeAndSecondInputField(){
    this.reloadViewAfterPageChange();
    this.view.addPWListener();
  }
 
  
}

