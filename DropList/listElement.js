var DropList = DropList || {};

/**
 * @class ListElement
 * @description Class for a new li-element in an ul-List
 * <p><ListElement</code> handles the communication between the unsorted list <code>listDomElement</code> and its li-elements
 * @param {html-object} domElement list-element of an unsorted list
 * @param {string} elementId Id of the domElement
 */
class ListElement extends EventTarget{

	/**
	* @function constructor
	* @public
	* @memberof! ListElement  
	* @instance
 	* @param {html-object} domElement list-element of an unsorted list
	* @param {string} elementId Id of the domElement
	* @description Constructor of this class. Sets the class-parameters. Adds the listeners to the domElement.
	*/ 	
	constructor(domElement, elementId){
		super();
		this.element = domElement;
		this.elementId = elementId;
	   	this.element.addEventListener("dragstart", this.handleDragStart.bind(this), false);
	    this.element.addEventListener("dragover", this.handleDragOver.bind(this), false);
	    this.element.addEventListener("drop", this.handleDrop.bind(this), false);
	    this.element.addEventListener("onClick", this.handleClick(this), false);
		this.dragEvent = "onDrag";
		this.dropEvent = "onDrop";
		this.clickEvent = "onClick";		
	}

	/**
	* @function handleDragStart
	* @public
	* @memberof! ListElement  
	* @instance
 	* @param {event} event
	* @description Allows this.element to be moved and sets the data of the drag and drop transfer.
	*/ 	
	handleDragStart(event) { 
		let data = this.elementId;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", data);
	}

	/**
	* @function handleDragOver
	* @public
	* @memberof! ListElement  
	* @instance
 	* @param {event} event
	* @description Prevents default behaviour of this.element so it can be dreagged and dropped. Thats the event.dataTransfer.dropEffect to "move".
	*/ 	
	handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
	}

	/**
	* @function handleDrop
	* @public
	* @memberof! ListElement  
	* @instance
 	* @param {event} event
	* @description Prevents default behaviour of this.element so it can be dropped. Reads the data of the event and calls this.dispatchDroppedElement.
	*/ 	
  	handleDrop(event) {
		if( event.preventDefault){
			event.preventDefault();
		}
		if (event.stopPropagation) {
		  event.stopPropagation(); 
		}	
      	let id = event.dataTransfer.getData("text/html");
        this.dispatchDroppedElement(id);
      return false;
	}

	/**
	* @function dispatchDroppedElement
	* @public
	* @memberof! ListElement  
	* @instance
 	* @param {id} id
	* @description Sends the id as details trough the event this.dropEvent 
	*/ 	
	dispatchDroppedElement(id){
		let event = new Event(this.dropEvent);
		event.details = {};
		event.details.id = id;
		this.dispatchEvent(event);
	}

	/**
	* @function handleClick
	* @public
	* @memberof! ListElement  
	* @instance
	* @description Sends the this.elementId as details trough the event this.clickEvent 
	*/ 	
	handleClick(){
		let event = new Event(this.clickEvent);
		event.details = {};
		event.details.elementId = this.elementId;
		this.dispatchEvent(event);
	}

};