var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage = function(){
	let that = new EventTarget(),
		dropList,
		model,
		controlls,
		ulDomElementId = "regularDates",
		elementTemplateString = document.getElementById("ul-element");
		elementTagId = "regularDateId",
		deleteButtonClass = "regularDateDelete",
		changeButtonClass = "regularDateChange",
		backbuttonId= "backToDates";

	function init(){
		initModel();
		initControlls();	
	}

	function initModel(){
		model = new DatesPage.DatesPageModel();
		model.addEventListener("onDataReceived", handleDataReceived);		
	}

	function handleDataReceived(event){
		let listElementsData = event.details.event;		
		initDropList(listElementsData);
	}

	function initDropList(data){
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
		controlls = RegularDatesPage.RegularDatesPageControll(deleteButtonClass, changeButtonClass,backbuttonId);
		controlls.init();
		addControllListeners();
	}

	function addControllListeners(){
		controlls.addEventListener("onDelteClick", handleDeleteClick);
		controlls.addEventListener("onChangeClick", handleChangeClick);
		controlls.addEventListener("onBackButtonClicked", handleBackClick);
	}


	function handleDeleteClick(){
		sendEvent("onDeleteClick");
	}

	function sendEvent(type){
			let event = new Event(type);
			that.sendEvent(event);
	}

	function handleChangeClick(){
		sendEvent("onChangeClick");
	}

	function handleBackClick(){
		sendEvent("onBackButtonClicked");
	}

	that.init = init;
	return that;
}