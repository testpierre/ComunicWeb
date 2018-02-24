/**
 * List of unread conversations dropdown
 * 
 * @author Pierre HUERT
 */

ComunicWeb.components.conversations.unreadDropdown = {

	/**
	 * Display unread conversations dropdown
	 * 
	 * @param {HTMLElement} target The target of the conversations dropdown
	 * @return {HTMLElement} The HTML element that contains the number of unread conversations
	 */
	display_dropdown: function(target){

		//Create the button
		var dropdown = createElem2({
			appendTo: target,
			type: "li",
			class: "dropdown messages-menu"
		});

		//Add dropdown toggle
		var dropdownToggle = createElem2({
			appendTo: dropdown,
			type: "a",
			class: "dropdown-toggle",
			href: "#",
			innerHTML: '<i class="fa fa-comments-o"></i>'
		});
		dropdownToggle.setAttribute("data-toggle", "dropdown");

		//Add conversations number
		var conversationsNumber = createElem2({
			appendTo: dropdownToggle,
			type: "span",
			class: "label label-danger",
			innerHTML: "0"
		});

		//Add dropdown menu
		var dropdownMenu = createElem2({
			appendTo: dropdown,
			type: "ul",
			class: "dropdown-menu"
		});

		//Add dropdown header
		var dropdownHeader = createElem2({
			appendTo: dropdownMenu,
			type: "li",
			class: "header",
			innerHTML: "Unread conversations"
		});

		//Add conversations list
		var conversationsListContener = createElem2({
			appendTo: dropdownMenu,
			type: "li"
		});
		var conversationsList = createElem2({
			appendTo: conversationsListContener,
			type: "ul",
			class: "menu"
		});

		//Add dropdown bottom
		var dropdownBottom = createElem2({
			appendTo: dropdownMenu,
			type: "li",
			class: "footer"
		});

		//Add a button to offer the user to delete all his conversations
		var openConversations = createElem2({
			appendTo: dropdownBottom,
			type: "a",
			href: "#",
			innerHTML: " "
		});

		//Enable slimscroll
		$(conversationsList).slimScroll({
			height: '100%'
		});

		//Refresh the unread conversations list if the user click the dropdown button
		dropdownToggle.onclick = function(){
			ComunicWeb.components.conversations.dropdown.refresh_list_conversations(conversationsList);
		}
		
		//Return the number of conversations target
		return conversationsNumber;
	},

}