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
         * Network functions
         */
        network: {

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
             * Handle and show a fatal error
             */
            fatalError: function(errorMessage){},
        },

        /**
         * Operations on JS files
         */
        jsFiles:{

            /**
             * Include a Javascript file
             */
            includeFile: function(fileURL){},
        },
    },

    /**
     * Debug functions
     */
    debug:{
        /**
         * Display message on browser console
         */
        logMessage: function(message){},
    }
}