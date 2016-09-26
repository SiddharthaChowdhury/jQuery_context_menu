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
			this.contextBoxClass = obj.contextBoxClass || null;
			this.clickedOnClass = obj.clickedOnClass || null;
			this.closeBtnClass = obj.closeBtnClass || null;
			this.popupBesideClass = obj.popupBesideClass;
			this.disableErrorLog = obj.disableErrorLog || false;
		}

		var check_values =  function(dis){
				var flag = 0;
				if( dis.contextBoxClass == null ){
					(!dis.disableErrorLog) ? console.log("Value for 'contextBoxClass' is "+dis.contextBoxClass+" (required)" ) : console.log();
					flag++;
				}
				else if( $('.'+dis.contextBoxClass).length == '0' ){
					(!dis.disableErrorLog) ? console.log("Class name 'contextBoxClass' is not found in the DOM.(required)" ) : console.log();
					flag++;
				}
				if( dis.clickedOnClass == null ){
					(!dis.disableErrorLog) ? console.log("Value for 'clickedOnClass' is "+dis.clickedOnClass+" (required)" ) : console.log();
					flag++;
				}
				else if( $('.'+dis.clickedOnClass).length == '0' ){
					(!dis.disableErrorLog) ? console.log("Class name 'clickedOnClass' is not found in the DOM. (required)" ) : console.log();
					flag++;
				}
				if( dis.closeBtnClass == null ){
					(!dis.disableErrorLog) ? console.log("Value for 'closeBtnClass' is "+dis.closeBtnClass+" (optional)" ) : console.log();
				}
				else if(  dis.closeBtnClass != null && $('.'+dis.closeBtnClass).length == '0'){
					(!dis.disableErrorLog) ? console.log("Class of closeBtnClass : "+dis.closeBtnClass+"  is not found in the DOM. (required)" ) : console.log();
					flag++;
				}
				if( dis.popupBesideClass == null ){
					(!dis.disableErrorLog) ? console.log("Value for 'popupBesideClass' is '"+dis.popupBesideClass+"' (optional)" ) : console.log();
				}
				else if(  dis.popupBesideClass != null && $('.'+dis.popupBesideClass).length == '0'){
					(!dis.disableErrorLog) ? console.log("Class of popupBesideClass : '"+dis.popupBesideClass+"' is not found in the DOM. (required)" ) : console.log();
					flag++;
				}
				return flag;
			}

		this.run = function(){
			if( !check_values(this) ){

				var properties = {
					contextMenu 			: $('.'+this.contextBoxClass),
					popupBesideClass 		: $('.'+this.popupBesideClass),
					popupBesideClass_str 	: '.'+this.popupBesideClass,
					clickedOnClass_str 		: '.'+this.clickedOnClass,
					closeBtnClass_str 		: '.'+this.closeBtnClass,
					contextMenu_str			: '.'+this.contextBoxClass
				};

				properties.contextMenu.hide();			

				$('body').click(function(e){  
					var target = $(e.target); 
					if(!$(target).is(properties.clickedOnClass_str) && !target.parents(properties.contextMenu_str).length) {
					    properties.contextMenu.hide();
					}
				});

				$(document).on('click', properties.clickedOnClass_str, function(e){
					e.preventDefault();
					if ( properties.popupBesideClass_str == '.undefined'){
						properties.popupBesideClass = $(this);
					}
					
					var coord = properties.popupBesideClass.offset();
					var width = properties.popupBesideClass.outerWidth()+10;
					properties.contextMenu.css({top: Math.ceil(coord.top), left: parseInt(Math.ceil(coord.left)+width), position:'absolute'});
					properties.contextMenu.show();
				});

				$(document).on('click', properties.closeBtnClass_str, function(){
					properties.contextMenu.hide();
				});
			}
		}
}