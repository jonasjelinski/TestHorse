var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage = function(){
	let that = new EventTarget(),
		dropList,
		model,
		controlls,
		ulDomElementId = "allRegularDates",
		elementTemplateString,
		elementTagId = "regularDateId",
		deleteButtonClass = "regularDateDelete",
		changeButtonClass = "regularDateChange",
		backbuttonId= "backToDates",
		popup;

	function init(){
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		initPopup();		
		initModel();				
	}

	function initPopup(){
		popup = Popup("Wirklich löschen?");
		popup.init();
	}

	function addPopupListeners(){
		popup.addEventListener("onYes", handleYes);
	}

	function handleYes(){
		console.log("delteDate");
	}

	function initModel(){
		let testData = [{id: "1", name: "Hufschmied"}, {id: "2", name: "Tierarzt"},{id: "3", name: "Reiten"}];
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


	function handleDeleteClick(){
		sendEvent("onDeleteClick");
	}

		/**
	* @function sendEvent
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description Dispatches the event of the type "type"
	*/ 	
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleChangeClick(){
		sendEvent("onChangeClick");
	}

	function handleBackClick(){
		sendEvent("showAllDates");
	}

	that.init = init;
	return that;
}