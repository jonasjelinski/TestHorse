var CreatorModel = function(newAttributes){

	let that = new EventTarget(),
		attributes;

	function init() {
		attributes = newAttributes;	
	}	

	function getAttributes(){
		return attributes;	
	}

	function getValueOfAttribute(attributeName){
		let value,
			attribute = attributes[attributeName];
			if(attribute){
				value = attribute.value;
			}
			return value;
	}

	that.init = init;
	that.getAttributes = getAttributes;
	that.getValueOfAttribute = getValueOfAttribute;
	return that;
};