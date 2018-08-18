var StartPage = StartPage || {};

StartPage.Model = function(){
	let that = new EventTarget(),
		allHorses;

	function init(horses){
		allHorses = JSON.parse(horses);
		console.log("allHorses",horses);
		sendOnDataConverted();
	}

	function getHorseById(id){

	}

	function sendOnDataConverted(){
			let event = new Event("onDataConverted");
			event.details = {};
			event.details.allHorses = allHorses;
			that.dispatchEvent(event);
		}

	that.init = init;
	that.getHorseById = getHorseById;
	return that;
}