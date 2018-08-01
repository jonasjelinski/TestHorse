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
		let data = this.elementId;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", data);
	}

	handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
	}

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

	dispatchDroppedElement(id){
		let event = new Event(this.dropEvent);
		event.details = {};
		event.details.id = id;
		this.dispatchEvent(event);
	}

	handleClick(){
		let event = new Event(this.clickEvent);
		event.details = {};
		event.details.elementId = this.elementId;
		this.dispatchEvent(event);
	}

};