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
		horseID = newHorseID;
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		initDBInterface();
		initModel();
		initControlls();	
	}

	function initDBInterface(){
		dbInterface = DatesPageAll.DBRequester(userID,horseID);
		dbInterface.addEventListener("onResult", handleDBResult);
	}

	function initModel(){
		let testData = [{id: "1", name: "Dienstag Zahnarzt"}, {id: "2", name: "Mittwoch Lernen"},{id: "3", name: "Sonntag Fussball"}];
		model = new DatesPageAll.DatesPageModel();
		model.addEventListener("onDataReceived", handleDataReceived);
		initDropList(testData);		
	}

	function handleDataReceived(event){
		let listElementsData = event.details.event;		
		initDropList(listElementsData);
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
		let newData = dropList.getElements();
		model.updateData(newData);
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