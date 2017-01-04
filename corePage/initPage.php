<?php
/**
 * Page initiator
 *
 * @author Pierre HUBERT
 */

/**
 * Define system path
 */
define("SYSTEM_PATH", __DIR__."/");

/**
 * Include main config
 */
 require(SYSTEM_PATH."config/global.config.php");

/**
 * Include site mode config
 */
require(SYSTEM_PATH."config/".$config['siteMode'].".config.php");

/**
 * Include helpers
 */
foreach (glob(SYSTEM_PATH . "helpers/*.php") as $file) {
    //Including helpers file
    include($file);
}

/**
 * Make config constant
 */
define("config", $config);