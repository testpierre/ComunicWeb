/**
 * Messages functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a callout element and return it
 * 
 * @param {String} calloutTitle The title of the callout
 * @param {String} calloutMessage The message of the callout
 * @param {String} calloutType The type of the callout (danger, info, warning, success)
 */
ComunicWeb.common.messages.createCalloutElem = function(calloutTitle, calloutMessage, calloutType){
    //Prepare callout message
    calloutMessage = "<p>" + calloutMessage + "</p>";
    
    //By default, it is an info callout
    if(!calloutType)
        var calloutType = "info";

    //Create callout main contener
    var calloutElem = document.createElement('div');
    calloutElem.className = "callout callout-" + calloutType;

    //Add title
    var calloutTitleElem = document.createElement("h4");
    calloutTitleElem.innerHTML =  calloutTitle;
    calloutElem.appendChild(calloutTitleElem)

    //Add callout body
    var calloutBody = document.createElement("div");
    calloutBody.innerHTML = calloutMessage;
    calloutElem.appendChild(calloutBody);

    //Return created element
    return calloutElem;
}

/**
 * Create a confirmation dialog
 * 
 * @param {string} message The confirmation message
 * @param {function} callback What to do once the user has made is choice
 * The function must includes one parameters which is a boolean.
 * - TRUE if the user accepted the action
 * - FALSE if the user decided to cancel it
 */
ComunicWeb.common.messages.confirm = function(message, callback){

    //Create a modal root
    var modal = createElem2({
        type: "div",
        class: "modal modal-danger confirm-modal"
    });

    var modalDialog = createElem2({
        appendTo: modal,
        type: "div",
        class: "modal-dialog"
    });

    var modalContent = createElem2({
        appendTo: modalDialog,
        type: "div",
        class: "modal-content",
    });

    //Modal header
    var modalHeader = createElem2({
        appendTo: modalContent,
        type: "div",
        class: "modal-header"
    });

    var closeModal = createElem2({
        appendTo: modalHeader,
        type: "button",
        class: "close",
    });
    closeModal.setAttribute("data-confirm", "false");

    createElem2({
        appendTo: closeModal,
        type: "span",
        innerHTML: "x"
    });

    var modalTitle = createElem2({
        appendTo: modalHeader,
        type: "h4",
        class: "modal-title",
        innerHTML: "Confirm the operation"
    });

    //Modal body
    var modalBody = createElem2({
        appendTo: modalContent,
        type: "div",
        class: "modal-body",
        innerHTML: "<p>"+message+"</p>"
    });

    //Modal footer
    var modalFooter = createElem2({
        appendTo: modalContent,
        type: "div",
        class: "modal-footer"
    });

    var cancelButton = createElem2({
        appendTo: modalFooter,
        type: "button",
        class: "btn btn-default pull-left",
        innerHTML: "Cancel"
    });
    cancelButton.setAttribute("data-confirm", "false");

    var confirmButton = createElem2({
        appendTo: modalFooter,
        type: "button",
        class: "btn btn-danger",
        innerHTML: "Confirm"
    });
    confirmButton.setAttribute("data-confirm", "true");

    //Create the response function
    var respond = function(){

        //Check if the operation was confirmed or not
        var accept = this.getAttribute("data-confirm") == "true";

        //Close modal
        $(modal).modal('hide');
        emptyElem(modal);
        modal.remove();

        //Call callback
        callback(accept);
    }

    //Make the buttons live
    cancelButton.onclick = respond;
    confirmButton.onclick = respond;
    closeModal.onclick = respond;

    //Show the modal
    $(modal).modal('show');

}