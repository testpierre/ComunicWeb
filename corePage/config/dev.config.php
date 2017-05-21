<?php
/**
 * PHP dev config for the website
 *
 * @author Pierre HUBERT
 */

//Path to assets
$config['pathAssets'] = $config['siteURL']."assets/";

//CSS files to include
$config['CSSfiles'] = array(
    //CSS files
    "%PATH_ASSETS%adminLTE/bootstrap/css/bootstrap.min.css",
    "%PATH_ASSETS%adminLTE/plugins/font-awesome/css/font-awesome.min.css",
    "%PATH_ASSETS%adminLTE/plugins/ionicons/css/ionicons.min.css",
    "%PATH_ASSETS%adminLTE/plugins/iCheck/square/blue.css",
    "%PATH_ASSETS%adminLTE/dist/css/AdminLTE.min.css",
    "%PATH_ASSETS%adminLTE/dist/css/skins/_all-skins.min.css",

    //App stylesheets
    "%PATH_ASSETS%css/common/global.css",
    "%PATH_ASSETS%css/common/page/waitSplashScreen.css",
);

//JS files to include (at the end of the page)
$config['JSfiles'] = array(
    //Framewokr inclusions
    "%PATH_ASSETS%adminLTE/plugins/jQuery/jquery-2.2.3.min.js",
    "%PATH_ASSETS%adminLTE/plugins/jquery-ui/jquery-ui.min.js",
    "%PATH_ASSETS%adminLTE/plugins/iCheck/icheck.min.js",

    //Utilities
    "%PATH_ASSETS%js/common/utils.js",

    //Functions schema
    "%PATH_ASSETS%js/common/functionsSchema.js",

    //App scripts
    "%PATH_ASSETS%js/common/network.js",
    "%PATH_ASSETS%js/pagesList.js",
    "%PATH_ASSETS%js/common/api.js",
    "%PATH_ASSETS%js/common/errors.js",
    "%PATH_ASSETS%js/common/messages.js",
    "%PATH_ASSETS%js/common/langs.js",
    "%PATH_ASSETS%js/common/url.js",
    "%PATH_ASSETS%js/common/jsFiles.js",
    "%PATH_ASSETS%js/common/debug.js",
    "%PATH_ASSETS%js/langs/en.inc.js",
    "%PATH_ASSETS%js/common/page.js",
    "%PATH_ASSETS%js/common/notifications.js",
    "%PATH_ASSETS%js/common/formChecker.js",

    //User scripts
    "%PATH_ASSETS%js/user/loginTokens.js",
    "%PATH_ASSETS%js/user/userLogin.js",
    "%PATH_ASSETS%js/user/userInfos.js",

    //Pages scripts
    "%PATH_ASSETS%js/pages/menuBar.js",
    "%PATH_ASSETS%js/pages/home/home.js",
    "%PATH_ASSETS%js/pages/login.js",
    "%PATH_ASSETS%js/pages/logout.js",

    //Init script
    "%PATH_ASSETS%js/init.js",
);

//JS language path
$config['languagesPath'] = "%PATH_ASSETS%js/langs/";

//Production mode
$config['productionMode'] = 0;

//Application version
$config['appVersion'] = "0.1";

//Templates URL
$config['templatesURL'] = $config['pathAssets']."templates/";