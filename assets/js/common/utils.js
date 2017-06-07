/**
 * Utilities functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a new HTML node
 * 
 * @param {String} nodeType The type of the HTML node
 * @param {HTMLElement} appendTo Optionnal, defines node on which the new node will be applied
 * @return {HTMLElement} The newly created element
 */
function createElem(nodeType, appendTo){
	var newElem = document.createElement(nodeType);

	if(appendTo)
		appendTo.appendChild(newElem);

	//Return result
	return newElem;
}

/**
 * Get an HTML element specified by an ID
 * 
 * @param {String} nodeName The ID of the element
 * @return {HTMLElement} The element / False for a failure
 */
function byId(nodeName){
	return document.getElementById(nodeName);
}

/**
 * Remove all nodes of a specified HTML element
 * 
 * @param {HTMLElement} container The container to empty
 * @return {Boolean} True for a success
 */
function emptyElem(container){
	//Get children references
	var children = container.childNodes;

	//Process each child
	for(i in children){
		if(children[i].remove)
			children[i].remove();
	}
		
	
	//Success
	return true;
}

/**
 * Check a given email address
 * 
 * @param {String} emailAddress The email address to check
 * @return {Boolean} True for a valid email address / false else
 */
function checkMail(emailAddress){
	return (emailAddress.match(/^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]{1,}[.][a-zA-Z]{2,5}$/) === null ? false : true);
}

/**
 * Create a formgroup element
 * 
 * @param {Object} infos Informations about the formgroup element to create
 * * @info {HTMLElement} target The target of the field
 * * @info {String} label The label of the field
 * * @info {String} placeholder The placeholder of the field
 * * @info {Boolean} checked Defines if the fields has to be checked or not (checkbox only)
 * * @info {Boolean} multiple Defines if the fields can accept more than one response
 * * @info {String} type The type of the field
 * @return {HTMLElement} The input 
 */
function createFormGroup(infos){
	//Create formgroup
	var formGroup = createElem("div", infos.target);
	formGroup.className = "form-group";

	//Add label
	var labelElem = createElem("label", formGroup);

	//Treatement differs if it is a checkbox
	if(infos.type == "checkbox"){

		//Create checkbox
		var input = createElem("input", labelElem) ;
		input.type = "checkbox";

		//Check if input has to be checked by default
		if(infos.checked){
			if(infos.checked === true){
				input.checked = "true";
			}
		}

		//Add label value
		var labelValue = createElem("span", labelElem);
		labelValue.innerHTML = " "+infos.label;

		//Enable iCheck
		$(input).iCheck({
			checkboxClass: 'icheckbox_flat-blue',
      		radioClass: 'iradio_flat-blue'
		});
	}
	else if(infos.type == "select2"){
		//In case of select2 element
		//Check for label
		if(infos.label)
			labelElem.innerHTML = infos.label;
		else
			labelElem.remove(); //Remove useless label element
		
		//Create input
		var input = createElem("select", formGroup);
		input.style.width = "100%";
		input.className = "form-control select2";
		if(infos.multiple) //For multiple changes
			input.setAttribute("multiple", "multiple");
		if(infos.placeholder) //Placeholder if required
			input.setAttribute("data-placeholder", infos.placeholder);

	}
	else {
		//Else continue the function as a normal input type
		labelElem.innerHTML = infos.label;

		//Create input group
		var inputGroup = createElem("div", formGroup);
		inputGroup.className = "input-group";
		inputGroup.style.width = "100%";

		//Create input
		var input = createElem("input", inputGroup);
		input.className = "form-control";
		input.type = infos.type;
		input.placeholder = infos.placeholder;
	}

	//Return input
	return input;
}