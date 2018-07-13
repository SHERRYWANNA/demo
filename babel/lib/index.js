'use strict';

for (var i = 0; i <= 3; i++) {
	console.log(i);
}
var glo = {
	name: 'sherry',
	showname: function showname() {
		console.log(this.name);
	}
};

glo.showname();