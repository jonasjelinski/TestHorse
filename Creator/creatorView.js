class CreatorView extends EventTarget{
	
	constructor(valueBoxId, inputId){
		super();
		this.valueBoxId = valueBoxId;
		this.inputId = inputId;
	} 

	init(){
		this.getDomElements();
		this.addListeners();
	}	

	getDomElements() {
		this.valueBox = document.getElementById(this.valueBoxId);
		this.input = document.getElementById(this.inputId);		
	}

	addListeners() {
		this.input.addEventListener("input", this.changeValueBox.bind(this));
	}

	changeValueBox() {		
		let text = this.input.value;
		this.valueBox.setAttribute("value", text);
	}

	setInputValue(inputValue) {
		this.input.value = inputValue;
	}

	setValueBox(value){
		this.valueBox.setAttribute("value", value);
	}

	getCurrentAttribute(){
		let attribute = this.valueBox.getAttribute("property");
		return attribute;
	}

	update() {
		this.init();
	}
};