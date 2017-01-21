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
    "%PATH_ASSETS%adminLTE/dist/css/AdminLTE.min.css",
    "%PATH_ASSETS%adminLTE/dist/css/skins/_all-skins.min.css",

    //App stylesheets
    "%PATH_ASSETS%css/common/page/waitSplashScreen.css",
);

//JS files to include (at the end of the page)
$config['JSfiles'] = array(
    //Framewokr inclusions
    "%PATH_ASSETS%adminLTE/plugins/jQuery/jquery-2.2.3.min.js",
    "%PATH_ASSETS%adminLTE/plugins/jquery-ui/jquery-ui.min.js",

    //App scripts
    "%PATH_ASSETS%js/common/functionsSchema.js",
    "%PATH_ASSETS%js/common/api.js",
    "%PATH_ASSETS%js/common/errors.js",
    "%PATH_ASSETS%js/common/messages.js",
    "%PATH_ASSETS%js/common/langs.js",
    "%PATH_ASSETS%js/common/url.js",
    "%PATH_ASSETS%js/common/jsFiles.js",
    "%PATH_ASSETS%js/common/debug.js",
    "%PATH_ASSETS%js/langs/en.inc.js",
    "%PATH_ASSETS%js/common/page.js",

    //Init script
    "%PATH_ASSETS%js/init.js",
);

//JS language path
$config['languagesPath'] = "%PATH_ASSETS%js/langs/";

//Production mode
$config['productionMode'] = 0;