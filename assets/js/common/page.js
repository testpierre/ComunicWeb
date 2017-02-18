/**
 * Page functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.page = {
    /**
     * Empty current page content
     * 
     * @param {Boolean} createWrapper Optionnal, define if it is required to add a wrapper 
     * container to the page
     * @return {Object} Wrapper element if it is created
     */
    emptyPage: function(createWrapper){
        //Empty body tag
        document.body.innerHTML = "";

        //Remove body speicific tags
        document.body.className = "";
        document.body.id = "";
        document.body.onclick = "";

        //Log message
        ComunicWeb.debug.logMessage("Clean the screen.");

        //If required, create the wrapper element
        if(createWrapper){
            var wrapper = document.createElement("div");
            wrapper.className = "wrapper";
            wrapper.id = "wrapper";
            document.body.appendChild(wrapper);

            //Return link to wrapper
            return(wrapper);
        }
    },


    /**
     * Show a full wait splash screen
     */
    showWaitSplashScreen: function(){
        //First, empty the screen
        this.emptyPage();

        //Log message
        ComunicWeb.debug.logMessage("Display a wait splash screen the screen.");

        //Create image element
        var imgElem = document.createElement("img");
        imgElem.src = ComunicWeb.__config.assetsURL+"img/roundProgress.gif";
        document.body.appendChild(imgElem);

        //Change body className
        document.body.className = "waitSplashScreen";

    },

    /**
     * Open a page
     * 
     * @param {String} pageURI The URI to the page
     * @param {Object} additionnalData Additionnal data to pass to the new page
     */
    openPage: function(pageURI, additionnalData){
        //Log message
        ComunicWeb.debug.logMessage("Open the following page: " + pageURI);

        //Extract the first part of the URL
        var firstPartURI = pageURI;
        
        //Check if pageURI is empty
        if(firstPartURI == ""){
            firstPartURI = "home";
        }

        //Check if there is also subfolders
        if(firstPartURI.indexOf("/") != "/"){
            firstPartURI = firstPartURI.split("/")[0];
        }

        //Check if specied page exists
        if(ComunicWeb.pagesList[firstPartURI]){
            var pageInfos = ComunicWeb.pagesList[firstPartURI];
        }
        
        //Else we include the 404 not found page
        else{
            var pageInfos = ComunicWeb.pagesList.notFound;
        }

        //Change page title
        document.title =  pageInfos.pageTitle;

        //Get the main contener of the page
        //var mainContenerElem = document.getElementById("wrapper");

        //If we didn't get anything, clean the page and create a wrapper element
        if(!mainContenerElem){
           var mainContenerElem = this.emptyPage(true);
        }

        //Check if some additionnal data was specified
        if(!additionnalData)
            additionnalData = {};
        
        //Call the method related to the page
        eval(pageInfos.methodHandler + ("(additionnalData, mainContenerElem);"));
        
    },

    /**
     * Prepare a template load by specifiying datas
     * 
     * @return {Object} The object contener with all required infos
     */
    prepareLoadTemplate: function(){
        //Create an object
        var obj = {
            templateURL: "",
            templateDatas: "",
        };

        //Return object
        return obj;
    },

    /**
     * Load, parse and show a template
     * 
     * @param {Object} targetElem The target element where the template will be applied
     * @param {Object} dataTemplate Datas to pass to the template (to parse it)
     * @param {String} templateURI URI pointing on the template
     * @param {function} nextAction What to do once the template is loaded
     * @param {Boolean} cleanContener Specify if contener has to be cleaned or not
     * @return {Boolean} False if it fails
     */
    getAndShowTemplate: function(targetElem, dataTemplate, templateURI, nextAction, cleanContener){

        //First, get the template URL
        templateURL = ComunicWeb.__config.templatesURL + templateURI;
        
        //Define how to apply the template
        var afterDownloadTemplateContent = function(templateContent){

            //Apply data templates
            for(elemName in dataTemplate){
                //We change the template content while it still exists
                while(templateContent.indexOf("{"+elemName+"}") != -1){
                    templateContent = templateContent.replace("{"+elemName+"}", dataTemplate[elemName]);
                } 
            }

            //Apply template source
            targetElem.innerHTML = templateContent;
        }

        //Perform request
        if(!ComunicWeb.network.getRequest(templateURL, true, afterDownloadTemplateContent))
            //An error occured
            return false;
    },
};