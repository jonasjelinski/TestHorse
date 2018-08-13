class Creator extends EventTarget{
	constructor(entityCreator, creatorModel, view){
		super();
		this.entityCreator = entityCreator;
		this.model = creatorModel;
		this.view = view;
	}
	
	init(){			
		this.initModel();
		this.initEntityCreator();
		this.initView();			
	}

	initModel(){		
		this.model.init();
	}
	
	initEntityCreator(){		
		this.entityCreator.addEventListener("onCurrentData", this.handleCurrentData.bind(this));
		this.entityCreator.addEventListener("onOldValuesOfNewPageLoaded", this.handlePageChangeAndOldValues.bind(this));
		this.entityCreator.addEventListener("hasEnoughValues", this.handleHasEnoughValues.bind(this));
		this.entityCreator.init();
	}

	handleCurrentData(event){
			let attributeAndValue = this.getAttributeAndValueFromEvent(event),
			attribute = attributeAndValue[0],
			value = attributeAndValue[1];			
		this.updateModel(attribute, value);			
	}

	handlePageChangeAndOldValues(event){
		let attributeAndValue = this.getAttributeAndValueFromEvent(event),
			value = attributeAndValue[1];			
		this.updateView(value);			
	}

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

	updateView(value){
		this.reloadViewAfterPageChange();
		this.fillViewInputWithValuesOfPreviousInputIfThereHasBeenOne(value);
	}

	reloadViewAfterPageChange() {
		this.view.init();
	}

	fillViewInputWithValuesOfPreviousInputIfThereHasBeenOne(value){
		if(value){
			this.view.setInputValue(value);
			this.view.setValueBox(value);
		}		
	}

	updateModel(attribute, value){
		this.model.setAttributeValue(attribute, value);
	}

	handleHasEnoughValues(event){
		let attributes = event.details.data;
		this.sendAttributes(attributes);
	}

	initView(){
		this.view.init();
	}

	sendAttributes(attributes){
		let event = new Event("onEnoughAttributes");
		event.details = {};
		event.details.attributes = attributes;
		this.dispatchEvent(event);
	}

	stopPageSlider(){ 
      this.entityCreator.setPageCanChange(false); 
    } 
 
    proceedPageSlider(){ 
      this.entityCreator.setPageCanChange(true); 
    }

    resetCreator(attributes){
    	this.entityCreator.overrideConstructorAttributes(attributes);
    	this.updateCreator(attributes);
    }

    updateCreator(attributes){
    	this.updateEntityCreator(attributes);
    	this.updateModelAttributes(attributes);
    }

    updateEntityCreator(attributes) {
    	this.entityCreator.updateModel(attributes);
    }

    updateModelAttributes(attributes){
    	this.model.setAttributes(attributes);
    }

    changeEntity(newAttributes){		
		this.attributes = this.changer.changeAttributes(newAttributes);
		this.updateCreator(this.attributes);
	} 
}