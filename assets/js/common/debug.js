/**
 * Debug functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.debug = {

    /**
     * @var {Object} Internal log variable
     */
    __log: {},

    /**
     * Display message on browser console
     * 
     * @param {String} message The message to show on browser console
     */
    logMessage: function(message){
        //We check we are not in production mode
        if(ComunicWeb.__config.productionMode != true){
            console.log("ComunicWebApp debug message", message);
        }

        //Save log message
        this.saveLogMessage(message);

        //Everything seems ok
        return 0;
    },

    /**
     * Save a new log message
     * 
     * @param {String} message The message to store
     */
    saveLogMessage: function(message){
        //Get current timestamp
        var timeStamp = new Date().getTime();

        //Get a random number for log ID
        var logElemId = Math.random();

        //Save the new message
        this.__log[logElemId] = {
            timeStamp: timeStamp,
            message: message,
        }

        //Everything seems to be OK
        return 0;
    },

    /**
     * Get log content into a String
     * 
     * @return {String} The log parsed into strings
     */
    getLogContent: function(){
        //Prepare return
        var logString = "---ComunicWebApp v"+ComunicWeb.__config.appVersion+" ---\n";

        //Process each line of the log
        for(i in this.__log){
            logString += i + " \t " + this.__log[i].timeStamp + " \t " + this.__log[i].message + "\n";
        }

        //Return result
        return logString;
    },


    /**
     * Display Comunic Logo on the developper console
     * 
     * @return {Boolean} True for a success
     */
    displayComunicLogo: function(){
        //Prepare message
        var message = "                          \n";
        message += "                          \n";
        message += "   ====================   \n";
        message += "   ====================   \n";
        message += "   ====================   \n";
        message += "   ========               \n";
        message += "   ========               \n";
        message += "   ========               \n";
        message += "   ========               \n";
        message += "   ========               \n";
        message += "   ========               \n";
        message += "   ====================   \n";
        message += "   ====================   \n";
        message += "   ====================   \n";
        message += "                          \n";
        message += "     ComunicWeb  2.0      \n";
        message += "                          \n";
        message += "          v"+ComunicWeb.__config.appVersion+"          \n";
        message += "                          \n";

        //Display message
        console.log(message);
    }
}
