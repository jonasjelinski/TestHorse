/**
 * @class Creator
 * @description Class <code>Creator</code> is used to create a new entity. For exapmle a horse or a user.
 * @param {object} entityCreator. An instance of EntityCreator which creates and entity whith a slideshow
 * @param {object} creatorModel. An instance of CreatorModel which contains the attributes of the entity
 * @param {object} view. An instance of CreatorView, which handles the inputs of the user.
 */

class Creator extends EventTarget{
	constructor(entityCreator, creatorModel, view){
		super();
		this.entityCreator = entityCreator;
		this.model = creatorModel;
		this.view = view;
		this.sideCanChange = true;	
	}

	/**
	* @function init
	* @public
	* @memberof! Creator
	* @instance
	* @description Initialize this class.
	*/ 	
	init(){		
		this.initModel();
		this.initEntityCreator();
		this.initView();			
	}

	/**
	* @function initModel
	* @public
	* @memberof! Creator
	* @instance
	* @description Initialize this model.
	*/ 	
	initModel(){		
		this.model.init();
	}

	/**
	* @function initEntityCreator
	* @public
	* @memberof! Creator
	* @instance
	* @description Initialize this entiyCreator and adds the listeners to it.
	*/ 	
	initEntityCreator(){		
		this.entityCreator.addEventListener("onCurrentData", this.handleCurrentData.bind(this));
		this.entityCreator.addEventListener("onOldValuesOfNewPageLoaded", this.handlePageChangeAndOldValues.bind(this));
		this.entityCreator.addEventListener("hasEnoughValues", this.handleHasEnoughValues.bind(this));
		this.entityCreator.init();
	}


	/**
	* @function handleCurrentData
	* @public
	* @memberof! Creator
	* @instance
	* @param{event} event, contains the data attribute and value
	* @description  receives the attribute and value of entityCreator and updates the model with them	
	*/ 	
	handleCurrentData(event){
			let attributeAndValue = this.getAttributeAndValueFromEvent(event),
			attribute = attributeAndValue[0],
			value = attributeAndValue[1];			
		this.updateModel(attribute, value);			
	}

	/**
	* @function handlePageChangeAndOldValues
	* @public
	* @memberof! Creator
	* @instance
	* @param{event} event, contains the data attribute and value
	* @description  receives old values from entityCreator updates view	with them
	* is usefuld because the user doesnt have to put in values again if he scips back in the slidershow
	*/ 
	handlePageChangeAndOldValues(event){
		let attributeAndValue = this.getAttributeAndValueFromEvent(event),
			value = attributeAndValue[1];			
		this.updateView(value);			
	}

	/**
	* @function getAttributeAndValueFromEvent
	* @public
	* @memberof! Creator
	* @instance
	* @param{event} event, contains the data attribute and value
	* @description  returns attribute and values if the event contains them
	*/ 
	getAttributeAndValueFromEvent(event){
		let details = event.details,
		data,
		attribute,
		value;

		if(details){
			data = details.data,
			attribute = data.attribute,
			value = data.value;
		}
		return [attribute, value];
	}

	/**
	* @function updateView
	* @public
	* @memberof! Creator
	* @instance
	* @param{value} value, value to fill the view
	* @description  updates the view with this value if the value is not undefined
	* reloads the view after the entityCreator has switched the page
	*/ 
	updateView(value){
		this.reloadViewAfterPageChange();
		this.fillViewInputWithValuesOfPreviousInputIfThereHasBeenOne(value);
	}

	/**
	* @function reloadViewAfterPageChange
	* @public
	* @memberof! Creator
	* @instance
	* @description  updats the view, because dom-Elemnts have changed
	*/ 
	reloadViewAfterPageChange() {
		this.view.init();
	}

	/**
	* @function fillViewInputWithValuesOfPreviousInputIfThereHasBeenOne
	* @public
	* @memberof! Creator
	* @instance
	* @param{value} value, value to fill the view
	* @description  updates the view, if the value is not undefined
	*/ 
	fillViewInputWithValuesOfPreviousInputIfThereHasBeenOne(value){
		if(value){
			this.view.setInputValue(value);
			this.view.setValueBox(value);
		}		
	}

	/**
	* @function updateModel
	* @public
	* @memberof! Creator
	* @instance
	* @param{attribute} attribute, attribute to update
	* @param{value} value, value to update
	* @description  updates the model
	*/ 
	updateModel(attribute, value){
		this.model.setAttributeValue(attribute, value);
	}


	/**
	* @function handleHasEnoughValues
	* @public
	* @memberof! Creator
	* @instance
	* @param{event} event, contains attrtibutes
	* @description if the entityCreator has enoguh attributes it send them as data
	*/ 
	handleHasEnoughValues(event){
		let attributes = event.details.data;
		this.sendAttributes(attributes);
	}

	/**
	* @function initView
	* @public
	* @memberof! Creator
	* @instance
	* @description inits the view
	*/ 
	initView(){
		this.view.init();
		this.view.addEventListener("onInput", this.handleInput.bind(this));
	}

	handleInput(){
		if(this.sideCanChange){
			this.entityCreator.checkInput();
		}		
	}

	/**
	* @function sendAttributes
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attributes, contains attrtibutes, describing the entity
	* @description sends attributes to toher moduls
	*/ 
	sendAttributes(attributes){
		let event = new Event("onEnoughAttributes");
		event.details = {};
		event.details.attributes = attributes;
		this.dispatchEvent(event);
	}

	/**
	* @function stopPageSlider
	* @public
	* @memberof! Creator
	* @instance
	* @description stops the slider of entityCreator. is used to controll the entitycreator
	* if user puts in wrong values on no values
	*/ 
	stopPageSlider(){ 
	  this.sideCanChange = false;
      this.entityCreator.setPageCanChange(false); 
    }

    /**
	* @function proceedPageSlider
	* @public
	* @memberof! Creator
	* @instance
	* @description enables the slider of entityCreator. is used to controll the entitycreator
	* if user puts in correct values.
	*/  
    proceedPageSlider(){ 
      this.sideCanChange = true;
      this.entityCreator.setPageCanChange(true); 
    }

     /**
	* @function resetCreator
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attributes, contains attrtibutes, describing the entity
	* @description rests the creator. this is used to use this class as class to
	* change an existing entity
	*/  
    resetCreator(attributes){
    	this.entityCreator.overrideConstructorAttributes(attributes);
    	this.updateCreator(attributes);
    }

     /**
	* @function updateCreator
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attributes, contains attrtibutes, describing the entity
	* @description updates the entitiyCreator and this model
	*/  
    updateCreator(attributes){
    	this.updateEntityCreator(attributes);
    	this.updateModelAttributes(attributes);
    }

    /**
	* @function updateEntityCreator
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attributes, contains attrtibutes, describing the entity
	* @description updates the entitiyCreator
	*/
    updateEntityCreator(attributes) {
    	this.entityCreator.updateModel(attributes);
    }

    /**
	* @function updateModelAttributes
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attributes, contains attrtibutes, describing the entity
	* @description updates this model
	*/
    updateModelAttributes(attributes){
    	this.model.setAttributes(attributes);
    }

    /**
	* @function changeEntity
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attributes, contains attrtibutes, describing the entity
	* @description is used to us this class to change an existing entity
	*/
    changeEntity(newAttributes){		
		this.attributes = this.changer.changeAttributes(newAttributes);
		this.updateCreator(this.attributes);
	} 
}