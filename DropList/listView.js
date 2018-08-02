var DropList = DropList || {};

class ListView extends EventTarget{

	constructor(domElement, elementTemplateString){
		super();
		this.unsortedList = domElement;
		this.onElementClick = "onElementClick";
		this.onInserted = "inserted";
		this.elementTemplateString = elementTemplateString;
	}

	addNewElement(data, id){
		let li =  this.createNewElement(data),
			listElement = new ListElement(li, id);
		this.addListeners(listElement);
		this.unsortedList.appendChild(li);
	}

	createNewElement(data){
    	let element = {},
			div =  document.createElement("div"),
			templateFunction = _.template(this.elementTemplateString),
			elementHTML = templateFunction(data);
    	div.innerHTML = elementHTML;
    	element = div.children[0];
    	return element;
	}

	removeElementById(id){
		let li = getLiElementyById(li);
		li.remove(li);
	}

	addListeners(listElement){  
		listElement.addEventListener(listElement.dropEvent, this.handleElementDrop.bind(this), false);
		listElement.addEventListener(listElement.clickEvent, this.handleElementClick.bind(this), false);    
	}

	handleElementDrop(event){
		let details = event.details,    		
			id = event.details.id,
			droppedElement = this.getLiElementyById(id),    		
			element = event.target.element;
		if(!this.isDroppingOnItsself(element, droppedElement)){
			this.insertDroppedElement(element, droppedElement);
		}    		
	}

	getLiElementyById(id){
		let listElements = this.unsortedList.children,
			listElement;
		for(let i = 0; i < listElements.length; i++){
		let li = listElements[i],
			lid = li.id;
			if(lid === id){
				listElement = li;
			}
		}
		return listElement;	
	}

	isDroppingOnItsself(self, droppedElement){
		let selfId = self.id,
			id = droppedElement.id;
		if(id === selfId){
			return true;
		}
		return false;
	}	

	insertDroppedElement(element, droppedElement){           
	  this.removeDroppedElementFromPreviousPosition(droppedElement);
	  this.insertDroppedElementIntoNewPosition(element, droppedElement);
	  this.sendInsertedEvent();       
	}

	removeDroppedElementFromPreviousPosition(droppedElement){
		let li = droppedElement;
		this.unsortedList.removeChild(li);
	}

	insertDroppedElementIntoNewPosition(element, droppedElement){
		let li = droppedElement;
		element.parentElement.insertBefore(li, element);
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

	getCurrentOrder(){
		let listElements = this.unsortedList.children,
		ids = [];
		for(let i = 0; i < listElements.length; i++){
		let id = listElements[i].id;
			ids.push(id);
		}
		return ids; 
	}
};