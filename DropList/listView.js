var DropList = DropList || {};

/**
 * @class ListView
 * @description Class for a new ul-List extends EventTarget
 * <p><code><ListElement</code> handles the communication between the unsorted list <code>listDomElement</code> and its li-elements
 * @param {html-object} domElement an unsorted list ul
 * @param {string} elementTemplateString Template which is used to create new li-elements with the listElementsData
 * </p>
 */
class ListView extends EventTarget{

	/**
	* @function constructor
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {html-object} domElement list-element of an unsorted list
	* @param {string} elementId Id of the domElement
	* @description Constructor of this class. Sets the class-parameters.
	*/ 	
	constructor(domElement, elementTemplateString, elementTagId){
		super();
		this.unsortedList = domElement;
		this.onElementClick = "onElementClick";
		this.onInserted = "inserted";
		this.elementTemplateString = elementTemplateString;
		this.elementTagId = elementTagId;
	}

	/**
	* @function addNewElement
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {object} data contains the data fo a new li-element
	* @param {string} id Id of the new li-element
	* @description Adds a new li-element to this.unsortedList
	*/ 	
	addNewElement(data, id){
		let li =  this.createNewElement(data),
			listElement = new ListElement(li, id, this.elementTagId);
		this.addListeners(listElement);
		this.unsortedList.appendChild(li);
	}

	/**
	* @function createNewElement
	* @private
	* @memberof! ListView  
	* @instance
 	* @param {object} data contains the data fo a new li-element
	* @description Creates a new html-li-element by using this.elementTemplateString and the data. 
	*/ 	
	createNewElement(data){
    	let element = {},
			div =  document.createElement("div"),
			templateFunction = _.template(this.elementTemplateString),
			elementHTML = templateFunction(data);
    	div.innerHTML = elementHTML;
    	element = div.children[0];
    	return element;
	}

	/**
	* @function removeElementById
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {id} id of the li-element
	* @description Removes an li-element of this.unsortedList by its id
	*/ 	
	removeElementById(id){
		let li = getLiElementyById(li);
		li.remove(li);
	}

	/**
	* @function addListeners
	* @private
	* @memberof! ListView  
	* @instance
 	* @param {listElement} dom-html element
	* @description Adds listeners to the listElement.
	*/ 	
	addListeners(listElement){  
		listElement.addEventListener(listElement.dropEvent, this.handleElementDrop.bind(this), false);
		listElement.addEventListener(listElement.clickEvent, this.handleElementClick.bind(this), false);    
	}

	/**
	* @function handleElementDrop
	* @private
	* @memberof! ListView  
	* @instance
 	* @param {event} Event Containing the id of the droppedELement as details
	* @description Insert the dropped li-element before the li-element dropped on if it is not the same li-element.
	*/ 
	handleElementDrop(event){		
		let details = event.details,    		
			id = event.details.id,
			droppedElement = this.getLiElementyById(id),    		
			element = event.target.element;
		if(element === undefined || droppedElement === undefined){
			return;
		}
		if(!this.isDroppingOnItsself(element, droppedElement)){
			this.insertDroppedElement(element, droppedElement);
		}    		
	}

	/**
	* @function getLiElementyById
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {string} id Id of the element
	* @description Returns the li-element with the id "id"
	*/ 
	getLiElementyById(id){		
		let listElements = this.unsortedList.children,
			listElement;
		for(let i = 0; i < listElements.length; i++){
		let li = listElements[i],
				lid = li.getAttribute(this.elementTagId);
			if(lid === id){
				listElement = li;
			}
		}
		return listElement;	
	}

	/**
	* @function isDroppingOnItsself
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {object} self Object
 	* @param {object} droppedElement Object
	* @description Returns true if self and droppedElement are the same object
	*/ 
	isDroppingOnItsself(self, droppedElement){	
		let selfId = self.getAttribute(this.elementTagId),
			id = droppedElement.getAttribute(this.elementTagId);
		if(id === selfId){
			return true;
		}
		return false;
	}

	/**
	* @function insertDroppedElement
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {object} element Object
 	* @param {object} droppedElement Object
	* @description Removes the droppedElemet from its old position an place it into a new one, 
	*/ 
	insertDroppedElement(element, droppedElement){           
	  this.removeDroppedElementFromPreviousPosition(droppedElement);
	  this.insertDroppedElementIntoNewPosition(element, droppedElement);
	  this.sendInsertedEvent();       
	}


	/**
	* @function removeDroppedElementFromPreviousPosition
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {object} droppedElement Object
	* @description Removes the droppedElemet from this.unsortedList.
	*/ 
	removeDroppedElementFromPreviousPosition(droppedElement){
		let li = droppedElement;
		this.unsortedList.removeChild(li);
	}

	/**
	* @function insertDroppedElementIntoNewPosition
	* @public
	* @memberof! ListView  
	* @instance
 	* @param {object} element Object
 	* @param {object} droppedElement Object
	* @description Insert droppedElement before element in this.unsortedList
	*/ 
	insertDroppedElementIntoNewPosition(element, droppedElement){
		let li = droppedElement;
		element.parentElement.insertBefore(li, element);
	}

	/**
	* @function sendInsertedEvent
	* @public
	* @memberof! ListView  
	* @instance
	* @description Dispatches an event of the type this.onInserted.
	*/ 
	sendInsertedEvent(){
		let event = new Event(this.onInserted);
		this.dispatchEvent(event);
	}

	/**
	* @function handleElementClick
	* @public
	* @memberof! ListView  
	* @instance
	* @param {event} ev event contains the elementId as detail.
	* @description Dispatches the elementId with the event of the type this.onElementClick
	*/ 
	handleElementClick(ev){
		let event = new Event(this.onElementClick);
		event.details = {};
		event.details.elementId = ev.details.elementId;
		this.dispatchEvent(event);
	}

	/**
	* @function getCurrentOrder
	* @public
	* @memberof! ListView  
	* @instance
	* @description Returns the ids of the elements in correct order as an array.
	*/ 
	getCurrentOrder(){
		let listElements = this.unsortedList.children,
		ids = [];
		for(let i = 0; i < listElements.length; i++){
		let li = listElements[i],
				id = li.getAttribute(this.elementTagId);
			ids.push(id);
		}
		return ids; 
	}
};