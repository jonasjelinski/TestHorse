var StartPage = StartPage || {};

/**
 * @namespace StartPage
 * @memberOf! StartPage
 * @param{string} userID, id of the user
 * @description <code>StartPage</code> shows the startpge to the user
 * the startpage constis of a hamburgermenu and a list with the horses of the user
 */
StartPage = function(userID){

	const BURGER_CLICK_BOX_ID = "burger",
			BURGER_LIST_ID = "burgerListStartPage",
			BOX_TEMPLATE_ID = "horseBoxElementTemplate";		

	let that = new EventTarget(),
		dbInterface, 
		hamburgerMenu,
		model,
		dropList,
		dropListId = "horseList",	
		elementTemplateString,
		buttonControlls,
		dateButtonClass = "horseDateButton",
		profileButtonClass = "horseProfileButton",
		lastBoxId = "lastBox",
		clickBoxId = "burger",
		burgerList = "burgerListStartPage",
		inVisibleClass = "",
		visibleClass = "",
		burgerOptionProfile = "burgerOptionProfile",
		burgerOptionHelp = "burgerOptionHelp",
		burgerOptionLogout = "burgerOptionLogout";

	/**
	* @function init
	* @public
	* @memberof! MainPage  
	* @instance
	* @description Initialize this dbInterface. Sets the elementTemplateString, the hamburgerMenu and the dropList
	*/ 
	function init(){
		getDomElements();	
		initDropList();	
		initDBInterface();
		requestAllHorsesFromDB();
		initHamburgerMenu();		
	}


	function getDomElements(){
		elementTemplateString = document.getElementById(BOX_TEMPLATE_ID).innerHTML;
		viewDomElement = document.getElementById("mainpage");
	}

	/**
	* @function initDropList
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{array}, horseData
	* @description Initialize this droplist with horseData, elementTemplateString and viewDomElement
	* appends a last box to the list for creating new horses if there is no
	*/ 
	function initDropList(){
		let horseData = [];
		if(horseData){
			if(!hasLastBox(horseData)){
				appendLastBox(horseData);
			}		
			dropList = new DropList(dropListId, horseData, elementTemplateString, "horseid");
			dropList.init();
			initDropListListener();
		}				
	}

	
	/**
	* @function initDropListListener
	* @private
	* @memberof! MainPage  
	* @instance
	* @description adds listener to the dropList
	*/
	function initDropListListener(){
		dropList.addEventListener("onElementClick", handleHorseBoxClick);
	}

	/**
	* @function handleHorseBoxClick
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{event}, event, contains id of the clicked horsebox
	* @description sends an event that the user wants to create a new box
	* if the lastBox has been clicked
	*/
	function handleHorseBoxClick(event){
		let id = event.details.id;
		if(lastBoxClicked(id)){
			sendEvent("createNewHorse", "");			
		}		
	}

	/**
	* @function lastBoxClicked
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{string}, id, id of the clicked box
	* @description retruns true if id is the id of the lastBox
	*/
	function lastBoxClicked(id){
		if(id === lastBoxId){
			return true;
		}
		return false;
	}

	/**
	* @function appendLastBox
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{array}, horseData
	* @description pushs the last box to the array of horses
	*/ 
	function appendLastBox(horseData){
		let lastElement = {id:lastBoxId, photo: ""};
		horseData.push(lastElement);	
	}

	/**
	* @function hasLastBox
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{array}, horseData
	* @description returns true if the array horseData contains a last box
	*/ 
	function hasLastBox(horseData){		
		for(let i = 0; i < horseData.length; i++){
			let horse = horseData[i],
				id = horse.id;
			if(id === lastBoxId){
				return true;
			}
		}
		return false;
	}
	

	/**
	* @function initDBInterface
	* @private
	* @memberof! MainPage  
	* @instance
	* @description Initialize this dbInterface.
	*/ 
	function initDBInterface(){
		dbInterface = StartPage.DBRequester(userID);
		dbInterface.addEventListener("onResult", handleDBResult);
		dbInterface.init();
	}

	/**
	* @function requestAllHorsesFromDB
	* @private
	* @memberof! MainPage  
	* @instance
	* @description Requests all horses of the user from the database
	*/ 
	function requestAllHorsesFromDB(){
		dbInterface.requestAllHorsesFromDB();
	}

	/**
	* @function handleDBResult
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{event}, event contains the result of the database request (all horses)
	* @description Inits the modul with the result of the database request
	*/ 
	function handleDBResult(event){
		let horseData = event.details.allHorses;
		initModel(horseData);		
	}

	/**
	* @function initModel
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{string}, horseData contains the result of the database request as a string (all horses)
	* @description Initialize this model with horseData, adds an eventlistener to inform
	* other moduls if the model converted the result from a string to an array of objects
	*/ 
	function initModel(horseData){
		model = new StartPage.Model();
		model.addEventListener("onDataConverted", handleOnDataConverted);
		model.init(horseData);
	}

	/**
	* @function handleOnDataConverted
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{event}, event contains all horses as an array of objects
	* @description Initialize this droplist with the array of objects, each object desribes a horse 
	*/ 
	function handleOnDataConverted(event){
		let convertedHorseData = event.details.allHorses;
		addHorsesToDropList(convertedHorseData);
		initButtonControlls();		
		addButtonControllsListeners();
	}

	

	function addHorsesToDropList(horseData){
		for(let i = 0; i < horseData.length; i++){
			let element = horseData[i];
			dropList.addNewElement(element);
		}
	}

	

	

	/**
	* @function initHamburgerMenu
	* @private
	* @memberof! MainPage  
	* @instance
	* @description initts the hamburger menu
	*/
	function initHamburgerMenu(){
		hamburgerMenu = new HamburgerMenu(BURGER_CLICK_BOX_ID, BURGER_LIST_ID, inVisibleClass, visibleClass);
		hamburgerMenu.init();
		hamburgerMenu.addEventListener("onOption", handleHamburgerClick);
	}

	/**
	* @function handleHamburgerClick
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{event}, event, contains the option of the burger menu, which has been clicked by the user
	* @description handles the click of the options of the burgermenu
	*/
	function handleHamburgerClick(event){
		let option = event.details.option;
		switch(option){
			case burgerOptionProfile : handleProfileOption();
				break;
			case burgerOptionHelp : handleHelpOption();
				break;
			case burgerOptionLogout : handleLogoutOption();
				break;
			default: break;
		}
	}

	/**
	* @function handleProfileOption
	* @private
	* @memberof! MainPage  
	* @instance
	* @description sends event "showProfilePage" 
	*/
	function handleProfileOption(){
		sendEvent("showProfilePage","");
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @param {string}, type event type
	* @param {string}, id of the horse
	* @description sends event of type type and the id
	*/
	function sendEvent(type, id){
		let event = new Event(type);
		event.details = {};
		event.details.horseID = id;
		that.dispatchEvent(event);	
	}

	/**
	* @function handleProfileOption
	* @private
	* @memberof! MainPage  
	* @instance
	* @description sends event "showHelpPage" 
	*/
	function handleHelpOption(){
		sendEvent("showHelpPage","");	
	}

	/**
	* @function handleProfileOption
	* @private
	* @memberof! MainPage  
	* @instance
	* @description sends event "logoutUser" 
	*/
	function handleLogoutOption(){
		sendEvent("logoutUser","");
	}

	/**
	* @function initButtonControlls
	* @private
	* @memberof! MainPage  
	* @instance
	* @description inits the buttonControlls
	*/
	function initButtonControlls(){
		buttonControlls = StartPage.Controlls(dateButtonClass, profileButtonClass);
		buttonControlls.init();
	}

	/**
	* @function addButtonControllsListeners
	* @private
	* @memberof! MainPage  
	* @instance
	* @description adss listener to the buttonControlls
	*/
	function addButtonControllsListeners(){
		buttonControlls.addEventListener("onDateClick", handleDateClick);
		buttonControlls.addEventListener("onProfileClick", handleProfileClick);
	}

	/**
	* @function handleDateClick
	* @private
	* @memberof! MainPage  
	* @instance
	* @param {event}, event contains the horseId
	* @description sends the horse id with the event "showHorseDates"
	*/
	function handleDateClick(event){
		let horseId = event.details.id;
		sendEvent("showHorseDates",horseId);
	}

	/**
	* @function handleDateClick
	* @private
	* @memberof! MainPage  
	* @instance
	* @param {event}, event contains the horseId
	* @description sends the attributes of the horse with the event "showHorseProfile"
	*/
	function handleProfileClick(ev){
		let horseId = ev.details.id,
		horseAttributes = getHorseById(horseId);
		sendShowHorseEvent(horseAttributes);
	}

	/**
	* @function getHorseById
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{string}, id, id of the horse
	* @description retruns the attributes of the horse with the id "id"
	*/
	function getHorseById(id){
		let horseAttributes = model.getHorseById(id);
		return horseAttributes;
	}

	/**
	* @function sendShowHorseEvent
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{object}, attributes, attributes of the horse
	* @description sends the attributes of the horse with the event "showHorseProfile"
	*/	
	function sendShowHorseEvent(attributes){
		let event = new Event("showHorseProfile");
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);	
	}

	function updateList(){
		let elements = dropList.getElements(),
			allHorses;
		model.update(elements);
		allHorses = model.getAllHorses();
		dbInterface.updateAllHorses(allHorses);
	}	

	that.init = init;
	return that;
}