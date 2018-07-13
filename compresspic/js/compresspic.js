function CompressPic(item) {
    var config = {
        // 图片限定在多少k以下
        limitSize: 500,
        // 展现图片img dom
        $showImg: document.getElementsByClassName('resultimg')[0],
        // 压缩质量
        compressQua: 0.9,
        // 设定宽高
        rect: {
            // 设定的宽度
            width: 400,
            // 设定的高度
            height: 500   
        }
    };

    function init() {
        for (var i in config) {
            if ('undefined' !== typeof item[i]) {
                config[i] = item[i];
            }
        } 
        config.limitSize = config.limitSize * 1024;
    }

    // 获取最后上传的formdata
    function getFormData(e, callback) {
        var _file = e.target.files[0],
            _formData = new FormData(),
            _originSize = getImgSize(_file),
            _scale = _originSize/config.limitSize > 1 ? 1 : 0;

        if (_scale) {
            getOriginImgUrl(e, function(originUrl) {
                compressImgToLimit(originUrl, function(imgBlob) {
                    _formData.append('fileupload', imgBlob);
                    callback(_formData);
                });
            });
        } else {
            getOriginImgUrl(e, function(url) {
                showResultImg(url);
            });
            _formData.append('fileupload', _file);
            callback(_formData);
        }
    }

    function showResultImg(url) {
        document.getElementById('resultimg').src = url;
    }

    // base64 转 二进制文件
    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]), 
            mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0], 
            ab = new ArrayBuffer(byteString.length), 
            ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }

    // 从input中获取上传的base64图片格式
    function getOriginImgUrl(e, callback) {
        var _file = e.target.files[0],
            _reader = new FileReader();

        _reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            var _dataURL = _reader.result;
            if (callback) {
                callback(_dataURL);
            }
        };

        _reader.readAsDataURL(_file); // 读出 base64
    }

    // 获得图片的大小
    function getImgSize(file) {
        if (!file.constractor === FormData) {
            var _formData = new FormData();
            _formData.append('file', file);
            return _formData.get('file').size;
        } else {
            return file.size;
        }
    }

    // 压缩图片至要求占内存大小内
    function compressImgToLimit(src, callback, scale, lastScale) {
        var _scale = scale ? scale : 1,
            _lastScale = lastScale ? lastScale : 1;

        compressImg(src, _scale, function (base64) {
            var _imgBlob = dataURItoBlob(base64),
                _originSize = getImgSize(_imgBlob);
            if (_originSize > config.limitSize) {
                _scale = (_originSize/config.limitSize) * _lastScale;
                _lastScale = _scale;
                compressImgToLimit(src, callback, _scale, _lastScale);
            } else {
                showResultImg(base64);
                callback(_imgBlob);
            }
        });
    }

    // 利用canvas按比例压缩图片
    function compressImg(src, scale, callback) {
        var _img = new Image(),
            _scale = scale*config.compressQua;

        _img.onload = function (event) {
            // 按比例设置修改画布内图片的宽高
            var _width = _img.width/_scale,
                _height = _img.height/_scale,
                _canvas = document.createElement('canvas'),
                _ctx = _canvas.getContext('2d');

            _canvas.width = _width;
            _canvas.height = _height;

            _ctx.drawImage(_img, 0, 0, _width, _height);

            var _dataURL = _canvas.toDataURL('image/jpeg', config.compressQua);

            if (callback) {
                callback(_dataURL);
            }

        };

        _img.src = src;
    }

    init();

    return {
        getFormData: getFormData
    };
}