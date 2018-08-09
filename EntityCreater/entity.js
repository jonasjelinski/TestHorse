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