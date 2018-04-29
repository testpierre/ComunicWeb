<?php
/**
 * PHP build config for the website
 *
 * @author Pierre HUBERT
 */

class Build {

	/**
	 * Site URL
	 */
	const SITE_URL = "http://devweb.local/comunic/v2/output/";

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
	const ASSETS_URL = "http://devweb.local/comunic/v2/output/assets/";

	/**
	 * Third party CSS files
	 */
	const THIRD_PARTY_CSS = "third_party_css.css";

	/**
	 * Third party Javascript files
	 */
	const THIRD_PARTY_JS = "third_party.js";

	/**
	 * Third party Javascript files (bundle)
	 */
	const THIRD_PARTY_BUNDLE_JS = "third_party.bundle.js";

	/**
	 * Application CSS files
	 */
	const APP_CSS = "app.css";

	/**
	 * Application JS files
	 */
	const APP_JS = "app.js";

	/**
	 * Application JS files (bundles)
	 */
	const APP_BUNDLE_JS = "app.bundle.js";

	/**
	 * Language settings
	 */
	const DEFAULT_LANGUAGE = "en";

	/**
	 * Templates settings
	 */
	const TEMPLATES_PATH = "templates/";
}