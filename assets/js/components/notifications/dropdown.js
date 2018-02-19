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
			class: "dropdown messages-menu"
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
		var notificationsListContener = createElem2({
			appendTo: dropdownMenu,
			type: "li"
		});
		var notificationsList = createElem2({
			appendTo: notificationsListContener,
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
	refresh_list: function(list){

		//Perform a request on the API
		ComunicWeb.components.notifications.interface.get_list_unread(function(result){

			//Check for errors
			if(result.error){
				ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to retrieve notifications list !", "danger");
				return;
			}

			//Get the list of required users informations
			var users_id = ComunicWeb.components.notifications.utils.get_users_id(result);
			
			//Get informations about the users
			ComunicWeb.user.userInfos.getMultipleUsersInfos(users_id, function(users){

				//Check for errors
				if(users.error){
					ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to retrieve users informations for the notifications !", "danger");
					return;
				}


				//Empty the target list
				list.innerHTML = "";

				//Process the list of notifications
				for (let i = 0; i < result.length; i++) {
					const notification = result[i];
					
					//Display the notification
					ComunicWeb.components.notifications.ui.display_notification(notification, list, users);
				}

			}, false);
			

		});

	},

}