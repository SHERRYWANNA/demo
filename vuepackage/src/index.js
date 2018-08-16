import hello from "./app.vue";
var Vue = require('vue');

var index = new Vue({
	el: '.container',
	data: {
		name: 'sherry'
	},
	components: {
		'myname': hello
	}
});