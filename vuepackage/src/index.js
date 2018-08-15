import hello from "./app.vue";
var Vue = require('vue');

var index = new Vue({
	el: '.container',
	components: {
		'myname': hello
	}
});