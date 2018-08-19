var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage = function(userID){
	let that = new EventTarget(),
		dropList,
		dbInterface,
		model,
		controlls,
		ulDomElementId = "allRegularDates",
		elementTemplateString,
		elementTagId = "regularDateId",
		deleteButtonClass = "regularDateDelete",
		changeButtonClass = "regularDateChange",
		backbuttonId= "backToDates",
		popup,
		changeId,
		horseID;

	function init(newHorseID){		
		setHorseIDAndTemplateString(newHorseID);
		initDBInterface();
		requestDatesFromDB();
		initPopup();
	}

	function setHorseIDAndTemplateString(newHorseID){
		horseID = newHorseID || 38;
		elementTemplateString = document.getElementById("ul-element").innerHTML;
	}	

	function initDBInterface(){
		dbInterface = RegularDatesPage.DBRequester(userID,horseID);
		dbInterface.init();
		dbInterface.addEventListener("onResult", handleDBResult);
	}

	function requestDatesFromDB(){
		dbInterface.requestDatesFromDB();
		console.log("init RegularDatesPage");
	}

	function handleDBResult(event){
		let allDatesAsStrings = event.details.allDates;		
		initModel(allDatesAsStrings);		
	}

	function initModel(allDatesAsStrings){
		model = new RegularDatesPage.Model();
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
		initControlls();	
	}

	function addDropListListeners(){
		dropList.addEventListener("onNewOrder", handleNewOrder);
	}

	function handleNewOrder(){
		let newData = dropList.getElements();
		model.updateData(newData);
	}

	function initControlls(){
		controlls = RegularDatesPage.RegularDatesPageControll(deleteButtonClass, changeButtonClass,backbuttonId);
		controlls.init();
		addControllListeners();
	}

	function addControllListeners(){
		controlls.addEventListener("onDeleteClick", handleDeleteClick);
		controlls.addEventListener("onChangeClick", handleChangeClick);
		controlls.addEventListener("onBackButtonClicked", handleBackClick);
	}


	function handleDeleteClick(event){
		showPopup();
		let id = event.details.id;
		model.setDelteId(id);
	}

	function showPopup() {
		popup.setPopupVisible();
	}

		/**
	* @function sendEvent
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description Dispatches the event of the type "type"
	*/ 	
	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = data;
		}
		that.dispatchEvent(event);
	}

	function handleChangeClick(event){
		let id = event.details.id,
			attributes = model.getDateAttributesById(id),
			data = {
				attributes: attributes,
			}
		sendEvent("onChangeDate", data);
	}

	function handleBackClick(){
		sendEvent("showAllDates");
	}

	function initPopup(){
		popup = Popup("Wirklich löschen?");
		popup.addEventListener("onYes", handleYes);
		popup.init();
	}

	function handleYes(){
		let id = model.getDelteId();
		console.log("delteDate", id);
	}	

	that.init = init;
	return that;
}