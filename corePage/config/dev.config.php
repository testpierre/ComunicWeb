<?php
/**
 * PHP dev config for the website
 *
 * @author Pierre HUBERT
 */

//Path to assets
$config['pathAssets'] = $config['siteURL']."assets/";

//3rdparty CSS files to include
$config['3rdPartyCSSfiles'] = array(
	//CSS files - adminLTE distribution / bootstrap / plugins
	"%PATH_ASSETS%3rdparty/adminLTE/bootstrap/css/bootstrap.min.css",
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/font-awesome/css/font-awesome.min.css",
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/ionicons/css/ionicons.min.css",
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/iCheck/square/blue.css",
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/iCheck/flat/blue.css",
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/select2/select2.min.css",
	"%PATH_ASSETS%3rdparty/adminLTE/dist/css/AdminLTE.min.css",
	"%PATH_ASSETS%3rdparty/adminLTE/dist/css/skins/_all-skins.min.css",

	//Light box
	"%PATH_ASSETS%3rdparty/lightbox/ekko-lightbox.min.css",
);

//App CSS files
$config['CSSfiles'] = array(
	//App stylesheets - common stylesheets
	"%PATH_ASSETS%css/common/global.css",
	"%PATH_ASSETS%css/common/page/waitSplashScreen.css",
	"%PATH_ASSETS%css/common/network/networkError.css",

	//Components stylesheets
		//Menubar stylesheet
		"%PATH_ASSETS%css/components/menuBar.css",
		
		//Searchform stylesheet
		"%PATH_ASSETS%css/components/searchForm.css",
		
		//Friendbar stylesheet
		"%PATH_ASSETS%css/components/friends/friendsBar.css",
		
		//Conversations stylesheet
		"%PATH_ASSETS%css/components/conversations/manager.css",
		"%PATH_ASSETS%css/components/conversations/windows.css",
		"%PATH_ASSETS%css/components/conversations/list.css",
		
		//User selector stylesheet
		"%PATH_ASSETS%css/components/userSelect/userSelect.css",

		//Emojies
	"%PATH_ASSETS%css/components/emoji/parser.css",

	//Pages stylesheets
		//User Page
		"%PATH_ASSETS%css/pages/userPage/accessForbidden.css",
);

//3rd party JS files to include (at the end of the page)
$config['3rdPartyJSfiles'] = array(
	//Jquery
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/jQuery/jquery-2.2.3.min.js",
	
	//Bootstrap
	"%PATH_ASSETS%3rdparty/adminLTE/bootstrap/js/bootstrap.min.js",
	
	//JQuery UI
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/jquery-ui/jquery-ui.min.js",
	
	//iCheck
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/iCheck/icheck.min.js",
	
	//Slimscroll
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/slimScroll/jquery.slimscroll.min.js",
	
	//Select2
	"%PATH_ASSETS%3rdparty/adminLTE/plugins/select2/select2.min.js",
	
	//adminLTE script
	"%PATH_ASSETS%3rdparty/adminLTE/dist/js/app.min.js",

	//Bootstrap notify
	"%PATH_ASSETS%3rdparty/bootstrap-notify-3.1.3.min.js",

	//Twitter emojies
	"%PATH_ASSETS%3rdparty/twemoji/2/twemoji.min.js",

	//Textarea auto-size
	"%PATH_ASSETS%3rdparty/jquery.textarea_autosize/jquery.textarea_autosize.min.js",

	//Light box
	"%PATH_ASSETS%3rdparty/lightbox/ekko-lightbox.min.js",
);

//Application JS files
$config['JSfiles'] = array(

	//Utilities
	"%PATH_ASSETS%js/common/utils.js",

	//Functions schema
	"%PATH_ASSETS%js/common/functionsSchema.js",

	//Pages list
	"%PATH_ASSETS%js/pagesList.js",


	//App scripts -- common scripts
	"%PATH_ASSETS%js/common/cacheManager.js",
	"%PATH_ASSETS%js/common/network.js",
	"%PATH_ASSETS%js/common/api.js",
	"%PATH_ASSETS%js/common/errors.js",
	"%PATH_ASSETS%js/common/messages.js",
	"%PATH_ASSETS%js/common/langs.js",
	"%PATH_ASSETS%js/common/url.js",
	"%PATH_ASSETS%js/common/jsFiles.js",
	"%PATH_ASSETS%js/common/debug.js",
	"%PATH_ASSETS%js/common/page.js",
	"%PATH_ASSETS%js/common/notifications.js",
	"%PATH_ASSETS%js/common/formChecker.js",
	"%PATH_ASSETS%js/common/date.js",
	"%PATH_ASSETS%js/common/system.js",

	//Default langage
	"%PATH_ASSETS%js/langs/en.inc.js",

	//Components
		//Mail caching
		"%PATH_ASSETS%js/components/mailCaching.js",
		
		//Search form
		"%PATH_ASSETS%js/components/searchForm/searchForm.js",
		
		//Main menubar
		"%PATH_ASSETS%js/components/menuBar/common.js",
		"%PATH_ASSETS%js/components/menuBar/notAuthenticated.js",
		"%PATH_ASSETS%js/components/menuBar/authenticated.js",
		
		//Friends components
		"%PATH_ASSETS%js/components/friends/friendsList.js",
		"%PATH_ASSETS%js/components/friends/friendsBar.js",
		
		//Private conversations
		"%PATH_ASSETS%js/components/conversations/manager.js",
		"%PATH_ASSETS%js/components/conversations/list.js",
		"%PATH_ASSETS%js/components/conversations/windows.js",
		"%PATH_ASSETS%js/components/conversations/chatWindows.js",
		"%PATH_ASSETS%js/components/conversations/interface.js",
		"%PATH_ASSETS%js/components/conversations/service.js",
		"%PATH_ASSETS%js/components/conversations/cachingOpened.js",
		"%PATH_ASSETS%js/components/conversations/utils.js",
		
		//User selector
		"%PATH_ASSETS%js/components/userSelect/userSelect.js",

		//Emojies
		"%PATH_ASSETS%js/components/emoji/parser.js",
		"%PATH_ASSETS%js/components/emoji/list.js",

		//Modern textarea handler
		"%PATH_ASSETS%js/components/textarea.js",

	//User scripts
	"%PATH_ASSETS%js/user/loginTokens.js",
	"%PATH_ASSETS%js/user/userLogin.js",
	"%PATH_ASSETS%js/user/userInfos.js",
		

	//Pages scripts
		//Home page
		"%PATH_ASSETS%js/pages/home/home.js",
		"%PATH_ASSETS%js/pages/home/landingPage.js",
		
		//User page
		"%PATH_ASSETS%js/pages/userPage/main.js",
		"%PATH_ASSETS%js/pages/userPage/accessForbidden.js",
		"%PATH_ASSETS%js/pages/userPage/friendshipStatus.js",
		"%PATH_ASSETS%js/pages/userPage/profileInfos.js",

		//Login page
		"%PATH_ASSETS%js/pages/login.js",
		
		//Logout page
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