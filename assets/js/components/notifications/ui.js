/**
 * Notifications UI script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.notifications.ui = {

	/**
	 * Display a single notification
	 * 
	 * @param {Object} data Informations about the notification
	 * @param {HTMLElement} target The target of the notification
	 * @param {Object} users Informations about users that might be required
	 * to display the notification
	 */
	display_notification: function(data, target, users){

		//Generate the informations about the notifications
		var from_user = users["user-"+data.from_user_id];

		//Generate the appropriate string

		//Notification author
		var message = userFullName(from_user) + " ";

		//Notification action
		if(data.type == "comment_created")
			message += "posted a comment";
		
		if(data.type == "elem_created"){

			if(data.on_elem_type == "post")
				message += "created a new post";

		}
		message += " ";

		//Notification target
		if(data.from_container_type == "user_page"){

			if(data.from_container_type == "user_page"){

				if(data.from_user_id == data.from_container_id)
					message += "on his / her page";
				else
					message += "on "+userFullName(users["user-"+data.from_container_id])+"'s page";

			}

		}

		//Create notification action
		var action = function(){

			if(data.on_elem_type = "post"){

				openPage("post/" + data.on_elem_id);

			}

		};

		//Create the notification object
		var notificationContener = createElem2({
			appendTo: target,
			type: "li",
			class: "notification-contener"
		});

		//Create notification link
		var notificationLink = createElem2({
			appendTo: notificationContener,
			type: "a"
		});
		notificationLink.onclick = action;

		//Add notification left content
		var notificationLeftContent = createElem2({
			appendTo: notificationLink,
			type: "div",
			class: "pull-left"
		});

		//Add user image
		var userImage = createElem2({
			appendTo: notificationLeftContent,
			type: "img",
			src: from_user.accountImage,
			class: "img-circle"
		});


		//Add the notification message
		var notificationMessage = createElem2({
			appendTo: notificationLink,
			type: "p",
			innerHTML: message
		});

		//Add notification date
		var notificationCreationTime = createElem2({
			appendTo: notificationLink,
			type: "small",
			class: "notification-creation-time",
			innerHTML: '<i class="fa fa-clock-o"></i> ' + ComunicWeb.common.date.timeDiffToStr(data.time_create) + " ago"
		});
	},


}