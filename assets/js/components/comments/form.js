/**
 * Comments form
 * 
 * @author Pierre HUBERT
 */
ComunicWeb.components.comments.form = {
	
	/**
	 * Display comments creation form
	 * 
	 * @param {number} postID The ID of the target post
	 * @param {HTMLElement} target The target for the form
	 */
	display: function(postID, target){
		
		//Create form contener
		var commentForm = createElem2({
			appendTo: target,
			type: "form",
			class: "comment-creation-form"
		});

		//Create input group
		var inputGroup = createElem2({
			appendTo: commentForm,
			type: "div",
			class: "input-group input-group-sm"
		});

		//Add text input
		var newCommentText = createElem2({
			appendTo: inputGroup,
			type: "input",
			elemType: "text",
			class: "form-control",
			placeholder: "New comment..."
		});

		//Add button group
		var buttonsGroup = createElem2({
			appendTo: inputGroup,
			type: "span",
			class: "input-group-btn"
		});

		//Add image pick button
		var addImageLabel = createElem2({
			appendTo: buttonsGroup,
			type: "label",
			class: "comment-image-select"
		});

		var imageFile = createElem2({
			appendTo: addImageLabel,
			type: "input",
			elemType: "file"
		});

		var imageButton = createElem2({
			appendTo: addImageLabel,
			type: "a",
			class: "btn btn-flat",
			innerHTML: "<i class='fa fa-picture-o'></i>"
		})

		//Add send button
		var sendButton = createElem2({
			appendTo: buttonsGroup,
			type: "button",
			class: "btn btn-default btn-flat",
			innerHTML: "Send"
		});

		//Catch form when submitted
		commentForm.onsubmit = function(){
			alert("Send !");
			return false;
		}
	},

}