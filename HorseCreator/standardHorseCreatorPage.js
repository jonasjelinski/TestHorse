var HorseCreatorPage = HorseCreatorPage || {};

HorseCreatorPage.StandardPage = function(attributes){
	
const INNER_PAGE_ID = "horseInteractionInnerPage",
		FORWARD_BUTTON_ID = "horseInteractionForward",
		BACKWARDS_BUTTON_ID = "horseInteractionBack",
		TEXT_BOX_ID = "horseInteractionProgress",
		NUM_OF_PAGES = 8,
		VALUE_BOX_ID = "horseInteractionValueBox",
		FEEDBACK_BOX_ID = "horseInteractionFeedback",
		INPUT_BOX_ID = "horseInteractionInput"; 

	let view = new HorseCreator.HorseCreatorView(VALUE_BOX_ID, INPUT_BOX_ID, FEEDBACK_BOX_ID), 
		model = new HorseCreator.HorseCreatorModel(attributes), 
		pages = new  HorseCreator.SliderPages(),	  
		entityCreator = new EntityCreator(INNER_PAGE_ID, FORWARD_BUTTON_ID, BACKWARDS_BUTTON_ID, TEXT_BOX_ID, NUM_OF_PAGES, attributes, pages, VALUE_BOX_ID, FEEDBACK_BOX_ID),   
		horseCreator = new Creator(entityCreator, model, view),
		that = new CreatorPage(attributes, horseCreator);

	that.horseCreator = horseCreator;	
	return that;
}