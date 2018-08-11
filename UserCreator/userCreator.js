var UserCreator = UserCreator || {};

UserCreator = function(){

	const INNER_PAGE_ID = "userInteractionInnerPage",
		FORWARD_BUTTON_ID = "userInteractionForward",
		BACKWARDS_BUTTON_ID = "userInteractionBack",
		TEXT_BOX_ID = "userInteractionProgress",
		NUM_OF_PAGES = 3,
		VALUE_BOX_ID = "userInteractionValueBox",
		FEEDBACK_BOX_ID = "userInteractionFeedback",
		INPUT_BOX = "userInteractionInput", 
		INPUT_BOX_2 = "userInteractionInput2"; 

	let that = new EventTarget(),
		pages,
		entityCreator,
		view,
		model,
		newAttributes;

		function init(attributes){
			newAttributes = attributes;
			initPages();
			initModel();			
		}

		function initPages(){
			pages = new  UserCreator.SliderPages();
		}


		function initModel(){
			model = new UserCreator.UserCreatorModel(newAttributes);			
			model.addEventListener("onAttributesCreated", initCreatorWithNewAttributes);
			model.init();
		}

		function initCreatorWithNewAttributes(event) {
			let attributes = event.details.attributes;
			initEntityCreator(attributes);
			initView();
		}

		function initEntityCreator(attributes){
			entityCreator = new EntityCreator(INNER_PAGE_ID, FORWARD_BUTTON_ID, BACKWARDS_BUTTON_ID, 
								TEXT_BOX_ID, NUM_OF_PAGES, attributes, pages, VALUE_BOX_ID, FEEDBACK_BOX_ID);
			entityCreator.addEventListener("onPageChange", handlePageChange);
			entityCreator.addEventListener("hasEnoughValues", handleHasEnoughValues);
			entityCreator.init();
		}

		//view updaten, damit listener neu geladen werden;
		function handlePageChange(){
				updateView();		
		}

		function updateView(){
			let attribute,
				value;
			if(view){
				view.update();
				attribute = view.getCurrentAttribute();
				value = model.getValueOfAttribute(attribute);
				if(value){
					view.setInputValue(value);
					view.setValueBox(value);
				}
				if(attribute == "password"){
					view.testPasswords(INPUT_BOX_2)
				}
				if(attribute == "email"){
					view.testEmail();
				}							
			}	
		}

		function handleHasEnoughValues(event){
			let attributes = model.getAttributes();
			sendAttributes(attributes);
		}

		function initView(){
			view = new UserCreatorView(VALUE_BOX_ID, INPUT_BOX, FEEDBACK_BOX_ID);
			view.init();
			view.addEventListener("onValidation", handlePassword);
			updateView();	
		}

		function handlePassword(event){
			let isValidInput = event.details.isValid;
			if(isValidInput){
				proceedPageSlider();
			}
			else{
				stopPageSlider();				
			}
		}

		function sendAttributes(attributes){
			let event = new Event("onEnoughAttributes");
			event.details = {};
			event.details.attributes = attributes;
			that.dispatchEvent(event);
		}

		function stopPageSlider(){
			entityCreator.setPageCanChange(false);
		}

		function proceedPageSlider(){
			entityCreator.setPageCanChange(true);
		}

		that.init = init;
		return that;

}