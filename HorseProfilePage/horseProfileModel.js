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

	function getHorseId() {
		return attributes.id;
	}
	
	that.init = init;
	that.getAttributes = getAttributes;
	that.getHorseId = getHorseId;
	return that;
} 