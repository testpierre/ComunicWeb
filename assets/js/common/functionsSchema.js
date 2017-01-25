/**
 * Comunic WebApp schema
 * 
 * @author Pierre HUBERT
 */
var ComunicWeb = {

    /**
     * Configuration inclusion
     */
    __config: ComunicConfig,

    /**
     * Common functions
     */
    common:{
        /**
         * API functions
         */
        api: {
            /**
             * Make an API request
             */
            makeAPIrequest: function(apiURI, params, nextAction){},
        },

        /**
         * Langs functions
         */
        langs: {
            /**
             * Return current language
             */
            getCurrentLanguage: function(){},

            /**
             * Include and install specified language
             */
            installLanguage: function(languageID){},

            /**
             * Initializate languages
             */
            initLanguages: function(){},

            /**
             *  Return a string in correct language
             */
            getTranslatedText: function(stringName, stringParams){},
        },

        /**
         * Messages functions
         */
        messages: {

            /**
             * Create and return a callout element
             */
            createCalloutElem: function(calloutTitle, calloutMessage, calloutType){},
        },

        /**
         * Error functions
         */
        error:{
            /**
             * Submit an error
             */
            submitError: function(errorLevel, errorMessage, errorCode, errorData){},

            /**
             * Handle and show a fatal error
             */
            fatalError: function(errorMessage, errorCode, errorData){},

            /**
             * Handle a 404 not found error
             */
            pageNotFound: function(additionnalData, targetElement){},
        },

        /**
         * URL functions
         */
        url:{
            /**
             * Return current URL opened on the website
             */
            getCurrentWebsiteURL: function(){},
        },

        /**
         * Page functions
         */
        page: {
            /**
             * Empty current page
             */
            emptyPage: function(createWrapper){},

            /**
             * Show a full wait splash screen
             */
            showWaitSplashScreen: function(){},

            /**
             * Open a page
             */
            openPage: function(pageURI, additionnalData){},

            /**
             * Prepare a template load by specifying datas
             */
            prepareLoadTemplate: function(){},

            /**
             * Load, parse and show a template
             */
            getAndShowTemplate: function(targetElem, dataTemplate, templateURI, nextAction, cleanContener){},
        },

        /**
         * Network common requests
         */
        network: {

            /**
             * @var {object} Cache contener
             */
            cache: {},
            
            /**
             * Make a get request
             */
            getRequest: function(url, cache, GETnextAction){},
        },

        /**
         * Operations on JS files
         */
        jsFiles:{

            /**
             * Include a Javascript file
             */
            includeFile: function(fileURL){},

            /**
             * Execute some source code contained in a variable
             */
            executeJSsource: function(source){},
        },
    },

    /**
     * Debug functions
     */
    debug:{
        /**
         * @var {Object} Internal log variable
         */
        __log: {},

        /**
         * Display message on browser console
         */
        logMessage: function(message){},

        /**
         * Save a new log message
         */
        saveLogMessage: function(message){},

        /**
         * Get log content in a string
         */
        getLogContent: function(){},
    }
}