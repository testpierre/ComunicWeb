/**
 * URL functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.url = {
    /**
     * Return current URL opened on the website
     * 
     * @return {String} The URL opened on the website
     */
    getCurrentWebsiteURL: function(){
        //Retrieve website URL
        var websiteURL = location.href;
        
        //Extract the URI part for the app
        var uripage = websiteURL.replace(ComunicWeb.__config.siteURL, "");

        //Return result
        return uripage;
    },
};