var DropList = DropList || {};

DropList.ListView = class ListView extends EventTarget{

	constructor(domElement, elementTemplateString){
		super();
		this.unsortedList = domElement;
		this.onElementClick = "onElementClick";
		this.onInserted = "inserted";
		this.elementTemplateString = elementTemplateString;
	}

	addNewElement(data, id){
		let li =  createNewElement(data),
			listElement = new ListElement(li, id);
		addListeners(listElement);
		this.unsortedList.appendChild(li):
	}

	createNewElement(data){
    	let templateFunction = _.template(this.elementTemplateString),
    	element = templateFunction(data);
    	return element;
	}

	deleteElementById(id){
		let li = getLiElementyById(li);
		li.remove(li);
	}

	getLiElementyById(id){
		let listElement;
		for(let i = 0; i < listElements.length; i++){
		//let liId = listElements[i].getElementsByTagName("img")[0].getAttribute("frame");
			if(lid === id){
				listElement = listElements[i];
			}
		}
		return listElement;	
	}

	addListeners(listElement){  
		listElement.addEventListener(listElement.dropEvent, handleElementDrop, false);
		listElement.addEventListener(listElement.clickEvent, handleElementClick, false);    
	}

	handleElementDrop(event){
		let details = event.details,    		
			droppedElement = event.details.droppedElement,    		
			element = that.element;
		if(!isDroppingOnItsself(this, droppedElement)){
			insertDroppedElement(element, droppedElement);
		}    		
	}

	isDroppingOnItsself(self, droppedElement){
		let selfId = self.elementId,
			droppedId = droppedElement.elementId;
		if(droppedId === selfId){
			return true;
		}
		return false;
	}	

	insertDroppedElement(element, droppedElement){           
	  removeDroppedElementFromPreviousPosition(droppedElement);
	  insertDroppedElementIntoNewPosition(element, droppedElement);
	  sendInsertedEvent();       
	}

	removeDroppedElementFromPreviousPosition(droppedElement){
		let li = droppedElement.element;
		this.unsortedList.removeChild(li);
	}

	insertDroppedElementIntoNewPosition(element, droppedElement){
		let li = droppedElement.element;
		element.insertBefore(li);
	}

	sendInsertedEvent(){
		let event = new Event(this.onInserted);
		this.dispatchEvent(event);
	}

	handleElementClick(ev){
		let event = new Event(this.onElementClick);
		event.details = {};
		event.details.elementId = ev.details.elementId;
		this.dispatchEvent(event);
	}

	getCurrentListOrder(){
		let listElements = this.unsortedList.children,
		ids = [];
		for(let i = 0; i < listElements.length; i++){
		//let id = listElements[i].getElementsByTagName("img")[0].getAttribute("frame");
		//ids.push(id);
		}
		return ids; 
	}
};