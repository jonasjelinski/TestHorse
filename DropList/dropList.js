var DropList = DropList || {};

DropList = (function(domElementId, listElementsData, elementTemplateString){
	let dropList = new EventTarget(),
		listDomElement,
		listView,
		listModel; 

	function init(){
		listDomElement = document.getElementById(domElementId);
		listView = new ListView(listDomElement, elementTemplateString);;
		listModel = new DropList.ListModel(listElementsData);
		addListElementsToView(listElementsData);
		addListeners();
	}

	function addListElementsToView(listElementsData){
		for(let i = 0; i < listElementsData.length; i++){
			let data = listElementsData[i],
				id = data.id;
			listView.addNewElement(data, id);
		}
	}

	function addNewElement(elementData, id){
		listView.addNewElement(elementData, id);
		listModel.addNewElement(elementData);
	}

	function removeElementById(id){
		listView.removeElementById(elementData);
		listModel.removeElementById(elementData);
	}

	function addListeners(){
		listView.addEventListener(listView.onElementClick, handleOnElementClick);
		listView.addEventListener(listView.onInserted, handleOnInserted);
	}

	function handleOnElementClick(){
		let event = new Event("onElementClick");
		dropList.dispatchEvent(event);
	}

	function handleOnInserted(){
		let currentOrder = listView.getCurrentOrder();
		listModel.updateElementOrder(currentOrder);
	}

	function getElements(){
		return listModel.getElements();
	}

	function updateElementById(id, elementData){
		removeElementById(id);
		addNewElement(elementData);
	}

	dropList.init = init;
	dropList.addNewElement = addNewElement;
	dropList.removeElementById = removeElementById;
	dropList.updateElementById = updateElementById;
	dropList.getElements = getElements;
	return dropList;
});