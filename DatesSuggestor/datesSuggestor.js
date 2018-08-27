var DatesSuggestor = DatesSuggestor || {};


DatesSuggestor = function(){
	"user strict";
	let that = {},
		model;

	function init(newHorse){
		model = new DatesSuggestor.Model();
		model.init(newHorse);
	}

	function getDateSuggestions(){
		model.getDateSuggestions();
	}


	that.getDateSuggestions = getDateSuggestions;
	that. init = init;
	return that;	
}