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
		popup,
		deleteId,
		changeId;

	function init(){
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		initPopup();		
		initModel();
		addListeners();		
		let testData = [{id: "1", name: "Hufschmied"}, {id: "2", name: "Tierarzt"},{id: "3", name: "Reiten"}];	
		initDropList(testData);	
	}

	function initPopup(){
		popup = Popup("Wirklich löschen?");
		popup.init();
	}

	function initModel(){		
		model = new RegularDatesPage.RegularDatesPageModel();			
	}

	function addListeners() {
		addModelListeners();
		addPopupListeners();
	}

	function addModelListeners() {
		model.addEventListener("onDataReceived", handleDataReceived);
	}


	function addPopupListeners(){
		popup.addEventListener("onYes", handleYes);
	}

	function handleYes(){
		console.log("delteDate");
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


	function handleDeleteClick(event){
		showPopup();
		let id = event.details.id;
		deleteId = deleteId;
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

	that.init = init;
	return that;
}