var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage.Model = function(horseId){
	let that = {},
	attributes;

	function init(newAttributes){
		attributes = newAttributes;
	}

	function getAttributes(){
		return attributes;		
	}
	
	that.init = init;
	that.getAttributes = getAttributes;
	return that;
} 