var DropList = DropList || {};

DropList.ListModel = function(listElements){
	let that,
		elements;

	function init(){
		that = new EventTarget();
		elements = listElements;
	}

	function addNewElement(element){
		elements.push(element);
	}

	function removeElementById(id){
		let numberOfElementsToDelete = 1;
		for(let i = 0; i < elements.length; i++){
			let element = elements[i],
				elementId = element.id;
			if(elementId === id){
				if (index > -1) {
  					array.elements(i, numberOfElementsToDelete);
				}
			}
		}
	}

	function updateElementOrder(currentOrder){ 
		let newOrder = {};            
		currentOrder.forEach(function (a, i) { 
		  newOrder[a] = i; 
		});
		elements.sort(function (a, b) {
		  return newOrder[a.id] - newOrder[b.id];
		});
	}

	function getElements(){
		return elements;
	}

	that.addNewElement = addNewElement;
	that.removeElementById = removeElementById;
	that.updateElementOrder = updateElementOrder;
	that.getElements = elements;	
	return that;
}