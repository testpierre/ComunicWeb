<?php
/**
 * Docker container build configuration
 *
 * @author Pierre HUBERT
 */

class Docker {

	/**
	 * Container URL
	 */
	const CONTAINER_URL = 'http://<?php echo $_SERVER["HTTP_HOST"]; ?>/';

	/**
	 * API access and credentials
	 */
	const API_URL = self::CONTAINER_URL."api/";
	const API_SERVICE_NAME = "client";
	const API_SERVICE_TOKEN = "token";

	/**
	 * Site URL
	 */
	const SITE_URL = self::CONTAINER_URL;

	/**
	 * Site production mode
	 */
	const PROD_MODE = TRUE;

	/**
	 * Path to assets (relative to the build folder)
	 */
	const PATH_ASSETS = "assets/";

	/**
	 * Path to assets (URL)
	 */
	const ASSETS_URL = self::CONTAINER_URL."assets/";

	/**
	 * Third party CSS files
	 */
	const THIRD_PARTY_CSS = "third_party_css.css";

	/**
	 * Third party Javascript files
	 */
	const THIRD_PARTY_JS = "third_party.js";

	/**
	 * Third party Javascript files (unminified)
	 */
	const THIRD_PARTY_UNMINIFIED_JS = "third_party.unminified.js";

	/**
	 * Application CSS files
	 */
	const APP_CSS = "app.css";

	/**
	 * Application JS files
	 */
	const APP_JS = "app.js";

	/**
	 * Application JS files (unminifieds)
	 */
	const APP_UNMINIFIED_JS = "app.unminified.js";

	/**
	 * Language settings
	 */
	const DEFAULT_LANGUAGE = "en";

	/**
	 * Templates settings
	 */
	const TEMPLATES_PATH = "templates/";
}