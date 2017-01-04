/**
 * API main functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Make an API request
 * 
 * @param {String} apiURI The URI to call in the API
 * @param {Array} params The params to include in request
 * @param {Function} nextAction What to do next
 */
ComunicWeb.makeAPIrequest = function(apiURI, params, nextAction){
    //Prepare the request URL
    var requestURL = config['API_URL'] + apiURI;
    
    //Prepare data to send in request
    var count = 0;
    var datas = "";
    for(i in values){
        //We check we are still in the initial array values
        if(count < values.length){
            //We add a "&" if it isn't the first param
            if(count != 0)
                data += "&";
            
            //We check the field's existence
            if(values[i][0])
                datas += encodeURIComponent(values[i][0]) + "=" + encodeURIComponent(values[i][1]);

            count++;
        }
    }

    //Create request
    var apiXHR = new XMLHttpRequest();
    apiXHR.open("POST", requestURL);

    //Prepare request response
    apiXHR.onreadystatechange = function(){
        //We continue only if request is terminated
        if(apiXHR.readyState == 4){
            //Prepare result
            var result = {};

            //We can do the next step
            //nextAction(apiXHR.responseText);
        }
    }
};