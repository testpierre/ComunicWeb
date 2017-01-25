/**
 * Network functions
 * 
 * @author Pierre HUBERT
 */


ComunicWeb.network = {

    /**
     * @var {object} Cache contener
     */
    cache: {},

    /**
     * Make a GET request
     * 
     * @param {String} url Destination URL
     * @param {Boolean} cache Specify if data can be cached or not (optimize network)
     * @param {function} GETnextAction What to do next
     * @return {Boolean} False if it fails
     */
    getRequest: function(url, cache, GETnextAction){
        //First, check if it is required to cache the request
        if(cache){
            //Prepare cache entry name
            var cacheEntryName = encodeURIComponent(url);

            //Check if entry exists
            if(this.cache[cacheEntryName]){
                //Call next action with the url contained into the cache
                GETnextAction(this.cache[cacheEntryName]);

                //Quit function
                return true;
            }
        }

        //No cache entry where found or cache is disabled, continue
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.open("GET", url);

        xhrRequest.onreadystatechange = function(){
            if(xhrRequest.readyState == 4){
                //We check if it is an error
                if(xhrRequest.status != 200){
                    //It's an error, we will quit soon, but debug message before
                    ComunicWeb.debug.logMessage("GET request failed on " + url + " Got response code " + xhrRequest.status);
                    return false;
                }
                
                //Check if it is required to cache result
                if(cache){
                    ComunicWeb.network.cache[cacheEntryName] = xhrRequest.responseText;
                }

                //Call next action
                GETnextAction(xhrRequest.responseText);
            }
        }

        //Perform request
        xhrRequest.send(null);
    },
};