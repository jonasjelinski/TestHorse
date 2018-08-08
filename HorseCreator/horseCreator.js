var HorseCreator = HorseCreator || {};

HorseCreator = function(userID){
	const INNER_PAGE_ID = "horseInteractionInnerPage",
		FORWARD_BUTTON_ID = "horseInteractionForward",
		BACKWARDS_BUTTON_ID = "horseInteractionBack",
		TEXT_BOX_ID = "horseInteractionProgress",
		NUM_OF_PAGES = 6,
		VALUE_BOX_ID = "horseInteractionValueBox",
		FEEDBACK_BOX_ID = "horseInteractionFeedback"; 

	let that = new EventTarget(),
		attributes,
		pages,
		entityCreator,
		model;

		function init(){
			initAttributes();
			initPages();
			initEntityCreator();
			initModel();
			initView();
			showFirstPage();
		}

		function initAttributes(){
			attributes = {
				name: {value:"undefined",
					   isNecessary: "true",
				},
				owner: {value:"undefined",
					   isNecessary: "true",
				},
				race: {value:"undefined",
					   isNecessary: "true",
				},
				dateOfBirth : {value:"undefined",
					   isNecessary: "true",
				},
				photo: {value:"undefined",
					   isNecessary: "false",
				},
				sex : {value:"undefined",
					   isNecessary: "true",
				}, 
				height: {value:"undefined",
					   isNecessary: "true",
				}, 
				grower: {value:"undefined",
					   isNecessary: "true",
				},
			};
		}

		function initPages(){
			pages = new  HorseCreator.HorseCreatorPages();
		}

		function initEntityCreator(){
			entityCreator = new EntityCreater(INNER_PAGE_ID, FORWARD_BUTTON_ID, BACKWARDS_BUTTON_ID, 
								TEXT_BOX_ID, NUM_OF_PAGES, attributes, pages, VALUE_BOX_ID, FEEDBACK_BOX_ID);
			entityCreator.init();
		}

		function createHorseData(){
			let horseData = entityCreator.getData();
			horseData.userID = userID;
			horseData = deletePropertyIsNecessary(horseData);
			model.sendHorseDataToDB(horseData);			
		}

		function deletePropertyIsNecessary(horseData){
			//filter
			return horseData;
		}

		function initModel(){
			model = new HorseCreator.HorseCreatorModel();
		}

		function initView(){
			view = new HorseCreator.HorseCreatorView();
		}

		function showFirstPage() {
			entityCreator.showFirstPage();
		}

		that.init = init;
		return that;
}