<?php
/**
 * Page initiator
 *
 * @author Pierre HUBERT
 */

/**
 * Include main config
 */
require_once __DIR__."/config/global.config.php";

/**
 * Load a page
 * 
 * @param string $config The configuration to use to load a page
 * @return string Generated source page
 */
function load_page(string $config) : string{

    //Load configuration
    require __DIR__."/config/".$config.".config.php";
    $conf = new $config();

    //Load page template
    $source = file_get_contents(__DIR__."/tpl/page.tpl");

    //Replace path to assets when required
    $source = str_replace("{ASSETS_URL}", $config::ASSETS_URL, $source);

    //Update javascript config
    $source = str_replace("{js_config}", get_javascript_config($conf), $source);

    //Update assets inclusion
    $source = str_replace("{THIRD_PARTY_CSS}", src_inc_list_css($conf::ASSETS_URL, $conf::THIRD_PARTY_CSS), $source);
    $source = str_replace("{APP_CSS}", src_inc_list_css($conf::ASSETS_URL, $conf::APP_CSS), $source);
    $source = str_replace("{THIRD_PARTY_JS}", src_inc_list_js($conf::ASSETS_URL, $conf::THIRD_PARTY_JS), $source);
    $source = str_replace("{APP_JS}", src_inc_list_js($conf::ASSETS_URL, $conf::APP_JS), $source);

    return $source;
}

/**
 * Get javascript configuration
 * 
 * @param object $config The configuration object
 * @return string The javascript configuration
 */
function get_javascript_config($config) : string {
    $js_config = "<script>
    
    var ComunicConfig = {
        
        //Production mode
        productionMode: ".($config::PROD_MODE ? "true" : "false").",

        //AppVersion
        appVersion: '".Config::VERSION."',

        //Assets URL
        assetsURL: '".$config::ASSETS_URL."',

        //Templates URL
        templatesURL : '".$config::ASSETS_URL.$config::TEMPLATES_PATH."',

        //Site URL
        siteURL: '".$config::SITE_URL."',

        //API configuration
        apiURL: '".Config::API_URL."',
        apiServiceName: '".Config::API_SERVICE_NAME."',
        apiServiceToken: '".Config::API_SERVICE_TOKEN."',

        //Default language
        defaultLanguage: '".$config::DEFAULT_LANGUAGE."',

        //LanguagesPath
        languagesPath: '".$config::ASSETS_URL.$config::LANGUAGE_PATH."', 

    };

    </script>";

    return $js_config;
}

/**
 * Return the source code to include an array of css assets
 * 
 * @param string $asset_url URL path to assets
 * @param array $files The list of files to include
 * @return string Generated source code
 */
function src_inc_list_css(string $assets_url, array $files) : string {
    $source = "";

    //Process the list of files
    foreach($files as $file){
        $source .= src_inc_css($assets_url.$file)."\n\t\t";
    }

    return $source;
}

/**
 * Return the source code to include an array of javascript assets
 * 
 * @param string $asset_url URL path to assets
 * @param array $files The list of files to include
 * @return string Generated source code
 */
function src_inc_list_js(string $assets_url, array $files) : string {
    $source = "";

    //Process the list of files
    foreach($files as $file){
        $source .= src_inc_js($assets_url.$file)."\n\t\t";
    }

    return $source;
}

/**
 * Returns the source code to include a javascript file
 * 
 * @param string $file The path to the file
 * @return string Source code for including a javascript file
 */
function src_inc_js(string $file) : string{
    return "<script type='text/javascript' src='".$file."'></script>";
}

/**
 * Returns the source code to include a CSS file
 * 
 * @param string $file Path to the CSS file
 * @return string HTML Source code to include the CSS file
 */
function src_inc_css(string $file) : string {
    return "<link rel='stylesheet' href='".$file."'>";
}
