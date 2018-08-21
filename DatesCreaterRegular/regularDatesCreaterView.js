var RegulardatesCreater = RegulardatesCreater || {};

/**
 * @instance RegulardatesCreater.View
 * @memberof! RegulardatesCreatorPage 
 * @param {string} dropDownMenuId. Id of the dropDownMenu
 * @param {string} unitInputId. Id of the unit input
 * @description Modul <code>RegulardatesCreater.View</code> is the view to create a regular date.
 * it contains a domELement to select the unit od the regular date and one for the value of the duration
 * e.g. "1" && week"
 */
RegulardatesCreater.View = function(unitInputId, valueInputId){
	
	let that= {},
		valueInput,
		unitInput;

	/**
	* @function init
	* @public
	* @memberof! RegulardatesCreater.View
	* @instance
	* @description Initialize this modul.
	*/
	function init(){
		unitInput = document.getElementsByTagName("select")[0];
		valueInput = document.getElementById(valueInputId);
	}

	/**
	* @function getDurationValue
	* @private
	* @memberof! RegulardatesCreater.View
	* @instance
	* @description returns the value e.g. "1"
	*/	
	function getDurationValue(){
		let value = valueInput.value;	
		return value;
	}

	/**
	* @function getDurationValue
	* @private
	* @memberof! RegulardatesCreater.View
	* @instance
	* @description returns the unit e.g. "week" 
	*/	
	function getDurationUnit() {
		let unit = unitInput.value;
		return unit;
	}

	/**
	* @function getUnitAndValue
	* @public
	* @memberof! RegulardatesCreater.View
	* @instance
	* @description returns the unit e.g. "week" and the value e.g. "1"
	*/	
	function getUnitAndValue() {
		let value = getDurationValue(),
			unit = getDurationUnit(),
			data = {
				value: value,
				unit: unit,
			};
		return data;
	}

	/**
	* @function setDurationUnit
	* @public
	* @memberof! RegulardatesCreater.View
	* @instance
	* @param {"string"}, value to set
	* @description sets the unitInput to value
	*/	
	function setDurationUnit(value) {
		unitInput.value = value;
	}

	/**
	* @function setDurationValue
	* @public
	* @memberof! RegulardatesCreater.View
	* @instance
	* @param {"string"}, value to set
	* @description sets the value to value
	*/
	function setDurationValue(value) {
		valueInput.value = value;
	}
	

	that.init = init;
	that.getUnitAndValue = getUnitAndValue;
	that.setDurationValue = setDurationValue;
	that.setDurationUnit = setDurationUnit;
	return that;
}