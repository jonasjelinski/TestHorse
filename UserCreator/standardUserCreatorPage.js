var UserCreatorPage = UserCreatorPage || {};

/** 
 * namespace StandardPage 
 * @memberof! UserCreatorPage
 * @params {attributes}, attributes of the user which are given to the <code>EntityCreator</code>, 
 * contains which attributes are necessary and which are optional and the name ofh te attributes
 * @description Creates and instance of the <code>CreatorPage</code> an returns that.
 * Uses the UserCreatorView, UserCreator.UserCreatorModel, UserCreator.SliderPages
 * to create an EntityCreator. This EntityCreator is used to create the <code>CreatorPage</code>, which weill be returned
 * The reason for using a standardpage is to have cleaner code. It is used in the <code>UserCreatorPage</code>
 * and the <code>creatorPage.userCreator</code> is used in the <code>UsereProfileChanger</code>.
 */

UserCreatorPage.StandardPage = function(attributes){
	
	const INNER_PAGE_ID = "userInteractionInnerPage",
		FORWARD_BUTTON_ID = "userInteractionForward",
		BACKWARDS_BUTTON_ID = "userInteractionBack",
		TEXT_BOX_ID = "userInteractionProgress",
		NUM_OF_PAGES = 4,
		VALUE_BOX_ID = "userInteractionValueBox",
		FEEDBACK_BOX_ID = "userInteractionFeedback",
		INPUT_BOX_ID = "userInteractionInput", 
		INPUT_BOX_2 = "userInteractionInput2"; 

	let view = new UserCreatorView(VALUE_BOX_ID, INPUT_BOX_ID, FEEDBACK_BOX_ID, INPUT_BOX_2), 
		model = new UserCreator.UserCreatorModel(attributes), 
		pages = new  UserCreator.SliderPages(),	  
		entityCreator = new EntityCreator(INNER_PAGE_ID, FORWARD_BUTTON_ID, BACKWARDS_BUTTON_ID, TEXT_BOX_ID, NUM_OF_PAGES, attributes, pages, VALUE_BOX_ID, FEEDBACK_BOX_ID),   
		userCreator = new UserCreatorClass(entityCreator, model, view),
		that = new CreatorPage(userCreator);


	that.userCreator = userCreator;	
	return that;
}