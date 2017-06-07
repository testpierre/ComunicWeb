/**
 * Conversations windows manager
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.windows = {

	/**
	 * Create a new conversation window
	 * 
	 * @param {HTMLElement} nodeBefore The node before the destination window
	 * @return {Object} Differents elements of the window
	 */
	create: function(nodeBefore){
		//Create listbox element
		var conversationBox = createElem("div", nodeBefore.parentNode);
		conversationBox.className = "box box-primary";

		//Create close box function
		var closeBox = function(){
			conversationBox.remove();
		}

		//Create box header
		var boxHeader = createElem("div", conversationBox);
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
		var boxBody = createElem("div", conversationBox);
		boxBody.className = "box-body";

		//Box footer
		var boxFooter = createElem("div", conversationBox);
		boxFooter.className = "box-footer";

		//Prepare return
		var boxElements ={
			rootElem: conversationBox,
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