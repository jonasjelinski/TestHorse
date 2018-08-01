var DropList = DropList || {};

class ListElement extends EventTarget{

	constructor(domElement, elementId){
		super();
		this.element = domElement;
		this.elementId = elementId;
	   	this.element.addEventListener("dragstart", this.handleDragStart.bind(this), false);
	    this.element.addEventListener("dragover", this.handleDragOver.bind(this), false);
	    this.element.addEventListener("drop", this.handleDrop.bind(this), false);
	    //this.element.addEventListener("onClick", this.handleClick(this), false);
		this.dragEvent = "onDrag";
		this.dropEvent = "onDrop";
		this.clickEvent = "onClick";		
	}

	handleDragStart(event) { 
		console.log("start");
		let data = JSON.stringify(this);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", data);
	}

	handleDragOver(event) {
		console.log("drag");
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
	}

  	handleDrop(event) {
  		console.log("drop");
		if( event.preventDefault){
			event.preventDefault();
		}
		if (event.stopPropagation) {
		  event.stopPropagation(); 
		}	
      	let data = event.dataTransfer.getData("text"),
      		droppedElement = JSON.parse(data);
        this.dispatchDroppedElement(droppedElement);
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
		event.details.elementId = this.elementId;
		this.dispatchEvent(event);
	}

};