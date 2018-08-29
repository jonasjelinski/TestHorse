var HorseCreatorPage = HorseCreatorPage || {};

/**
 * namespace StandardPage
 * @memberof! HorseCreatorPage
 * @params {attributes}, attributes of the horse which are given to the <code>EntityCreator</code>,
 * contains which attributes are necessary and which are optional and the name ofh te attributes
 * @description Creates and instance of the <code>CreatorPage</code> an returns that.
 * Uses the HorseCreator.HorseCreatorView, HorseCreator.HorseCreatorModel, HorseCreator.SliderPages
 * to create an EntityCreator. This EntityCreator is used to create the <code>CreatorPage</code>, which weill be returned
 * The reason for using a standardpage is to have cleaner code. It is used in the <code>HorseCreatorPage</code>
 * and the <code>creatorPage.horseCreator</code> is used in the <code>HorseProfileChanger</code>.
 */
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
		creatorPage = new CreatorPage(horseCreator);

	creatorPage.horseCreator = horseCreator;
	return creatorPage;
}
