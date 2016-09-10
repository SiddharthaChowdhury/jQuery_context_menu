var _contextMenu = function(){
	/*
		Author: SiddharthaChowdhury,
		Date: 10 Sept 2016,
		Description: https://github.com/SiddharthaChowdhury/_context-menu,
		License: GNU
	*/
	var contextBoxClass= null;
	var clickedOnClass= null;
	var closeBtnClass= null;
	var popupBesideClass= null;
	this.config = function(obj){
		this.contextBoxClass = obj.contextBoxClass;
		this.clickedOnClass = obj.clickedOnClass;
		this.closeBtnClass = obj.closeBtnClass;
		this.popupBesideClass = obj.popupBesideClass || obj.clickedOnClass;
	}

	this.run = function(){
		var contextMenu 		= $('.'+this.contextBoxClass),
			popupBesideClass 	= $('.'+this.popupBesideClass),
			clickedOnClass_str 	= '.'+this.clickedOnClass,
			closeBtnClass_str 	= '.'+this.closeBtnClass,
			contextMenu_str		= '.'+this.contextBoxClass; 
		$('body').click(function(e){  
			var target = $(e.target); 
			if(!$(target).is(clickedOnClass_str) && !target.parents(contextMenu_str).length) {
			    contextMenu.hide();
			}
		});

		$(document).on('click', clickedOnClass_str, function(e){
			e.preventDefault();
			var coord = popupBesideClass.offset();
			var width = popupBesideClass.outerWidth()+10;
			contextMenu.css({top: Math.ceil(coord.top), left: parseInt(Math.ceil(coord.left)+width), position:'absolute'});
			contextMenu.show();
		});

		$(document).on('click', closeBtnClass_str, function(){
			contextMenu.hide();
		})
	}
}