var CreatorModel = function(newAttributes){

	let that = {},
		attributes;

	function init() {
		if(newAttributes){
			attributes = newAttributes;	
		}		
	}	

	function getAttributes(){
		return attributes;	
	}

	function setAttributes(attr){
		attributes = attr;
	}

	function getValueOfAttribute(attributeName){
		let value,
			attribute =getAttribute(attributeName);
			if(attribute){
				value = attribute.value;
			}
		return value;
	}

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