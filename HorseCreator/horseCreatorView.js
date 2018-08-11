var HorseCreator = HorseCreator || {};

HorseCreator.HorseCreatorView = function(valueBoxId, inputId){
	let that = new EventTarget(),
		valueBox,
		input;

	function init(){
		getDomElements();
		addListeners();
	}

	function update() {
		init();
	}

	function getDomElements() {
		valueBox = document.getElementById(valueBoxId);
		input = document.getElementById(inputId);		
	}

	function addListeners() {
		input.addEventListener("input", changeValueBox);
	}

	function changeValueBox() {		
		let text = input.value;
		valueBox.setAttribute("value", text);
	}

	function setInputValue(inputValue) {
		input.value = inputValue;
	}

	function setValueBox(value){
		valueBox.setAttribute("value", value);
	}

	function getCurrentAttribute(){
		let attribute = valueBox.getAttribute("property");
		return attribute;
	}

	that.init = init;
	that.update = update;
	that.getCurrentAttribute = getCurrentAttribute;
	that.setInputValue = setInputValue;
	that.setValueBox = setValueBox;
	return that;
};