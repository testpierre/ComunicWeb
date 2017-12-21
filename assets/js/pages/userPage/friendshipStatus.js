/**
 * Handle the update of the friendship status
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.userPage.friendshipStatus = {

	/**
	 * Display the friendship status
	 * 
	 * @param {Integer} userID The ID of the target user
	 * @param {HTMLElement} target The target element
	 */
	display: function(userID, target){
		
		//Get the current status of the friendship
		ComunicWeb.components.friends.list.getStatus(userID, function(response){
			
			//Empty the target area
			emptyElem(target);
			target.innerHTML = "";

			//Check for errors
			if(response.error){
				message = ComunicWeb.common.messages.createCalloutElem("Error", "Couldn't load friendship informations !", "danger");
				target.appendChild(message);
				return;
			}

			//Check if the user has received a friendship request
			if(response.received_request){
				
				//Offer the user to reject a frienship request
				var rejectRequest = createElem2({
					appendTo: target,
					type: "button",
					class: "btn btn-xs btn-danger",
					innerHTML: "Reject request"
				});
				
				createElem2({
					appendTo: target,
					type: "span",
					innerHTML: " ",
				})

				//Offer the user to accept a frienship request
				var acceptRequest = createElem2({
					appendTo: target,
					type: "button",
					class: "btn btn-xs btn-success",
					innerHTML: "Accept request"
				});

				//Prepare the buttons
				acceptRequest.setAttribute("data-accept", "true");
				rejectRequest.setAttribute("data-accept", "false");

				//Setup the action
				var respondRequest = function(){

					//Lock the buttons
					acceptRequest.disabled = true;
					rejectRequest.disabled = true;

					//Get the status of the request
					var accept = this.getAttribute("data-accept") == "true";
					
					//Perform the action
					ComunicWeb.components.friends.list.respondRequest(userID, accept, function(response){
						
						//Unlock the buttons
						acceptRequest.disabled = false;
						rejectRequest.disabled = false;

						//Check for errors
						if(response.error){
							ComunicWeb.common.notificationSystem.showNotification("Couldn't update request status !", 
							"danger", 5);
						}

						else {
							//Reopen user page
							openUserPage(userID);
						}

					});
					

				}
				acceptRequest.onclick = respondRequest;
				rejectRequest.onclick = respondRequest;

			}

			//Check if user has sent a friendship request
			else if(response.sent_request){
				
				//Offer the user to cancel a frienship request
				createElem2({
					appendTo: target,
					type: "button",
					class: "btn btn-xs btn-danger",
					innerHTML: "Cancel request"
				});

			}

			//Display default message
			else {
				
				//Offer the user to send a frienship request
				createElem2({
					appendTo: target,
					type: "button",
					class: "btn btn-xs btn-primary",
					innerHTML: "Send request"
				});

			}

		});

	}

}