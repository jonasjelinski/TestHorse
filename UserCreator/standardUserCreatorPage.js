var UserCreatorPage = UserCreatorPage || {};

UserCreatorPage.StandardPage = function(attributes){
	
	const INNER_PAGE_ID = "userInteractionInnerPage",
		FORWARD_BUTTON_ID = "userInteractionForward",
		BACKWARDS_BUTTON_ID = "userInteractionBack",
		TEXT_BOX_ID = "userInteractionProgress",
		NUM_OF_PAGES = 3,
		VALUE_BOX_ID = "userInteractionValueBox",
		FEEDBACK_BOX_ID = "userInteractionFeedback",
		INPUT_BOX_ID = "userInteractionInput", 
		INPUT_BOX_2 = "userInteractionInput2"; 

	let view = new UserCreatorView(VALUE_BOX_ID, INPUT_BOX_ID, FEEDBACK_BOX_ID), 
		model = new UserCreator.UserCreatorModel(attributes), 
		pages = new  UserCreator.SliderPages(),	  
		entityCreator = new EntityCreator(INNER_PAGE_ID, FORWARD_BUTTON_ID, BACKWARDS_BUTTON_ID, TEXT_BOX_ID, NUM_OF_PAGES, attributes, pages, VALUE_BOX_ID, FEEDBACK_BOX_ID),   
		userCreator = new UserCreatorClass(entityCreator, model, view),
		that = new CreatorPage(userCreator);


	that.userCreator = userCreator;	
	return that;
}