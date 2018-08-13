  class Entity{
	constructor(attributes){
		this.attributes = attributes;
	}
	
	setAttribute(key, value){
		if(this.attributes){
			let attribute = this.attributes[key];
			if(attribute){
				attribute.value = value;
				this.attributes[key] = attribute;
			}
		}		
	}

	getAttribute(key){
		return this.attributes[key];
	}

	getAttributeValue(key){
		let value,
			attribute = this.attributes[key];
		if(attribute){
			value = attribute.value;
		}
		return value;
	}
	
	getAllAttributes(){
		return this.attributes;
	}

	hasAllNecessaryAttributes(){
		if(!this.oneNecessaryAttributeIsUndefined()){
			return true;
		}
		return false;	
	}

	oneNecessaryAttributeIsUndefined(){
		let attributeNames = Object.keys(this.attributes),
			that = this,
			isUndefined = false;
		attributeNames.forEach(function(attributeName){
			let attribute = that.attributes[attributeName];					
			if(attribute.isNecessary){
				if(attribute.value === undefined || attribute.value === ""){
					isUndefined =  true;
				}
			 	}			
		});
		return isUndefined;
	}

}