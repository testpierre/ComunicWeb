/**
 * Global cache management system
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.cacheManager = {
	/**
	 * @var {Array} cachesArray An array that contains all the functions that can empty caches
	 */
	__cachesCleaners: [],

	/**
	 * @var {Array} intervalsList A list of all created intervals
	 */
	__intervalsList: [],

	/**
	 * Register a new cache cleaner
	 * 
	 * @param {Function} cacheCleaner The cache cleaner to register
	 * @param {Boolean} persistant If it is set to true, the cache will have to be cleaned only on user logout
	 * @return {Boolean} True for a success
	 */
	registerCacheCleaner: function(cacheCleaner, persistant){

		//Add the function to the list
		this.__cachesCleaners.push([cacheCleaner, persistant]);

		//Success
		return true;

	},

	/**
	 * Register a new interval
	 * 
	 * @param {Interval} interval The interval to register
	 * @return {Boolean} True for a success
	 */
	registerInterval: function(interval){
		//Add the interval to the list
		this.__intervalsList.push(interval);

		//Success
		return true;
	},

	/**
	 * Clean the caches
	 * 
	 * @param {Boolean} allCaches Specify wether persistent caches has to be cleaned or not
	 * @return {Boolean} True for a success
	 */
	cleanCaches: function(allCaches){

		//Log action
		ComunicWeb.debug.logMessage("Empty all caches");

		//Process each cleaning function
		for(i in this.__cachesCleaners){
			if(allCaches || !this.__cachesCleaners[i][1])
				eval(this.__cachesCleaners[i][0]+"()");
		}

		//Success
		return true;
	},

	/**
	 * Unset all intervals
	 * 
	 * @return {Boolean} True for a success
	 */
	cleanIntervals: function(){
		//Log action
		ComunicWeb.debug.logMessage("Unset all intervals");

		//Process each cleaning function
		for(i in this.__intervalsList){
			//if(allCaches || !this.__intervalsList[i][1])
				clearInterval(this.__intervalsList[i]);
		}

		//Success
		return true
	}
}