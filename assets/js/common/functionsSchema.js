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
            makeAPIrequest: function(apiURI, params, requireLoginTokens, nextAction){},
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

            /**
             * Change the current website URI
             */
            changeURI: function(newTitle, newURI){},
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
             * Show a transparent wait splash screen
             */
            showTransparentWaitSplashScreen: function(){},

            /**
             * Open a page
             */
            openPage: function(pageURI, additionnalData){},

            /**
             * Prepare a template load by specifying datas
             */
            prepareLoadTemplate: function(){},

            /**
             * Load, parse and show an HTML template
             */
            getAndShowTemplate: function(targetElem, dataTemplate, templateURI, nextAction, cleanContener){},

            /**
             * Convert a JSON object into html elements
             */
            convertJSONobjectTOhtmlElement: function(parentNodeChilds, values){},

            /**
             * Get and show a JSON template
             */
            getAndShowJSONtemplate: function(targetElem, templateURI, additionalData, afterParsingJSONtemplate, cleanContener){},
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
    },

    /**
     * User functions
     */
    user:{
        /**
         * Login tokens storage controller
         */
        loginTokens: {
            /**
             * Set User tokens
             */
            setUserTokens: function(tokens, storageType){},

            /**
             * Check if there is any login tokens available
             */
            checkLoginTokens: function(){},

            /**
             * Get login tokens
             */
            getLoginTokens: function(){},

            /**
             * Perform user logout
             */
            deleteLoginTokens: function(){},
        },

        /**
         * Manage user login
         */
        userLogin: {
            /**
             * @var {Boolean} Store user login state (true by default)
             */
            __userLogin: true,

            /**
             * @var {Integer} Store the current user ID
             */
            __userID: 0,


            /**
             * Tell if user is logged in or not
             */
            getUserLoginState: function(){},

            /**
             * Get user ID (if logged in)
             */
            getUserID: function(){},

            /**
             * Try to get and store current user ID
             */
            getCurrentUserId: function(afterGetCurrentUserID){},

            /**
             * Refresh the user login state
             */
            refreshLoginState: function(afterLogin){},

            /**
             * Try to login user
             */
            loginUser: function(usermail, userpassword, permanentLogin, afterLogin){},

            /**
             * Logout user
             */
            logoutUser: function(afterLogout){},
        },
        
        /**
         * Get user infos
         */
        userInfos: {
            //TODO: implement
        },
    },

    /**
     * Pages functions
     */
    pages:{

        /**
         * Home page
         */
        home: {
            /**
             * Common homes functions
             */
            home:{
                /**
                 * Open home page
                 */
                openHomePage: function(additionnalData, targetElement){},


            },
        },

        /**
         * Login controller
         */
        login:{
           /**
            * Open login page
            */
            openLoginPage: function(additionnalData, targetElement){},

            /**
             * Perform user login
             */
            loginSubmit: function(){},
        }

    },
}