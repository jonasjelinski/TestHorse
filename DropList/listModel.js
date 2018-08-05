var DropList = DropList || {};

/*
 * @namespace ListModel
 * @memberOf! DropList
 * @description Model of the ListModel containing and handling the data.
 * <p><code><ListModel</code> contains and handles the data of the DropList-Modul
 * @param {Array} listElementsData array containing objects which contain the data for the li-eLements of the DropList-Modul
 * </p>
 */
DropList.ListModel = (function(listElementsData, nameOfId){
	let that = new EventTarget(),
		elements,
		elementTagId

	/**
	* @function init
	* @public
	* @memberof! ListModel  
	* @instance
	* @description Initialize this model. Saves the array data of the listElementsData in the variable elements.
	*/ 	
	function init(){		
		elements = listElementsData;
		elementTagId = nameOfId;
	}

	/**
	* @function addNewElement
	* @public
	* @memberof! ListModel  
	* @instance
	* @param {Object} element
	* @description Adds a new array to elements.
	*/ 	
	function addNewElement(element){
		elements.push(element);
	}

	/**
	* @function removeElementById
	* @public
	* @memberof! ListModel  
	* @instance
	* @param {id} id of the element
	* @description Removes an element of the array elements by its id.
	*/ 	
	function removeElementById(id){
		let numberOfElementsToDelete = 1;
		for(let i = 0; i < elements.length; i++){
			let element = elements[i],
				elementId = element[elementTagId];
			if(elementId === id){
				if (index > -1) {
  					array.elements(i, numberOfElementsToDelete);
				}
			}
		}
	}

	/**
	* @function updateElementOrder
	* @public
	* @memberof! ListModel  
	* @instance
	* @param {currentOrder} Array of ids, containing the correct order of the elements.
	* @description Sorts the elements by the ids of the array currentOrder
	*/ 	
	function updateElementOrder(currentOrder){ 
		let newOrder = {};            
		currentOrder.forEach(function (a, i) { 
		  newOrder[a] = i; 
		});
		elements.sort(function (a, b) {
		  return newOrder[a.id] - newOrder[b.id];
		});
	}

	/**
	* @function getElements
	* @public
	* @memberof! ListModel  
	* @instance
	* @description Returns the array elements.
	*/ 	
	function getElements(){
		return elements;
	}

	that.init = init;
	that.addNewElement = addNewElement;
	that.removeElementById = removeElementById;
	that.updateElementOrder = updateElementOrder;
	that.getElements = elements;	
	return that;
});