var DatesPageAll = DatesPageAll || {};

DatesPageAll = function(userID){
	let that = new EventTarget(),
		dropList,
		dbInterface,
		model,
		controlls,
		ulDomElementId = "allDates",
		elementTemplateString,
		elementTagId = "dateId",
		horseID;

	function init(newHorseID){
		horseID = newHorseID || 38;
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		initDBInterface();
		requestDatesFromDB();
		initControlls();	
	}

	function initDBInterface(){
		dbInterface = DatesPageAll.DBRequester(userID,horseID);
		dbInterface.init();
		dbInterface.addEventListener("onResult", handleDBResult);
	}

	function requestDatesFromDB(){
		dbInterface.requestDatesFromDB();
	}

	function handleDBResult(event){
		let allDatesAsStrings = event.details.allDates;		
		initModel(allDatesAsStrings);		
	}

	function initModel(allDatesAsStrings){
		model = new DatesPageAll.DatesPageModel();
		model.addEventListener("onDataConverted", handleOnDataConverted);
		model.init(allDatesAsStrings);	
	}

	function handleOnDataConverted(event){
		let convertedDates = event.details.allDates;
		initDropList(convertedDates);
	}	

	function initDropList(listElementsData){
		dropList = DropList(ulDomElementId, listElementsData, elementTemplateString, elementTagId);
		dropList.init();
		addDropListListeners();
	}

	function addDropListListeners(){
		dropList.addEventListener("onNewOrder", handleNewOrder);
	}

	function handleNewOrder(){
		let newOrder = dropList.getElements();
		model.updateData(newOrder);
	}

	function initControlls(){
		let regularDatesButton = document.getElementById("manageRegularDates"),
			singleDatesButton = document.getElementById("manageSingleDates"),
			cancelButton = document.getElementById("cancelDatesPage"),
		domElements = {
			regularDatesButton: regularDatesButton,
			singleDatesButton: singleDatesButton,
			cancelButton : cancelButton,
		}
		controlls = DatesPageAll.DatesPageControll(domElements);
		controlls.init();
		addControllListeners();
	}

	function addControllListeners(){
		controlls.addEventListener("onRegularClicked", handleRegularClick);
		controlls.addEventListener("onSingleClicked", handleSingleClick);
		controlls.addEventListener("onCancelDatesPage", handleCancelClick);
	}


	function handleRegularClick(){
		sendEvent("showRegularDates");
	}

	function sendEvent(type){
			let event = new Event(type);
			event.details = {};
			event.details.attributes = {};
			event.details.attributes.horseID = horseID;
			that.dispatchEvent(event);
	}

	function handleSingleClick(){
		sendEvent("showCreateSingleDate");
	}

	function handleCancelClick() {
		sendEvent("onCancel");
	}

	that.init = init;
	return that;
}