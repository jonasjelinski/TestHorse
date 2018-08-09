var HorseCreator = HorseCreator || {};

HorseCreator = function(userID){
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
			pages = new  HorseCreator.HorseCreatorPages();
		}


		function initModel(){
			model = new HorseCreator.HorseCreatorModel();			
			model.addEventListener("onAttributesCreated", initCreaterWithNewAttributes);
			model.init();
		}

		function initCreaterWithNewAttributes(event) {
			let attributes = event.details.attributes;
			initEntityCreator(attributes);
			initView();
		}

		function initEntityCreator(attributes){
			entityCreator = new EntityCreater(INNER_PAGE_ID, FORWARD_BUTTON_ID, BACKWARDS_BUTTON_ID, 
								TEXT_BOX_ID, NUM_OF_PAGES, attributes, pages, VALUE_BOX_ID, FEEDBACK_BOX_ID);
			entityCreator.addEventListener("onPageChange", handlePageChange);
			entityCreator.addEventListener("hasEnoughValues", handleHasEnoughValues);
			entityCreator.init();
		}

		//view updaten, damit listener neu geladen werden;
		function handlePageChange(){
			if(view){
				view.update();	
			}			
		}

		function handleHasEnoughValues(event){
			let attributes = event.details.data;
			model.updateAttributes(attributes);
		}

		function initView(){
			view = new HorseCreator.HorseCreatorView(VALUE_BOX_ID, INPUT_BOX);
			view.init();
		}

		that.init = init;
		return that;
}