for (let i = 0; i <= 3; i++) {
	console.log(i);
}
var glo = {
	name: 'sherry',
	showname() {
		console.log(this.name);
	}
};

glo.showname();