var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage.RegularDatesPageControll = function(deleteButtonClass, changeButtonClass, backButtonId){
		let that = new EventTarget(),
			backButton;

		function init(){
			initListControlls();			
		}

		function initListControlls(){
			let delteButtons = document.getElementByClassName(deleteButtonClass),
				changeButtons = document.getElementByClassName(changeButtonClass);
			addDeleteListener(delteButtons, handleDelete);
			addChangeListener(changeButtons, handleChange);		
		}

		function addListener(buttons, handler){
			for(let i = 0; i < buttons.length; i++){
				let button = buttons[i];
				button.addEventListener("click", handler);
			}
		}

		function handleDelete(event){
			let target = event.target,
				li = target.closest("li"),
				id = li.RegularDatesId;
			sendIdEvent("onDelteClick", id);
		}

		function sendIdEvent(type, id){
			let event = new Event(type);
			event.details = {};
			event.details.id = id;
		}

		function handleChange(event){
			let target = event.target,
				li = target.closest("li"),
				id = li.RegularDatesId;
			sendIdEvent("onChangeClick", id);
		}

		function initBackButtonControlls(){
			backButton = document.getElementById(backButtonId);
			backButton.addEventListener("click", handleBack)
		}

		function handleBack(){
			let event = new Event("onBackButtonClicked");
			that.dispatchEvent(event);
		}

		that.init = init;
		return that;
}
