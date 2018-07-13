var $input = document.getElementById('input'),
    compressPic = new CompressPic({
        limitSize: 500, 
        // $showImg: document.getElementById('resultimg'),
        compressQua: 0.9
    });

$input.addEventListener('change', function(event) {
    compressPic.getFormData(event, function(fd) {
        console.log(fd);
    });
}, false);
