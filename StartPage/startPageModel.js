var StartPage = StartPage || {};

StartPage.Model = function(){
	let that = {},
		allHorses;

	function init(horses){
		allHorses = horses;
	}

	function getHorseById(id){

	}

	that.init = init;
	that.getHorseById = getHorseById;
	return that;
}