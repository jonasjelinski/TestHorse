var StartPage = StartPage || {};

 StartPage.Controlls = function(dateButtonClass, profileButtonClass){
		let that = new EventTarget(),
			backButton;

		function init(){
			initListControlls();					
		}

		function initListControlls(){
			let dateButtons = document.getElementsByClassName(dateButtonClass),
				profileButtons = document.getElementsByClassName(profileButtonClass);
			addListener(dateButtons, handleDate);
			addListener(profileButtons, handleProfile);		
		}

		function addListener(buttons, handler){
			for(let i = 0; i < buttons.length; i++){
				let button = buttons[i];
				button.addEventListener("click", handler);				
			}
		}

		function handleDate(event){
			let target = event.target,
				li = target.closest("li"),
				id = li.getAttribute("horseid");			
			sendIdEvent("onDateClick", id);
		}

		function sendIdEvent(type, id){
			let event = new Event(type);
			event.details = {};
			event.details.id = id;
			that.dispatchEvent(event);		
		}

		function handleProfile(event){
			let target = event.target,
				li = target.closest("li"),
				id = li.getAttribute("horseid");
			sendIdEvent("onProfileClick", id);
		}

		that.init = init;
		return that;
}
