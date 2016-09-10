# _context-menu
A very simple, light, flexible and most dynamic context menu on web. Bind your mouse click events ( right click / left click) on any clickable element on your page. (It supports context-menu popup on **DYNAMICALLY created elements**).

**Prerequisite**

1.  Only Jquery

**Syntax**

      $(function(){
                                                     // When document is ready
	    var x = new _contextMenu();              // Create instance of _context_menu
	    x.config({                               // Configure the new context menu
		contextBoxClass : 'context-menu1',
		clickedOnClass : 'class name',
		closeBtnClass : 'className',
		// popupBesideClass : 'className',
		// disableErrorLog: true
	    })
	    x.run();                                 // initiate the newly created context menu
      });

