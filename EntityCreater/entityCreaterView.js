var EntityCreater = EntityCreater || {};

EntityCreater.EntityCreaterView = function(valueBoxId, feedBackBoxId){
	let that = {},
		valueBox,
		feedBackBox;

	function init(){
		valueBox = document.getElementById(valueBoxId);
		feedBackBox = document.getElementById(feedBackBoxId);
	}

	function updateView(){
		valueBox = document.getElementById(valueBoxId);
		feedBackBox = document.getElementById(feedBackBoxId);
	}

	function getValue(){
		let property = valueBox.getAttribute("property"),
			value = valueBox.getAttribute("value"),
			data = {
				property: property, 
				value: value,
			};
		return data; 
	}

	function showHasNotEnoughValues(){
		let visible = 1;
		feedBackBox.style.opacity = visible; 
	}

	function hideHasNotEnoughValues(){
		let inVisible = 0;
		feedBackBox.style.opacity = inVisible; 
	}

	that.init = init;
	that.getValue = getValue;
	that.updateView = updateView;
	that.showHasNotEnoughValues = showHasNotEnoughValues;
	that.hideHasNotEnoughValues = hideHasNotEnoughValues;
	return that;
}