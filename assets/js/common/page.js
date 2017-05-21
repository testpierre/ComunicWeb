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
     * Show a transparent wait splash screen
     * 
     * @returns {elem} The splash screen element to let it being deleted
     */
    showTransparentWaitSplashScreen: function(){
        //Create the element
        var waitSplashScreen = document.createElement("div");
        waitSplashScreen.className = "transparentWaitSplashScreen";

        //Populate it
        var imgElem = document.createElement("img");
        imgElem.src = ComunicWeb.__config.assetsURL+"img/barProgress.gif";
        waitSplashScreen.appendChild(imgElem);

        //Apply splash screen
        document.body.appendChild(waitSplashScreen);

        //Return wait splash screen element
        return waitSplashScreen;
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
        var firstPartURI = pageURI.toString();
        
        //Check if there are hashtag for the URL
        if(firstPartURI.indexOf("#") != -1){
            firstPartURI = firstPartURI.split("#")[0];
        }

        //Check if pageURI is empty
        if(firstPartURI == ""){
            firstPartURI = "home";
        }

        //Check if there is also subfolders
        if(firstPartURI.indexOf("/") != -1){
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

        //Change page URL
        ComunicWeb.common.url.changeURI(document.title, pageURI);

        //Get the main contener of the page
        var mainContenerElem = document.getElementById("wrapper");

        //If we didn't get anything, clean the page and create a wrapper element
        if(!mainContenerElem){
           var mainContenerElem = this.emptyPage(true);
        }

        //We check if the page is a full screen page
        if(pageInfos.disableMenus){
            //We force the screen to be cleaned
             var mainContenerElem = this.emptyPage(true);
             var pageTarget = mainContenerElem;
        }
        //Else
        else {
            //We try to locate menubar
            
        }

        //Check if some additionnal data was specified
        if(!additionnalData)
            additionnalData = {};
        
        //Call the method related to the page
        eval(pageInfos.methodHandler + ("(additionnalData, pageTarget);"));
        
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
     * Load, parse and show an HTML template
     * 
     * @param {Object} targetElem The target element where the template will be applied
     * @param {Object} dataTemplate Datas to pass to the template (to parse it)
     * @param {String} templateURI URI pointing on the template
     * @param {function} afterParsingHTMLtemplate What to do once the template is loaded
     * @param {Boolean} cleanContener Specify if contener has to be cleaned or not
     * @return {Boolean} False if it fails
     */
    getAndShowTemplate: function(targetElem, dataTemplate, templateURI, afterParsingHTMLtemplate, cleanContener){

        //First, get the template URL
        templateURL = ComunicWeb.__config.templatesURL + templateURI;
        
        //Define how to apply the template
        var afterDownloadTemplateContent = function(templateContent){

            //If required, clean the contener
            if(cleanContener){
                targetElem.innerHTML = "";
            }

            //Apply data templates
            for(elemName in dataTemplate){
                //We change the template content while it still exists
                while(templateContent.indexOf("{"+elemName+"}") != -1){
                    templateContent = templateContent.replace("{"+elemName+"}", dataTemplate[elemName]);
                } 
            }

            //Apply template source
            targetElem.innerHTML = templateContent;

            //Make a link live
            var aElems = targetElem.getElementsByTagName("a");
            for(num in aElems){

                //Export current element
                var currentElement =  aElems[num];
                
                //Check if it is a real html elements and if it contains a "target" attribute
                if(currentElement.attributes){
                    if(currentElement.attributes.target){

                        //Change the onclick behavior of the elements
                        currentElement.onclick = (function() {
                            ComunicWeb.common.page.openPage(this.getAttribute("target"));
                        });

                    }
                }
            }

            //Perform next action (if there is)
            if(afterParsingHTMLtemplate)
                afterParsingHTMLtemplate();

        };

        //Perform request
        if(!ComunicWeb.common.network.getRequest(templateURL, true, afterDownloadTemplateContent))
            //An error occured
            return false;
    },

    /**
     * Convert a JSON object into html elements
     * 
     * @param {Object} parentNodeChilds The parent which contains the childs to convert (an object)
     * @param {Object} values Optionnal, fill the template with predefined values
     * @returns {HTMLObject} The processed JSON code
     */
    convertJSONobjectTOhtmlElement: function(parentNodeChilds, values){
        //Create variable
        var resultElements = {};

        //Process each element of the array
        for(elemID in parentNodeChilds){

            //Determine object type
            var objType = (parentNodeChilds[elemID].nodeType ? parentNodeChilds[elemID].nodeType : elemID);
            
            //Create object
            var element = document.createElement(objType);
            element.elemID = elemID;

            //Populate it with its informations
            for(fieldName in parentNodeChilds[elemID]){
                if(fieldName == "nodeType"){
                    //Do nothing
                }

                //We perform children generation if required
                else if(fieldName == "children"){
                    //Call the function to get the element's childs and apply them
                    var elemChilds = this.convertJSONobjectTOhtmlElement(parentNodeChilds[elemID][fieldName], values);
                    for(childID in elemChilds){
                        element.appendChild(elemChilds[childID]);
                    }
                }

                //We check if it is innerHTML filling
                else if(fieldName == "innerHTML"){
                    element.innerHTML = parentNodeChilds[elemID][fieldName];
                }
                
                //We check if it is auto filling system which is called
                else if (fieldName == "autofill"){
                    //Check if required value exists in the data
                    if(values){
                        if(values[parentNodeChilds[elemID][fieldName]]){
                            //Then fill field with the value
                            element.innerHTML = values[parentNodeChilds[elemID][fieldName]];
                        }
                    }
                }

                //For other input, we use "setAttribute"
                else{
                    element.setAttribute(fieldName, parentNodeChilds[elemID][fieldName]);
                }
            }

            //Save element
            resultElements[element.elemID] = element;
        }

        //Return result
        return resultElements;
    },

    /**
     * Get and show a JSON template
     * 
     * @param {Object} targetElem The target element where the template will be applied
     * @param {String} templateURI URI pointing on the template
     * @param {Object} additionalData Additionnal to pass to the template
     * @param {function} afterParsingJSONtemplate What to do once JSON template is loaded
     * @param {Boolean} cleanContener Specify wether the template contener has to be cleaned or not
     * @return {Boolean} Flase if it fails
     */
    getAndShowJSONtemplate: function(targetElem, templateURI, additionalData, afterParsingJSONtemplate, cleanContener){
        //Define template URL
        var templateURL = ComunicWeb.__config.templatesURL + templateURI;

        //Define how to apply the template
        var afterTemplateDownload = function(templateContent){
            //Decode JSON content
            var JSONobject = JSON.parse(templateContent);
            
            //Check if parsing failed
            if(!JSONobject){
                ComunicWeb.debug.logMessage("Parsing JSON failed with this file: " + templateURL);
                return false;
            }
            
            //Parse JSON object
            var result = ComunicWeb.common.page.convertJSONobjectTOhtmlElement(JSONobject, additionalData);

            //Apply each result element
            for(elem in result){
                targetElem.appendChild(result[elem]);
            }

            //Perform next action if required
            if(afterParsingJSONtemplate){
                afterParsingJSONtemplate();
            }

            //Everything OK
            return true;
        };

        //Perform request
        if(!ComunicWeb.common.network.getRequest(templateURL, true, afterTemplateDownload))
            //An error occured
            return false;
    }
};