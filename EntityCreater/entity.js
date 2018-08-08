  class Entity{
	constructor(attributes){
		this.attributes = attributes;
	}
	
	setAttribute(key, value){
		let attribute = this.attributes[key];
		attribute.value = value;
		this.attributes[key] = attribute;
	}

	getAttribute(key){
		return this.attributes[key];
	}
	
	getAllAttributes(){
		return this.attributes;
	}

	hasAllNecessaryAttributes(){
		if(!oneNecessaryAttributeIsUndefined){
			return true;
		}
		return false;	
	}

	oneNecessaryAttributeIsUndefined(){
		for(let i=0; i < this.attributes.length; i++){
			let attribute = this.attributes[i];	
			if(attribute.isNecessary){
				if(attribute.value === undefined){
					return true;
				}
			}			
		}
		return false;
	}

}