var DropList = DropList || {};

/**
 * @namespace DropList
 * @memberOf! DropList
 * @description Communication center of the DropList
 * <p><code><DropList</code> handles the communication between the unsorted list <code>listDomElement</code> and its li-elements
 * @param {string} domElementId id of the unsorted list DOM-Element
 * @param {Array} listElementsData array containing objects which contain the data for the li-eLements 
 * @param {string} elementTemplateString Template which is used to create new li-elements with the listElementsData
 * </p>
 */
DropList = (function(domElementId, listElementsData, elementTemplateString, elementTagId){
	let dropList = new EventTarget(),
		listDomElement,
		listView,
		listModel;

	/**
	* @function init
	* @public
	* @memberof! DropList  
	* @instance
	* @description Initialize this model.
	*/ 	
	function init(){
		initModels();
		addListElementsToView();
		addListeners();
	}

	/**
	* @function initModels
	* @private
	* @memberof! DropList  
	* @instance
	* @description Inits the listDomElement,listView and the listModel.
	* listDomElement is received by document.getElementById and the domElementId
	* listView receives this listDomElement and the elementTemplateString
	* listModel receives the listElementsData
	*/ 	
	function initModels(){
		listDomElement = document.getElementById(domElementId);
		listView = new ListView(listDomElement, elementTemplateString, elementTagId);
		listModel = new DropList.ListModel(listElementsData, elementTagId);
		listModel.init();
	}

	/**
	* @function addListElementsToView
	* @private
	* @memberof! DropList  
	* @instance
	* @description Adds new li-elements to the unsorted list
	* the data of the li-elements are in the array listElementsData
	* listView.addNewElement it the function to add new elements to the unsorted list
	* addListElementsToView is called in init of this modul so unsorted list is displayed 
	* correctly at the initialisation 
	*/ 	
	function addListElementsToView(){
		for(let i = 0; i < listElementsData.length; i++){
			let data = listElementsData[i],
				id = data.id;
			listView.addNewElement(data, id);
		}
	}

	/**
	* @function addNewElement
	* @public
	* @memberof! DropList  
	* @instance
	* @param {Object} elementData Object which contains the data for a new Element. Properties must fit to the needs of the elementTemplateString to create a new li-element.
	* @param {String} id Id of the new element. Must concur whith the id in the elementData.
	* @description Adds a new li-element to the view of the unsorted list and save its data into the listModel
	*/
	function addNewElement(elementData, id){
		listView.addNewElement(elementData, id);
		listModel.addNewElement(elementData);
	}

	/**
	* @function addNewElement
	* @public
	* @memberof! DropList  
	* @instance
	* @param {Object} elementData Object which contains the data for a new Element. Properties must fit to the needs of the elementTemplateString to create a new li-element.
	* @param {String} id Id of the new element. Must concur whith the id in the elementData.
	* @description Adds a new li-element to the view of the unsorted list and save its data into the listModel
	*/
	function removeElementById(id){
		listView.removeElementById(id);
		listModel.removeElementById(id);
	}

	/**
	* @function addListeners
	* @private
	* @memberof! DropList  
	* @instance
	* @description Adds the listners to the listView to create an listener-observer pattern with this modul.
	*/
	function addListeners(){
		listView.addEventListener(listView.onElementClick, handleOnElementClick);
		listView.addEventListener(listView.onInserted, handleOnInserted);
	}

	/**
	* @function handleOnElementClick
	* @private
	* @memberof! DropList  
	* @instance
	* @description Sends an "onElementClick" event to other moduls.
	*/
	function handleOnElementClick(ev){
		let event = new Event("onElementClick"),
			id = ev.details.elementId;
			event.details = {};
			event.details.id = id;
		dropList.dispatchEvent(event);
	}

	/**
	* @function handleOnInserted
	* @private
	* @memberof! DropList  
	* @instance
	* @description Updates the order of the list-elements in the model of this modul.
	*/
	function handleOnInserted(){
		updateElements();
	}

	function updateElements(){
		let currentOrder = listView.getCurrentOrder();
		listModel.updateElementOrder(currentOrder);
	}

	/**
	* @function getElements
	* @public
	* @memberof! DropList  
	* @instance
	* @description returns all li-elements
	*/
	function getElements(){
		return listModel.getElements();
	}

	/**
	* @function updateElementById
	* @public
	* @memberof! DropList  
	* @instance
	* @description Updates the element by deleting the old element and adds it into the unsorted list.
	*/
	function updateElementById(id, elementData){
		removeElementById(id);
		addNewElement(elementData);
	}

	function setElements(newElements){
		listModel.setElements(newElements);
	}

	function getCurrentElementIds(){
		return  listView.getCurrentOrder();
	}

	function cleanWrongTagsIds(wrongTag){
		listView.cleanWrongTagsIds(wrongTag);
	}

	dropList.init = init;
	dropList.addNewElement = addNewElement;
	dropList.removeElementById = removeElementById;
	dropList.updateElementById = updateElementById;
	dropList.getElements = getElements;
	dropList.setElements = setElements;
	dropList.getCurrentElementIds = getCurrentElementIds;
	dropList.cleanWrongTagsIds = cleanWrongTagsIds;
	return dropList;
});