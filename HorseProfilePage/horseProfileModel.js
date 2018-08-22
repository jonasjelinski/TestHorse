var HorseProfilePage = HorseProfilePage || {};

/** 
 * namespace HorseProfilePage.Model 
 * @memberof! HorseProfilePage
 * @description contains the attributes of the horse.
 */
HorseProfilePage.Model = function(){
	let that = {},
	attributes;


	/**
	* @function init
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @param{object}, newAttributes, attributes of the horse
	* @description Initialize this model
	*/ 
	function init(newAttributes){
		attributes = newAttributes;
	}

	/**
	* @function getAttributes
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @description returns attributes
	*/ 
	function getAttributes(){
		return attributes;		
	}

	/**
	* @function getHorseId
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @description returns the id of the horse
	*/ 
	function getHorseId() {
		return attributes.id;
	}
	
	that.init = init;
	that.getAttributes = getAttributes;
	that.getHorseId = getHorseId;
	return that;
} 