/**
 * @class ChangerPage
 * @description Class <code>ChangerPage</code> changes an entity
 * @param{object} creator, instance of the Class creator
* @param{object} necessaryAttributes, necessaryAttributes define which attributes are necessary and which are optional
 */

class ChangerPage extends CreatorPage{
	constructor(creator, necessaryAttributes){
		let attributes = undefined;				
		super(attributes, creator);
		this.creator = creator;
		this.attributesConverter = new AttributesConverter(necessaryAttributes);		
	}

	/**
	* @function init
	* @public
	* @memberof! ChangerPage
	* @instance
	* @param{object} newAttributes, attributes which override the old attributes in the changer
	* @param{string} entityID, id of the entity, for example horseID or userID
	* @description Initialize this class. changes the entity with newAttributes*/ 	
	init(newAttributes, entityID){
		this.entityID = entityID;
		this.changeEntity(newAttributes);
		super.init();
	}

		/**
	* @function changeEntity
	* @public
	* @memberof! ChangerPage
	* @instance
	* @param{object} newAttributes, attributes which override the old attributes in the changer
	* @description adds the property <code>isNecessary</code> to all attributes and rests the 
	* creater with the new values. After that the creator has in its model the newAttributes.
	*/
	changeEntity(newAttributes){		
		this.attributes = this.attributesConverter.addIsNecessaryToAttributes(newAttributes);
		this.creator.resetCreator(this.attributes);
	}
} 