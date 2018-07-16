import Compute from "./compute.js"

function showInBody(a) {
	document.body.append(`${a}\n\r`);
}

for (let i = 0; i <= 3; i++) {
    showInBody(i);
}
var glo = {
    name: 'sherry',
    showName() {
        showInBody(this.name);
    },
    showAge() {
        showInBody(Compute.add(1, 3));
    }
};

glo.showName();
glo.showAge();