/**
 * The date library
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.date = {
	/**
	 * Get current timestamp
	 * 
	 * @return {Integer} The current timestamp
	 */
	time: function(){
		return Math.floor(new Date().getTime()/1000);
	},

	/**
	 * Convert a difference in second into a date
	 * 
	 * @param {Integer} difference The difference between two values
	 * @return {String} The generated date
	 */
	diffToStr: function(difference){
		//Calculate seconds
		var seconds = difference-Math.floor(difference/60)*60;
		var difference = (difference - seconds)/60;

		//Check there was less than one minute
		if(difference == 0)
			return seconds + "s";


		//Calculate minutes
		var minutes = difference-Math.floor(difference/60)*60;
		var difference = (difference - minutes)/60;

		//Check there was less than one hour
		if(difference == 0)
			return minutes + "min";


		//Calculate hours
		var hours = difference-Math.floor(difference/24)*24;
		var difference = (difference - hours)/24;

		//Check there was less than a day
		if(difference == 0)
			return hours + "h";


		//Calculate days
		var days = difference-Math.floor(difference/30)*30;
		var difference = (difference - days)/30;

		//Check there was less than a month
		if(difference == 0){
			if(days == 1)
				return "1 day";
			else
				return days + " days";
		}
			

		//Calculate months
		var months = difference-Math.floor(difference/12)*12;
		var difference = (difference - months)/12;

		//Check there was less than a year
		if(difference == 0){
			if(months == 1)
				return "1 month";
			else
				return months + " months";
		}
			

		//Calculate years
		var years = difference;
		if(years == 1){
			return "1 year";
		}
		else {
			return years + " years";
		}
	},

	/**
	 * Get the difference of time from now to a specified
	 * timestamp and return it as a string
	 * 
	 * @param {Integer} time The base time
	 * @return {String} Computed difference
	 */
	timeDiffToStr: function(time){
		return this.diffToStr(this.time() - time);
	},
}