class UserCreatorClass extends Creator{
  constructor(entityCreator, creatorModel, view){
    super(entityCreator, creatorModel, view);
    this.passwordInputId = "userInteractionInput2";
  }

  initView(){
    super.initView();
    this.view.addEventListener("onValidation", this.handlePassword.bind(this)); 
  }

  updateView(){ 
      let attribute,
          value; 
      if(this.view){ 
        this.view.update(); 
        attribute = this.view.getCurrentAttribute(); 
        value = this.model.getValueOfAttribute(attribute); 
        if(value){ 
          this.view.setInputValue(value); 
          this.view.setValueBox(value); 
        } 
        if(attribute == "password"){ 
           this.stopPageSlider();    
          this.view.testPasswords(this.passwordInputId) 
        } 
        if(attribute == "email"){ 
           this.stopPageSlider();    
          this.view.testEmail(); 
        }               
      }   
    }
 
    handlePassword(event){ 
      let isValidInput = event.details.isValid;
      if(isValidInput){ 
        this.proceedPageSlider(); 
      } 
      else{ 
        this.stopPageSlider();         
      } 
    }
}

