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
		let value;
		if(attributes){
			attribute = attributes[attributeName];
			if(attribute){
				value = attribute.value;
			}
		}
		return value;
	}

	that.init = init;
	that.getAttributes = getAttributes;
	that.getValueOfAttribute = getValueOfAttribute;
	that.setAttributes = setAttributes;
	return that;
};