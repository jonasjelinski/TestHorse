var EntityCreator = EntityCreator || {};

/**
 * @namespace EntityCreator.EntityCreatorView
 * @memberOf! EntityCreator
 * @param {string} valueBoxId, id of the valueBox, is used to get the dom element document.getElementById 
 * @param {string} feedBackBoxId, id of the feedbackBox, is used to get the dom element document.getElementById 
 * @description This modul <code>EntityCreatorView</code> is the viewControll modul of EntityCreator*/

EntityCreator.EntityCreatorView = function(valueBoxId, feedBackBoxId){
	let that = {},
		valueBox,
		feedBackBox;

	/**
	* @function init
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description Initialize this model. Gets the domElement valueBox and feedbackBox
	* valueBox contains a value and a property. property describes the name of an attribute
	* value is the value of the attribute.
	* feedBackBox shows the user feedbackmessages
	*/ 
	function init(){
		valueBox = document.getElementById(valueBoxId);
		feedBackBox = document.getElementById(feedBackBoxId);
	}


	/**
	* @function getValue
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description Returns the values of "value" and "property" of the feedbackbox
	* those values are uses to create a new attribute in other moduls
	*/ 
	function getValue(){
		let property = valueBox.getAttribute("property"),
			value = valueBox.getAttribute("value"),
			data = {
				property: property, 
				value: value,
			};
		return data; 
	}

	/**
	* @function showHasNotEnoughValues
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description sets the feedBackBox visible
	* is used to give the user feedback that he didnt put in enoguh values for creating a new entity
	*/ 
	function showHasNotEnoughValues(){
		let visible = 1;
		feedBackBox.style.opacity = visible; 
	}

	/**
	* @function hideHasNotEnoughValues
	* @public
	* @memberof! EntityCreator.EntityCreatorModel
	* @instance
	* @description sets the feedBackBox invisible
	*/ 
	function hideHasNotEnoughValues(){
		let inVisible = 0;
		feedBackBox.style.opacity = inVisible; 
	}

	that.init = init;
	that.getValue = getValue;
	that.showHasNotEnoughValues = showHasNotEnoughValues;
	that.hideHasNotEnoughValues = hideHasNotEnoughValues;
	return that;
}