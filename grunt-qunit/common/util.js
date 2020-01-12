window.Util = {
    isInt(val) {
        return 'number' === typeof val && val.toString().indexOf('.') < 0; 
    }
};
