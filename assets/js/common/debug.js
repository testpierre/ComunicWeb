/**
 * Debug functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Display message on browser console
 * 
 * @param {String} message The message to show on browser console
 */
ComunicWeb.debug.logMessage = function(message){
    //We check we are not in production mode
    if(ComunicWeb.__config.productionMode != 1){
        console.log("ComunicWebApp debug message", message);
    }

    //Everything seems ok
    return 0;
};