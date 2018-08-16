var RegulardatesCreater = RegulardatesCreater || {};

RegulardatesCreater.View = function(dropDownMenuId, unitInputId){
	
	let that= {},
		valueInput,
		unitInput;

	function init(){
		unitInput = document.getElementsByTagName("select")[0];
		valueInput = document.getElementById(unitInputId);
	}
	
	function getDurationValue(){
		let value = valueInput.value;	
		return value;
	}

	function getDurationUnit() {
		let unit = unitInput.value;
		return unit;
	}

	function getUnitAndValue() {
		let value = getDurationValue(),
			unit = getDurationUnit(),
			data = {
				value: value,
				unit: unit,
			};
		return data;
	}

	function setDurationUnit(value) {
		unitInput.value = value;
	}

	function setDurationValue(value) {
		valueInput.value = value;
	}
	

	that.init = init;
	that.getUnitAndValue = getUnitAndValue;
	that.setDurationValue = setDurationValue;
	that.setDurationUnit = setDurationUnit;
	return that;
}