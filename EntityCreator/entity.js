/**
 * @class Entity
 * @description Class <code>Entity</code> contains an object attributes, which contains in each property
 * a value and a boolean if the attribute is necessary for the class to exist. For expample an instance 
 * of entity dog needs legs, so legs have <code>value: 4</code> and <code>isNecessary: true </code>.
 * A dog needs no colar to exist, but can have one so colar has <code>value: 1</code> and <code>isNecessary: false </code>.
 * <code><Entitiy/code> has methods to handle the attributes
 */

  class Entity{
	constructor(attributes){
		this.attributes = attributes;
	}
	

	/**
	* @function setAttribute
	* @public
	* @memberof! Entity  
	* @instance
	* @param {string} key, is the name of the attribute
	* @param {value} value, is the value which should be set
	* @description Overwrites the value of the attribute with the name of <code>key</code> with <code>value</code>
	*/ 
	setAttribute(key, value){
		if(this.attributes){
			let attribute = this.attributes[key];
			if(attribute){
				attribute.value = value;
				this.attributes[key] = attribute;
			}
		}		
	}

	/**
	* @function getAttribute
	* @public
	* @memberof! Entity  
	* @instance
	* @param {string} key, is the name of the attribute
	* @description returns the attribute with the name of "key"
	*/ 
	getAttribute(key){
		return this.attributes[key];
	}

	/**
	* @function getAttributeValue
	* @public
	* @memberof! Entity  
	* @instance
	* @param {string} key, is the name of the attribute
	* @description returns the value of the attribute with the name of "key"
	*/ 
	getAttributeValue(key){
		let value,
			attribute = this.attributes[key];
		if(attribute){
			value = attribute.value;
		}
		return value;
	}


	/**
	* @function getAllAttributes
	* @public
	* @memberof! Entity  
	* @instance
	* @description returns this.attributes
	*/ 	
	getAllAttributes(){
		return this.attributes;
	}

	/**
	* @function hasAllNecessaryAttributes
	* @public
	* @memberof! Entity  
	* @instance
	* @description returns true if all necessary attributes have a value
	*/ 	
	hasAllNecessaryAttributes(){
		if(!this.oneNecessaryAttributeIsUndefined()){
			return true;
		}
		return false;	
	}

	/**
	* @function oneNecessaryAttributeIsUndefined
	* @public
	* @memberof! Entity  
	* @instance
	* @description returns true if one necessary attribute has no value	
	*/
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