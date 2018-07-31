var HorseApp = HorseApp || {};

HorseApp.ListElement = class ListElement extends EventTarget{

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

	handleDragStart(event) { 
		let data = JSON.stringify(this);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text", data);
	}

	handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
	}

  	handleDrop(event) {
		if( ev.preventDefault){
			ev.preventDefault();
		}
		if (event.stopPropagation) {
		  event.stopPropagation(); 
		}	
      	let data = event.dataTransfer.getData("text"),
      		droppedElement = JSON.parse(data);
        dispatchDroppedElement(droppedElement);
      return false;
	}

	dispatchDroppedElement(droppedElement){
		let event = new Event(this.dropEvent);
		event.details = {};
		event.details.droppedElement = this.droppedElement;
		this.dispatchEvent(event);
	}

	handleClick(){
		let event = new Event(this.clickEvent);
		event.details = {};
		event.details.elementId = elementId;
		this.dispatchEvent(event);
	}

};