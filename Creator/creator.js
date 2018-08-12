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
		this.entityCreator.addEventListener("onPageChange", this.handlePageChange.bind(this));
		this.entityCreator.addEventListener("hasEnoughValues", this.handleHasEnoughValues.bind(this));
		this.entityCreator.init();
	}

	//view updaten, damit listener neu geladen werden;
	handlePageChange(){
			this.updateView();		
	}

	updateView(){
		let attribute,
			value;
		if(this.view){
			this.view.update();
			attribute = this.view.getCurrentAttribute();
			value = this.model.getValueOfAttribute(attribute);
			if(value){
				this.view.setInputValue(value);
				this.view.setValueBox(value);
			}
		}	
	}

	handleHasEnoughValues(event){
		let attributes = event.details.data;
		this.sendAttributes(attributes);
	}

	initView(){
		this.view.init();
		this.updateView();	
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

    upateCreator(attributes){
    	this.updateEntityCreator(attributes);
    	this.updateModelAttributes(attributes);
    	this.updateView();
    }

    updateEntityCreator(attributes) {
    	this.entityCreator.updateModel(attributes);
    }

    updateModelAttributes(attributes){
    	this.model.setAttributes(attributes);
    } 
}