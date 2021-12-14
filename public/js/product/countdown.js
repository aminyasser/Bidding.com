// load namespace
SV = window.SV || {};

SV.Countdown = function(selector, params) {

	var formatTime = function(time) {
		if (time < 10)
			return '0' + time;

		return time;
	};

	var setTimer = function() {
		var oneSec  = 1000;     // milliseconds
		var oneMin  = 60000;    // oneSec x 60
		var oneHour = 3600000;  // oneMin x 60
		var oneDay  = 86400000; // oneHour x 24

		var now = new Date();
		var timeLeftTotal = targetDate.getTime() - now.getTime();

		var timeLeftDays = timeLeftTotal % oneDay;
		daysLeft = ( timeLeftTotal - timeLeftDays ) / oneDay;

		var timeLeftHours = timeLeftDays % oneHour;
		hoursLeft = ( timeLeftDays - timeLeftHours ) / oneHour;

		var timeLeftMins = timeLeftHours % oneMin;
		minsLeft = ( timeLeftHours - timeLeftMins ) / oneMin;

		var timeLeftSecs = timeLeftMins % oneSec;
		secsLeft = ( timeLeftMins - timeLeftSecs ) / oneSec;
	};

	var updateTime = function() {
		setTimer();

		if (daysLeft <= 0 && hoursLeft <= 0 && minsLeft <= 0 && secsLeft <= 0) {
			wrapper.innerHTML = '<p class="bid-blastoff text-center">' + options.endMessage + '</p>';
		} else {
			wrapper.querySelector('.bid-days').innerText = daysLeft;
			wrapper.querySelector('.bid-hours').innerText = formatTime(hoursLeft);
			wrapper.querySelector('.bid-mins').innerText = formatTime(minsLeft);
			wrapper.querySelector('.bid-secs').innerText = formatTime(secsLeft);

			setTimeout(updateTime, 1000);
		}
	};

	var defaults = {
		year: 2000,
		month: 1,
		day: 1,
        hour:10,
        min:3,
		untilMessage: '',
		endMessage: 'Time Out, You can not bid now',
		tableClass: ''
	};

	var options = {};
	for (var k in defaults) {
		options[k] = params[k] || defaults[k];
	}

	var wrapper = document.querySelector(selector);
	if (!wrapper)
		return;

	var targetDate = new Date(options.year, options.month - 1, options.day ,options.hour);
	var daysLeft, hoursLeft, minsLeft, secsLeft;

	var useTableClass = 'bid-timer';
	if (options.tableClass.length > 0)
		useTableClass += ' ' + options.tableClass;

	var tableHtml =
	'<div class="timer-wrapper">' +
		'<table class="' + useTableClass + '">' +
		'<thead>' +
			'<tr>' +
				'<th>Days</th>' +
				'<th>Hours</th>' +
				'<th>Mins</th>' +
				'<th>Secs</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>' +
			'<tr>' +
				'<td class="bid-days"></td>' +
				'<td class="bid-hours"></td>' +
				'<td class="bid-mins"></td>' +
				'<td class="bid-secs"></td>' +
			'</tr>' +
		'</tbody>' +
		'</table>' +
		'</div>' ;

	if (options.untilMessage.length > 0)
		tableHtml += '<p class="bid-until">' + options.untilMessage + '</p>';

	wrapper.innerHTML = tableHtml;
	updateTime();
};