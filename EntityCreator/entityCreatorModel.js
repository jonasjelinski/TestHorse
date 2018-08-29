var EntityCreator = EntityCreator || {};

/**
 * @namespace EntityCreator.EntityCreatorModel
 * @memberOf! EntityCreator
 * @description This modul <code>EntityCreatorModel</code> is the model of the EntityCreator*/

EntityCreator.EntityCreatorModel = function(attr){
	let that = new EventTarget(),
		pageNumber,
		entity,
		attributes;


	/**
	* @function init
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description Initialize this model.
	*/ 
	function init(){
		attributes = attr;
		entity = new Entity(attributes);
		checkInput();
	}

	/**
	* @function updateAttributeValue
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @param {String} property
	* @param {object} value
	* @description updates the entity of this modul with new values
	*/ 
	function updateAttributeValue(property, value){
		entity.setAttribute(property, value);
	}

	/**
	* @function setPage
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @param {String} pageNum
	* @description sets the pageNumber 
	*/ 
	function setPage(pageNum){
		pageNumber = pageNum;
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @param {string} type
	* @param {data} data
	* @description sends the event of type type and the data 
	*/
	function sendEvent(type, data){
		let event = new Event(type);
		event.details = data;
		that.dispatchEvent(event);
	}

	/**
	* @function checkIfEntityHasEnoughValues
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description asks the entitiy if it has all necessary values
	* sends an event according to the answer to inform other moduls 
	*/
	function checkIfEntityHasEnoughValues(){
		if(entity.hasAllNecessaryAttributes()){
			let attributes = entity.getAllAttributes(),
				data = {data:attributes}; 
			sendEvent("hasEnoughValues", data);
		}
		else{
			sendEvent("hasNotEnoughValues");
		}
	}

	/**
	* @function setAttributes
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @param {object} newAttributes
	* @description sets attributes
	*/
	function setAttributes(newAttributes){
		attributes = newAttributes;
	}


	/**
	* @function createNewEntity
	* @private
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description creates an instance of entity with new
	*/
	function createNewEntity(){
		entity = new Entity(attributes);
	}

	/**
	* @function updateModel
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description sets attributes and creates a new entity with the new attributes after that
	*/
	function updateModel(attributes){
		setAttributes(attributes);
		createNewEntity();	
	}

	/**
	* @function updateModel
	* @getAttribute
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @param {string} attributeName
	* @description returns the attribute with the name 'attributeName'
	*/
	function getAttribute(attributeName){
		return entity.getAttribute(attributeName);
	}

	function isNecessaryAttributeFilled(attributeName, value){
		let attribute = entity.getAttribute(attributeName);
		return !isEmptyAndNecessary(attribute, value);
	}

	function isEmptyAndNecessary(attribute, value){
		return attribute.isNecessary && value === "";
	}

	function checkInput(){
		sendEvent("onCheckInput","");
	}

	
	that.init = init;
	that.checkIfEntityHasEnoughValues = checkIfEntityHasEnoughValues;
	that.updateAttributeValue = updateAttributeValue;
	that.setPage = setPage;
	that.updateModel = updateModel;
	that.getAttribute = getAttribute;
	that.isNecessaryAttributeFilled = isNecessaryAttributeFilled;
	return that;

}