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
RegulardatesCreater.View = function(unitInputId, valueInputId, nameInputId, phoneInputId){
	
	let that= {},
		valueInput,
		unitInput,
		phoneInput,
		nameInput;

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
		phoneInput = document.getElementById(phoneInputId);
		nameInput = document.getElementById(nameInputId);
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

	function getName(){
		let name = nameInput.value;
		return name;
	}

	function getPhoneNumber(){
		let phone = phoneInput.value;
		return phone;
	}

	/**
	* @function getUnitAndValue
	* @public
	* @memberof! RegulardatesCreater.View
	* @instance
	* @description returns the unit e.g. "week" and the value e.g. "1"
	*/	
	function getValues() {
		let value = getDurationValue(),
			unit = getDurationUnit(),
			name = getName(),
			number = getPhoneNumber(),
			data = {
				valueRegular: value,
				unitRegular: unit,
				name: name,
				number, number,
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

	function setNameValue(value){
		nameInput.value = value;
	}

	function setPhoneValue(value){
		phoneInput.value = value;
	}
	

	that.init = init;
	that.getValues = getValues;
	that.setDurationValue = setDurationValue;
	that.setDurationUnit = setDurationUnit;
	that.setNameValue = setNameValue;
	that.setPhoneValue = setPhoneValue;
	return that;
}