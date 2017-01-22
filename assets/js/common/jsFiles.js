/**
 * Operations of Javascript files
 * 
 * @author Pierre HUBERT
 */

/**
 * Include a Javascript file
 * 
 * @param {String} fileURL The file URL
 * @return {Boolean} False if it fails
 */
ComunicWeb.common.jsFiles.includeFile = function(fileURL){
    var fileElem = document.createElement("script");
    fileElem.type = "text/javascript";
    fileElem.src = fileURL;

    //Append the new element
    document.body.appendChild(fileElem);

    //Debug message
    ComunicWeb.debug.logMessage("Added JS file " + fileURL);

    //Everything is OK
    return true;
}

/**
 * Execute some source code contained in a variable
 * 
 * @param {String} source The source code to execute
 */
ComunicWeb.common.jsFiles.executeJSsource = function(source){
    var jsSourceContainer = document.createElement("script");
    jsSourceContainer.innerHTML = source;
    document.body.appendChild(jsSourceContainer);
}
