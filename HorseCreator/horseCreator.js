var HorseCreator = HorseCreator || {};

HorseCreator = function(newAttributes){
	const INNER_PAGE_ID = "horseInteractionInnerPage",
		FORWARD_BUTTON_ID = "horseInteractionForward",
		BACKWARDS_BUTTON_ID = "horseInteractionBack",
		TEXT_BOX_ID = "horseInteractionProgress",
		NUM_OF_PAGES = 8,
		VALUE_BOX_ID = "horseInteractionValueBox",
		FEEDBACK_BOX_ID = "horseInteractionFeedback",
		INPUT_BOX = "horseInteractionInput"; 

	let that = new EventTarget(),
		pages,
		entityCreator,
		view,
		model;

		function init(){
			initPages();
			initModel();			
		}

		function initPages(){
			pages = new  HorseCreator.HorseCreatorSliderPages();
		}


		function initModel(){
			model = new HorseCreator.HorseCreatorModel(newAttributes);			
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
			}			
		}

		function handleHasEnoughValues(event){
			let attributes = model.getAttributes();
			sendAttributes(attributes);
		}

		function initView(){
			view = new HorseCreator.HorseCreatorView(VALUE_BOX_ID, INPUT_BOX);
			view.init();
		}

		function sendAttributes(attributes){
			let event = new Event("onEnoughAttributes");
			event.details = {};
			event.details.attributes = attributes;
			that.dispatchEvent(event);
		}

		that.init = init;
		return that;
}