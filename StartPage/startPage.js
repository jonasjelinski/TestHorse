var StartPage = StartPage || {};

/**
 * @namespace MainPage
 * @memberOf! MainPage
 * @description Modul handles the communcation between the different moduls of the mainpage
 * <p><code><dropList</code> is a modul which handles a dom-element of the type unsorted list </p>
 * <p><code><hamburgerMenu</code> is a modul which handles a hamburgerMenu, which is a kind of droplist</p>
 */
StartPage = function(userID){
	let that = new EventTarget(),
		dbInterface, 
		hamburgerMenu,
		model,
		dropList,
		dropListId = "horseList",
		listElementsData = [{id: "1", photo: "/src/xy"}, {id: "2", photo: "/src/xy"},{id: "3", photo: "/src/xy"}],		
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
		initDBInterface();
		requestDatesFromDB();
		initHamburgerMenu();
		initButtonControlls();		
		addEventListeners();
	}

	function initDBInterface(){
		dbInterface = StartPage.DBRequester(userID);
		dbInterface.addEventListener("onResult", handleDBResult);
		dbInterface.init();
	}

	function requestDatesFromDB(){
		dbInterface.requestDatesFromDB();
	}

	function handleDBResult(ev){
		let horseData = ev.details.allHorses;
		initModel(horseData);		
	}

	function initModel(horseData){
		model = new StartPage.Model();
		model.addEventListener("onDataConverted", handleOnDataConverted);
		model.init(horseData);
	}

	function handleOnDataConverted(event){
		let convertedHorseData = event.details.allHorses;
		initDropList(convertedHorseData);
	}

	function initDropList(horseData){
		elementTemplateString = document.getElementById("horseBoxElement").innerHTML;
		viewDomElement = document.getElementById("mainpage");
		if(horseData){
			if(!hasLastBox(horseData)){
				appendLastBox(horseData);
			}		
			dropList = new DropList(dropListId, horseData, elementTemplateString, "horseid");
			dropList.init();
			initDropLististener();
		}				
	}

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

	function appendLastBox(horseData){
		let lastElement = {id:lastBoxId, photo: "src/xzy"};
		horseData.push(lastElement);	
	}
	

	function initDropLististener(){
		dropList.addEventListener("onElementClick", handleLiClick);
	}

	function handleLiClick(ev){
		let id = ev.details.id;
		if(lastBoxClicked(id)){
			sendEvent("createNewHorse", "");			
		}
		else{
			let attributes = getHorseById(id);
			sendShowHorseEvent(attributes);
		}
	}	

	function getHorseById(id){

	}

	function sendShowHorseEvent(attributes){
		let event = new Event("showHorse");
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);	
	}

	function lastBoxClicked(id){
		if(id === lastBoxId){
			return true;
		}
		return false;
	}

	function initHamburgerMenu(){
		hamburgerMenu = new HamburgerMenu(clickBoxId, burgerList, inVisibleClass, visibleClass);
		hamburgerMenu.init();
		hamburgerMenu.addEventListener("onOption", handleHamburgerClick);
	}

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

	function handleProfileOption(){
		sendEvent("showProfilePage","");
	}

	function sendEvent(type, id){
		let event = new Event(type);
		event.details = {};
		event.details.horseId = id;
		that.dispatchEvent(event);	
	}

	function handleHelpOption(){
		sendEvent("showHelpPage","");
	}

	function handleLogoutOption(){
		sendEvent("logoutUser","");
	}

	function initButtonControlls(){
		buttonControlls = StartPage.Controlls(dateButtonClass, profileButtonClass);
		buttonControlls.init();
	}

	function addEventListeners(){
		buttonControlls.addEventListener("onDateClick", handleDateClick);
		buttonControlls.addEventListener("onProfileClick", handleProfileClick);
	}

	function handleDateClick(ev){
		let horseId = ev.details.id;
		sendEvent("showHorseDates",horseId);
	}

	function handleProfileClick(ev){
		let horseId = ev.details.id;
		sendEvent("showHorseProfile", horseId);	
	}	

	that.init = init;
	return that;
}