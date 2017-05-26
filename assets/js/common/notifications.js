/**
 * Notification system
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.notificationSystem = {

	/**
	 * Display a notification
	 * 
	 * @param {String} message The message to show on the screen
	 * @param {String} notifType Specify the notification type (info, danger, success, warning)
	 * @param {Integer} notifDuration Optionnal, specify how much time the message will appear in seconds
	 * @param {String} notifTitle The title of the notification
	 */
	showNotification: function(message, notifType, notifDuration, notifTitle){
		
		//Check if a notification type was specified
		if(!notifType){
			notifType = "info";
		}

		//Check if a notification duration was specified
		if(!notifDuration){
			notifDuration = 4;
		}

		//Prepare options
		var options = {
			message: message,
		};

		//Check if any notification title was specified
		if(notifTitle){
			options.title = notifTitle;
		}
		
		$.notify(options,{
			// settings
			type: notifType,
			timer: notifDuration*1000,
		});
	}

}