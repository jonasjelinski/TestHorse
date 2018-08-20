var CreatorModel = CreatorModel || {};

/**
 * @class CreatorModel
 * @description <code>CreatorModel</code> is the model for Creator 
 * @param {object} newAttributes. Attributes of the Creator.
 */


var CreatorModel = function(newAttributes){

	let that = {},
		attributes;

	/**
	* @function init
	* @public
	* @memberof! Creator
	* @instance
	* @description Initialize this modul.
	*/
	function init() {
		if(newAttributes){
			attributes = newAttributes;	
		}		
	}

	/**
	* @function getAttributes
	* @public
	* @memberof! Creator
	* @instance
	* @description returns attributes
	*/
	function getAttributes(){
		return attributes;	
	}

	/**
	* @function setAttributes
	* @public
	* @memberof! Creator
	* @instance
	* @param{object} attr, new attributes
	* @description sets attributes
	*/
	function setAttributes(attr){
		attributes = attr;
	}

	/**
	* @function getValueOfAttribute
	* @public
	* @memberof! Creator
	* @instance
	* @param{string} attributeName, name of the attribute
	* @description returns the value ofht attribute with the name attributeName
	*/
	function getValueOfAttribute(attributeName){
		let value,
			attribute =getAttribute(attributeName);
			if(attribute){
				value = attribute.value;
			}
		return value;
	}

	/**
	* @function setAttributeValue
	* @public
	* @memberof! Creator
	* @instance
	* @param{string} attributeName, name of the attribute
	* @param{string} value, 
	* @description returns the value ofht attribute with the name attributeName
	*/
	function setAttributeValue(attributeName, value){
		let attribute = getAttribute(attributeName);
		if(attribute){
			attribute.value = value;
		}
	}

	function getAttribute(attributeName){
		let attribute;
		if(attributes){
			attribute = attributes[attributeName];
		}
		return attribute;
	}

	that.init = init;
	that.setAttributeValue = setAttributeValue;
	that.getAttributes = getAttributes;
	that.getValueOfAttribute = getValueOfAttribute;
	that.setAttributes = setAttributes;
	return that;
};