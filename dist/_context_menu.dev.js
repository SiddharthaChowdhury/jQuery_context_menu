var _contextMenu = function(){
	/*
		Author: SiddharthaChowdhury,
		Date: 10 Sept 2016,
		Description: https://github.com/SiddharthaChowdhury/_context-menu,
		License: GNU
	*/
	var contextBoxClass	=	 null,
		clickedOnClass 	=	 null,
		closeBtnClass 	=	 null,
		popupTargetClass=	 null,
		disableErrorLog	=	 false,
		box_position	=	 'top-right', 	//options: ['top-right', 'top-left', 'bot-right', 'bot-left']
		displacement_px =  	 [];			//[x,y]

		this.config = function(obj){
			this.contextBoxClass 		= obj.contextBoxClass || null;
			this.clickedOnClass 		= obj.clickedOnClass || null;
			this.closeBtnClass 			= obj.closeBtnClass || null;
			this.popupTargetClass 		= obj.popupTargetClass;
			this.disableErrorLog 		= obj.disableErrorLog || false;
			this.box_position 			= obj.box_position || 'top-right';
			this.displacement_px		= obj.displacement_px || [0,0];
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
					(!dis.disableErrorLog) ? console.log("Value for 'closeBtnClass' is "+dis.closeBtnClass+" (Default)." ) : console.log();
				}
				else if(  dis.closeBtnClass != null && $('.'+dis.closeBtnClass).length == '0'){
					(!dis.disableErrorLog) ? console.log("Class of closeBtnClass : "+dis.closeBtnClass+"  is not found in the DOM. (required)" ) : console.log();
					flag++;
				}
				if( dis.popupTargetClass == null ){
					(!dis.disableErrorLog) ? console.log("Value for 'popupTargetClass' is '"+dis.popupTargetClass+"' (Default)." ) : console.log();
				}
				else if(  dis.popupTargetClass != null && $('.'+dis.popupTargetClass).length == '0'){
					(!dis.disableErrorLog) ? console.log("Class of popupTargetClass : '"+dis.popupTargetClass+"' is not found in the DOM. (required)" ) : console.log();
					flag++;
				}
				if(  dis.box_position != null && (dis.box_position != 'top-right' && dis.box_position != 'top-left' && dis.box_position != 'bot-right' && dis.box_position != 'bot-left' ) ){
					(!dis.disableErrorLog) ? console.log("Invalid 'box_position' given : '"+dis.box_position+"'. Please choose between ['top-right', 'top-left', 'bot-right', 'bot-left']" ) : console.log();
					flag++;
				}

				if(  !Array.isArray(dis.displacement_px)){
					(!dis.disableErrorLog) ? console.log("Invalid 'displacement_px' given. Not an array. Example [height, width]" ) : console.log();
					flag++;
				}
				else if ( 
					Array.isArray(dis.displacement_px) &&
					!(typeof parseInt(dis.displacement_px[0]) == 'number' && (parseInt(dis.displacement_px[0]) == 0 || parseInt(dis.displacement_px[0]) % 1 == 0)) ||
					!(typeof parseInt(dis.displacement_px[1]) == 'number' && (parseInt(dis.displacement_px[1]) == 0 || parseInt(dis.displacement_px[1]) % 1 == 0))
				){
					flag++ ;
					(!dis.disableErrorLog) ? console.log("Invalid array value given for 'displacement_px'. Hint- displacement_px = [Integer, Integer]" ) : console.log();
				}
				return flag;
			}

		this.run = function(){
			if( !check_values(this) ){

				var properties = {
					contextMenu 			: $('.'+this.contextBoxClass),
					popupTargetClass 		: $('.'+this.popupTargetClass),
					popupTargetClass_str 	: '.'+this.popupTargetClass,
					clickedOnClass_str 		: '.'+this.clickedOnClass,
					closeBtnClass_str 		: '.'+this.closeBtnClass,
					contextMenu_str			: '.'+this.contextBoxClass,
					box_position			: this.box_position,
					displacement_x			: this.displacement_px[0],
					displacement_y			: this.displacement_px[1],
				};
				console.log(properties)
				properties.contextMenu.hide();			

				$('body').click(function(e){  
					var target = $(e.target); 
					if(!$(target).is(properties.clickedOnClass_str) && !target.parents(properties.contextMenu_str).length) {
					    properties.contextMenu.hide();
					}
				});

				$(document).on('click', properties.clickedOnClass_str, function(e){
					e.preventDefault();
					if ( properties.popupTargetClass_str == '.undefined'){
						properties.popupTargetClass = $(this);
					}
					
					var coord = properties.popupTargetClass.offset();
					var width = properties.popupTargetClass.outerWidth();
					var height = properties.popupTargetClass.outerHeight()+ parseInt(properties.displacement_y);
					switch(properties.box_position){
						case 'bot-left': 
								properties.contextMenu.css({top: (Math.ceil(coord.top)+parseInt(properties.displacement_y)+height), left: (Math.ceil(coord.left)+parseInt(properties.displacement_x)), position:'absolute'});
								properties.contextMenu.show()
							break;
						case 'bot-right': 
								properties.contextMenu.css({top: (Math.ceil(coord.top)+parseInt(properties.displacement_y)+height), left: (Math.ceil(coord.left)+parseInt(properties.displacement_x)+width), position:'absolute'});
								properties.contextMenu.show()
							break;
						case 'top-left': 
								properties.contextMenu.css({top: (Math.ceil(coord.top)+parseInt(properties.displacement_y)), left: (Math.ceil(coord.left)+parseInt(properties.displacement_x)), position:'absolute'});
								properties.contextMenu.show();
							break;
						default: 
								properties.contextMenu.css({top: (Math.ceil(coord.top)+parseInt(properties.displacement_y)), left: (parseInt(Math.ceil(coord.left)+parseInt(properties.displacement_x))+width) , position:'absolute'});
								properties.contextMenu.show();
							break;
					}
				});

				$(document).on('click', properties.closeBtnClass_str, function(){
					properties.contextMenu.hide();
				});
			}
		}
}