/**
 * Helpers
 * 
 * @author Pierre HUBERT
 */

/**
 * Returns the path pointing on an asset
 * 
 * @param {String} assetURI Optionnal, the URI of the asset
 * @return {String} The full URL path of the asset
 */
function path_assets(assetURI){

	if(!assetURI)
		assetURI = "";

	return ComunicWeb.__config.assetsURL+assetURI;
}