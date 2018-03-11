/**
 * Friend user interface script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.ui = {

	/**
	 * Display a single friend informations
	 * 
	 * @param {HTMLElement} target The target to display the friend
	 * @param {Object} friend Informations about the friendship
	 * @param {Object} user Informations about the user
	 */
	show_personnal_friend: function(target, friend, user){

		//Create friend contener, if required
		if(target.className == "friend"){
			var friendContener = target;
			emptyElem(friendContener);
		}
		else
			var friendContener = createElem2({
				appendTo: target,
				type: "div",
				class: "friend"
			});

		//Get informations about the friend
		const friendID = friend.ID_friend;

		//Create user link
		const userLink = createElem2({
			appendTo: friendContener,
			type: "a"
		});

		//Add user account image
		createElem2({
			appendTo: userLink,
			type: "img",
			src: user.accountImage
		});

		//Add users name
		createElem2({
			appendTo: userLink,
			type: "div",
			class: "friends-name",
			innerHTML: userFullName(user)
		});

		//Make the link button lives
		userLink.onclick = function(){
			
			//Open user page
			openUserPage(userIDorPath(user));

			//Close all modals
			$(".modal").modal("hide");

		}

		//Check if the friendship has been accepted or not
		if(friend.accepted == 0){

			//Offer the user to accept or reject friendship request
			//Reject
			var rejectRequestBtn = createElem2({
				appendTo: friendContener,
				type: "input",
				elemType: "button",
				class: "btn btn-danger",
				value: "Refuser"
			});
			rejectRequestBtn.setAttribute("data-accept-request", "false");
			
			add_space(friendContener);

			//Accept
			var acceptRequestBtn = createElem2({
				appendTo: friendContener,
				type: "button",
				class: "btn btn-success",
				innerHTML: "Accepter"
			});
			acceptRequestBtn.setAttribute("data-accept-request", "true");

			add_space(friendContener);

			//Make the buttons lives
			var respond = function(){
				
				//Check whether the request was accepted or not
				var accept = this.getAttribute("data-accept-request") == "true";

				//Perform the request on the server
				ComunicWeb.components.friends.list.respondRequest(friendID, accept, function(r){

					//Check for error
					if(r.error){
						ComunicWeb.common.notificationSystem.showNotification("Could not respond to request !", "danger");
						return;
					}

					if(!accept){
						friendContener.remove();
					}
					else {

						//Display again the friend
						friend.accepted = 1;
						ComunicWeb.components.friends.ui.show_personnal_friend(friendContener, friend, user);
					}

				});

			};
			
			acceptRequestBtn.onclick = respond;
			rejectRequestBtn.onclick = respond;
		}

		else {

			//Display following state

			//Check if the user can post text on user page
		}

		

		//Offer to delete friendship
		const deleteLink = createElem2({
			appendTo: friendContener,
			type: "a",
			innerHTML: "<i class='fa fa-trash'></i>"
		});

		//Make the delete button lives
		deleteLink.onclick = function(){

			//Prompt user confirmation
			if(ComunicWeb.common.messages.confirm("Do you really want to delete this user from your friends list ?", function(confirm){
				
				//Check if the user cancelled the operation
				if(!confirm)
					return;
				
				//Try to delete the friend from the list
				friendContener.style.visibility = "hidden";
				ComunicWeb.components.friends.interface.remove_friend(friendID, function(result){

					//Make friend contener visible
					friendContener.style.visibility = "visible";

					//Check for errors
					if(result.error){
						ComunicWeb.common.notificationSystem.showNotification("Could not delete friend !", "danger");
						return;
					}

					//Delete the element
					friendContener.remove();

				});

			}));
		}

	}

}