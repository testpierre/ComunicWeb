/**
 * Discussions windows manager
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.discussions.windows = {

	/**
	 * Create a new conversation window
	 * 
	 * @param {HTMLElement} nodeBefore The node before the destination window
	 * @return {Object} Differents elements of the window
	 */
	create: function(nodeBefore){
		//Create listbox element
		var discussionBox = createElem("div", nodeBefore.parentNode);
		discussionBox.className = "box box-primary";

		//Create close box function
		var closeBox = function(){
			discussionBox.remove();
		}

		//Create box header
		var boxHeader = createElem("div", discussionBox);
		boxHeader.className = "box-header with-border";

		//Add box title
		var boxTitle = createElem("h3", boxHeader);
		boxTitle.className = "box-title";
		

		//Box tools
		var boxTools = createElem("div", boxHeader);
		boxTools.className = "box-tools pull-right";

		//Close button
		var closeButton = createElem("button", boxTools);
		closeButton.className = "btn btn-box-tool";
		closeButton.onclick = closeBox;
		
			//Close icon
			var closeIcon = createElem("i", closeButton);
			closeIcon.className = "fa fa-times";
		
		//Box body
		var boxBody = createElem("div", discussionBox);
		boxBody.className = "box-body";

		//Box footer
		var boxFooter = createElem("div", discussionBox);
		boxFooter.className = "box-footer";

		//Prepare return
		var boxElements ={
			rootElem: discussionBox,
			closeFunction: closeBox,
			boxTitle: boxTitle,
			boxTools: boxTools,
			boxBody: boxBody,
			boxFooter: boxFooter,
		};

		//Return elements
		return boxElements;
	}

}