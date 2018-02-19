/**
 * Notifications menu bar dropdown
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.notifications.dropdown = {

	/**
	 * Display notifications dropdown
	 * 
	 * @param {HTMLElement} target The target of the notification dropdown
	 */
	display: function(target){

		//Create the button
		var dropdown = createElem2({
			appendTo: target,
			type: "li",
			class: "dropdown notifications-menu"
		});

		//Add dropdown toggle
		var dropdownToggle = createElem2({
			appendTo: dropdown,
			type: "a",
			class: "dropdown-toggle",
			href: "#",
			innerHTML: '<i class="fa fa-bell-o"></i>'
		});
		dropdownToggle.setAttribute("data-toggle", "dropdown");

		//Add notification number
		var notificationsNumber = createElem2({
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
			innerHTML: "Notifications"
		});

		//Add notifications list
		var notificationsList = createElem2({
			appendTo: dropdownMenu,
			type: "ul",
			class: "menu"
		});

		//Enable slimscroll
		$(notificationsList).slimScroll({
			height: '100%'
		});

		//Initialize service
		ComunicWeb.components.notifications.service.init(notificationsNumber, true);

		//Refresh the notifications list if the user click the dropdown button
		dropdownToggle.onclick = function(){

			ComunicWeb.components.notifications.dropdown.refresh_list(notificationsList);

		}
		
	},

	/**
	 * Refresh the list of notifications
	 * 
	 * @param {HTMLElement} list The notifications list to refresh
	 */
	refresh: function(list){

		//Perform a request on the database

	},
}