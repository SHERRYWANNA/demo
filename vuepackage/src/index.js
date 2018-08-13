import hello from "./app.vue";
const getName = {
	getName: () => 'sherry'
};

document.getElementsByTagName('body')[0].append(getName.getName());
console.log(hello);