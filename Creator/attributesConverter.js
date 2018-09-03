/**
 * @class AttributesConverter
 * @description Class <code>AttributesConverter</code> converts attributes
 * @param{object} creator, instance of the Class creator
 * @param{object} necessaryAttributes, necessaryAttributes define which attributes are necessary and which are optional
 * @description To create an entity the EntiyCreator modul needs an object which constits of attributes
 * with properties of value und isNecessary. Other moduls can't work with this object so isNecessary has to be remove.
 * The <code>AttributesConverter</code> converts the attributes in the correct form
 */

class AttributesConverter{
	constructor(necessaryAttributes){
		this.necessaryAttributes = necessaryAttributes;		
	}

	/**
	* @function addIsNecessaryToAttributes
	* @public
	* @memberof! AttributesConverter
	* @instance
	* @param{object} attributes, attributes which have to be changed
	* @description changes the attributes so the entityCreator can use them
	*/ 	
	addIsNecessaryToAttributes(attributes){
		let attributesWithNecessary = {},
			that = this,
			attributeNames = Object.keys(attributes);		
		attributeNames.forEach( function (name){		
			attributesWithNecessary[name] = that.createNewAttribute(attributes, name);
		});
		return attributesWithNecessary;		
	}

	/**
	* @function createNewAttribute
	* @public
	* @memberof! AttributesConverter
	* @instance
	* @param{object} attributes, attributes which have to be changed
	* @param{string} name, attributes which have to be changed
	* @description creates a new object containing isNecessary
	* if the name of the attribute is in the array of necessary attributes 
	*/ 	
	createNewAttribute(attributes, name){
		let value = attributes[name],
			isNecessary = this.necessaryAttributes.includes(name),
			newAttribute = {
				 value: value,
				isNecessary: isNecessary,
			};
		return newAttribute;
	}


	/**
	* @function removeIsNecessaryFromAttributes
	* @public
	* @memberof! AttributesConverter
	* @instance
	* @param{object} attributes, attributes which have to be changed
	* @description changes the attributes so the other moduls as entityCreator can use them
	*/ 
	removeIsNecessaryFromAttributes(attributes){
		let attributesWithoutIsNecessary = {},
			attributeNames = Object.keys(attributes);
			attributeNames.forEach( function (name){
				let attribute = attributes[name],
					value = attribute.value;
					if(value === undefined){
						value = "";
					}
				attributesWithoutIsNecessary[name] = value;
			});
		return attributesWithoutIsNecessary;
	}
}