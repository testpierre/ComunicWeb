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
    "%PATH_ASSETS%3rdparty/adminLTE/bootstrap/css/bootstrap.min.css",
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/font-awesome/css/font-awesome.min.css",
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/ionicons/css/ionicons.min.css",
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/iCheck/square/blue.css",
    "%PATH_ASSETS%3rdparty/adminLTE/dist/css/AdminLTE.min.css",
    "%PATH_ASSETS%3rdparty/adminLTE/dist/css/skins/_all-skins.min.css",

    //App stylesheets
    "%PATH_ASSETS%css/common/global.css",
    "%PATH_ASSETS%css/common/page/waitSplashScreen.css",

    //Components stylesheets
    "%PATH_ASSETS%css/components/menuBar.css",
    "%PATH_ASSETS%css/components/searchForm.css",
);

//JS files to include (at the end of the page)
$config['JSfiles'] = array(
    //Framework inclusions
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/jQuery/jquery-2.2.3.min.js",
    "%PATH_ASSETS%3rdparty/adminLTE/bootstrap/js/bootstrap.min.js",
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/jquery-ui/jquery-ui.min.js",
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/iCheck/icheck.min.js",
    "%PATH_ASSETS%3rdparty/adminLTE/plugins/slimScroll/jquery.slimscroll.min.js",
    "%PATH_ASSETS%3rdparty/adminLTE/dist/js/app.min.js",

    //Bootstrap notify
    "%PATH_ASSETS%3rdparty/bootstrap-notify-3.1.3.min.js",

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
    "%PATH_ASSETS%js/common/system.js",

    //Components
    "%PATH_ASSETS%js/components/mailCaching.js",
    "%PATH_ASSETS%js/components/searchForm/searchForm.js",
    "%PATH_ASSETS%js/components/menuBar/common.js",
    "%PATH_ASSETS%js/components/menuBar/notAuthenticated.js",
    "%PATH_ASSETS%js/components/menuBar/authenticated.js",

    //User scripts
    "%PATH_ASSETS%js/user/loginTokens.js",
    "%PATH_ASSETS%js/user/userLogin.js",
    "%PATH_ASSETS%js/user/userInfos.js",

    //Pages scripts
    "%PATH_ASSETS%js/pages/home/home.js",
    "%PATH_ASSETS%js/pages/home/landingPage.js",
    "%PATH_ASSETS%js/pages/login.js",
    "%PATH_ASSETS%js/pages/logout.js",

    //Create shortcuts for common functions
    "%PATH_ASSETS%js/common/shorcuts.js",
    "%PATH_ASSETS%js/common/helpers.js",

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