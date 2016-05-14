function datespan(date1, date2, res) {

	var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	if (!date1) {
		return "Error processing date range"
	}
	date2 = date2 || "present";

	var granularity = Math.min(date1.length, date2.length, res);
	var alike = 0;
	for (var a = 0; a < granularity; ++a) {
		if (date1[a] == date2[a]) {
			alike = a + 1;
		} else break;
	}

	// for "to present", present full date + "to present"
	if (date2 == "present") {
		var datestring = "";
		for (var a = 0; a < granularity; ++a) {
			datestring = " " + (a == 1 ? months[date1[a]] : date1[a]) + datestring;
		}
		return datestring + " to present";
	}

	var alike_datestring = "";
	for (var a = 0; a < alike; ++a) {
		alike_datestring = " " + (a == 1 ? months[date1[a]] : date1[a]) + alike_datestring;
	}

	var diff1 = "";
	var diff2 = "";
	for (var a = alike; a < granularity; ++a) {
		diff1 = " " + (a == 1 ? months[date1[a]] : date1[a]) + diff1;
		diff2 = " " + (a == 1 ? months[date2[a]] : date2[a]) + diff2;
	}

	var dash = " —";
	if (alike == granularity) dash = "";

	return (diff1 + dash + diff2 + alike_datestring).substr(1);

}


function phone_number(number) {

	// takes a +prefixed international number and formats it
	// according to local spacing.

	var formatted_number = "";

	if (number.substr(0, 2) === "+1") {
		// NANP formatting: (123) 456-7890
		var areacode = number.substr(2, 3);
		var part1 = number.substr(5, 3);
		var part2 = number.substr(8, 4);
		var ext = number.substr(12);

		// 1-800 numbers
		if (areacode[0] == "8" && areacode[1] == areacode[2]) {
			formatted_number = "1-" + areacode + "-" + part1 + "-" + part2;
		}
		// regular numbers
		else formatted_number = "(" + areacode + ") " + part1 + "-" + part2;

		if (ext.length > 0) {
			formatted_number += " x" + ext;
		}
	} else if (number.substr(0, 3) === "+44") {
		// UK phone number

	} else if (number.substr(0, 3) === "+86") {
		// Chinese phone number
		var localnum = number.substr(3);
		var areacode = "", part1 = "", part2 = "";
		if (localnum.substr(0, 2) == "10" || localnum[0] == "2") {
			// 2-digit area code
			areacode = localnum.substr(0, 2);
			part1 = localnum.substr(2, 4);
			part2 = localnum.substr(6, 4);
		} else if (localnum[0] == "1") {
			// mobile number, no digit grouping applied
			return localnum;
		} else {
			areacode = localnum.substr(0, 3);
			part1 = localnum.substr(3, 4);
			part2 = localnum.substr(7, 4);
		}
		formatted_number = "(0" + areacode + ") " + part1 + "-" + part2;
	} else {
		formatted_number = number;
	}

	return formatted_number;

}
