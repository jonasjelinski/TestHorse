var DatesPage = DatesPage || {};

DatesPage = function(){
	let that = new EventTarget(),
		dropList,
		model,
		controlls,
		ulDomElementId = "allDates",
		elementTemplateString,
		elementTagId = "dateId";

	function init(){
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		initModel();
		initControlls();	
	}

	function initModel(){
		let testData = [{id: "1", name: "Dienstag Zahnarzt"}, {id: "2", name: "Mittwoch Lernen"},{id: "3", name: "Sonntag Fussball"}];
		model = new DatesPage.DatesPageModel();
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
		controlls = DatesPage.DatesPageControll(domElements);
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