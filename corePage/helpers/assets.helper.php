<?php
/**
 * Assets helper inclusion
 *
 * @author Pierre HUBERT
 */

/**
 * Returns the source code for including a javascript file
 * 
 * @param String $file The path to the file
 * @return String Source code for including a javascript file
 */
function javascriptFileInclusionCode($file){
    return "<script type='text/javascript' src='".$file."'></script>".(config['siteMode'] == 0 ? "\n\t\t" : "");
}

/**
 * Returns the source code for including a CSS file
 * 
 * @param String $file Path to the CSS file
 * @return String HTML Source code to include the CSS file
 */
function CSSFileInclusionCode($file){
    return "<link rel='stylesheet' href='".$file."'>".(config['siteMode'] == 0 ? "\n\t\t" : "");
}
