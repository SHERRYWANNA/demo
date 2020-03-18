class Vue {
    constructor(option) {
        Object.assign(this, option);
        this.observeNode = null;
        this.observe();
        this.compile();
    }

    observe() {
        for (let key in this.data) {
            let ob = new Observe(key, this.data[key]);
            Object.defineProperty(this.data, key, {
                get: () => {
                    this.observeNode && ob.addNode(this.observeNode);
                    return ob.value;
                },
                set(value) {
                    ob.updateNode(value);
                }
            });
        }
    }

    compile() {
        let $el = document.querySelector(this.el);
        let reg = new RegExp('\\{\\{(.+)\\}\\}');

        getCompile.bind(this)($el);

        function getCompile($el) {
            let childNode = $el.firstElementChild;
            if (!childNode && reg.test($el.textContent)) {
                let key = RegExp.$1.trim();
                this.observeNode = $el;
                this.data[key];
                this.observeNode = null;
            } else if (childNode) {
                getCompile.bind(this)(childNode);
            }    
        }
    }
}

class Observe {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.vNode = [];
    }

    addNode(node) {
        this.vNode.push({
            node,
            text: node.textContent
        });
        this.updateNode();
    }

    updateNode(value) {
        if (value) {
            this.value = value;
        } else {
            value = this.value;
        }
        this.vNode.forEach(item => {
            let reg = new RegExp('\\{\\{\\s*' + this.key + '\\s*\\}\\}');
            let text = item.text.replace(reg, value);
            item.node.textContent = text;
        });
    }
}