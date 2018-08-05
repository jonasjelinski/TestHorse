var DatesPage = DatesPage || {};

DatesPage = function(){
	let that = new EventTarget(),
		dropList,
		model,
		controlls;
		ulDomElementId = "dates",
		elementTemplateString = document.getElementById("ul-element");
		elementTagId = "dateId";

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
		let regularDatesButton = document.getElementById("manageRegularDates"),
			singleDatesButton = document.getElementById("manageSingleDates"),
		domElements = {
			regularDatesButton: regularDatesButton,
			singleDatesButton: singleDatesButton,
		}
		controlls = DatesPage.DatesPageControll(domElements);
		controlls.init();
		addControllListeners();
	}

	function addControllListeners(){
		controlls.addEventListener("onRegularClicked", handleRegularClick);
		controlls.addEventListener("onSingleClicked", handleSingleClick);
	}


	function handleRegularClick(){
		sendEvent("onRegularClicked");
	}

	function sendEvent(type){
			let event = new Event(type);
			that.sendEvent(event);
	}

	function handleSingleClick(){
		sendEvent("onSingleClicked");
	}

	that.init = init;
	return that;
}