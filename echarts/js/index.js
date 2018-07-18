var _firstStockCode;    //主行情合约代码
var _secondStockCode;   //副行情合约代码
var _firstStockName;    //主行情合约代码
var _secondStockName;   //副行情合约代码
var _currentPeriod; //当前周期  0=>日线  1=>周线  2=>月线
var _currentRequestCount;  //当前请求条数
var _hadExchanged; //是否反转过
var _firstExchanged;    //是否为首次反转
var layerNative = new Layernative({coverHidden: 1}); 
$(function(){
    
    ljmPageStat.load({'id':'lj_web_bijia_xiangqing'});
    _hadExchanged = false;
    _firstExchanged = false;
        
    _currentPeriod = '0';
    _currentRequestCount = '66';
        
//  _firstStockCode =  "AGUSDO";
//  _secondStockCode = "03NID";
//  _firstStockName = "伦敦银";
//  _secondStockName = "LME镍3个月";
//  refreshView(false);
        
    //获取合约代码
    getNativeStockData();
    //导航栏右侧按钮
    alertHelpView();
});

function setStockName(f_stockcode, s_stockcode) {
    
    document.getElementById("first_stockname").innerHTML = f_stockcode;
    document.getElementById("second_stockname").innerHTML = s_stockcode;
}

function setAxisName(f_stockcode, s_stockcode) {
    document.getElementById("bijia_axisName_first").innerHTML = f_stockcode;
    document.getElementById("bijia_axisName_second").innerHTML = s_stockcode;
}

//从客户端获取合约代码等数据
function getNativeStockData() {
    callNativeHandler(
        'getNativeStockData',
        '',
        function(data) {
            var dataObj = eval(data);
            _secondStockCode = dataObj.secondStockCode;
            _secondStockName = dataObj.secondStockName;
            _firstStockCode = dataObj.firstStockCode;
            _firstStockName = dataObj.firstStockName;
            
            //刷新页面
            refreshView(false);
    });
}

var myChart = echarts.init(document.getElementById('echartu'));
//绘制曲线
function setAnyChartFun(f_stockname, s_stockname){
        console.log("setAnyChartFun",f_stockname,s_stockname);
        callNativeHandler(
            "writeLogToNative",
            {"log": "setAnyChartFun--f_stockname " + f_stockname +" s_stockname "+ s_stockname},
            function(data) {
            }
        );
        //var chartH = (window.screen.width-20)*0.59;

        var chartH = parseInt($('#echartu').height())/2 - 60;
        var bottomTop = chartH + 60;
        chartH = chartH+'px';
        bottomTop = bottomTop+'px';
        console.log("chartH",chartH);
        option = {
            color: ['#3398DB'],
            backgroundColor:'#f5f5f5',
            tooltip: {
                trigger: 'axis',
//              axisPointer: {      //光标刻度
//                  type: 'cross'
//              },
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: '#333333',
                padding: 10,
//              hideDelay: 50,
                confine: true,
                textStyle: {
                    color: '#000'
                },
                position: function (pos, params, el, elRect, size) {
                    var obj = {top: 10};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    return obj;
                },
//              formatter: '{b0}<br /> {a0} {c0} <br />{a1} {c1} <br />{a2} {c2}',
                formatter: function(a) {
                            var relVal = '';
                            var value0 = a[0].value;
                            var value1 = a[1].value;
                            var value2 = a[2].value;
                            if (typeof(value0)=="undefined" || value0 === 'null' || value0 == null){
                                value0 = "--";
                            }
                            if (typeof(value1)=="undefined" || value1 === 'null' || value1 == null){
                                value1 = "--";
                            }
                            if (typeof(value2)=="undefined" || value2 === 'null' || value2 == null){
                                value2 = "--";
                            }
                            if (a[0].seriesName === _firstStockName) {
                                relVal +='<span style="font-size:15px">'+ a[0].axisValue +'</span>'+ '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ff5039;"></span>'
                                + a[0].seriesName +' ' + value0 + 
                                '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#0a8fd4;"></span>'
                                + a[1].seriesName +' ' + value1 + 
                                '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ffae00;"></span>'
                                + a[2].seriesName +' ' + value2;
                            } else{
                                relVal +='<span style="font-size:15px">'+ a[0].axisValue +'</span>'+ '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ff5039;"></span>'
                                + a[1].seriesName +' ' + value1 + 
                                '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#0a8fd4;"></span>'
                                + a[2].seriesName +' ' + value2 + 
                                '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ffae00;"></span>'
                                + a[0].seriesName +' ' + value0;
                            }
                            
                            return relVal;
                    },
                extraCssText: 'width: 180px'
            },
            axisPointer: {
                z: 0,
                link: {xAxisIndex: 'all'},
                label: {
                    backgroundColor: '#777',
                    precision: '4'
                },
                lineStyle: {
                    color: '#333333',
                }
            },
            legend: {
                show: false,
            },
            grid: [
                {
                    left: '10px',
                    right: '10px',
                    top: '8px',
                    height: chartH,
    //              containLabel: true
                },
                {
                    left: '10px',
                    right: '10px',
                    top: bottomTop,
                    height: chartH,
    //              containLabel: true
                }
            ],
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    splitNumber: 1,
                    axisTick: {
//                      alignWithLabel: true,
                        interval: 20,
                        lineStyle: {    //坐标轴刻度线
                            width: 0,
                        }
                    },
                    axisLine: {     //坐标轴线
                        lineStyle:{
                            color: '#dddddd',
                            width: 0.5,
                        }
                    },
                    axisLabel: {
                        align: 'left',
                        fontSize: 10,
//                      margin: 2,
                        color: '#999999',
                    }
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    splitNumber: 1,
                    axisTick: {
//                      alignWithLabel: true,
                        interval: 20,
                        lineStyle: {    //坐标轴刻度线
                            width: 0,
                        }
                   },
                   axisLine: {      //坐标轴线
                        lineStyle:{
                            color: '#dddddd',
                            width: 0.5,
                        }
                    },
                   axisLabel: {
                        align: 'left',
                        fontSize: 10,
//                      margin: 2,
                        color: '#999999',
                    }
                }
            ],
            yAxis : [
                {
                    type: 'value',
//                  name: f_stockname,
                    position: 'left',
                    nameGap: 8,
//                  splitNumber: 4,
                    axisLine: {     //坐标轴线
                        lineStyle:{
                            color: '#dddddd',
                            width: 0.5,
                        }
                    },
                    axisLabel: {
                        inside: true,
                        fontSize: 10,
                        margin: 2,
                        color: '#999999',
                        formatter:function(value,index){
                            return  value.toFixed(2);
                        },
                    },
                    axisTick: {
                        alignWithLabel: true,
                        lineStyle: {    //坐标轴刻度线
                            width: 0,
                        }
                   },
                   splitLine: {
                        lineStyle: {
                            color: '#dddddd',
                            width: 0.5,
                        }
                   },
                },
                {
                    type: 'value',
//                  name: s_stockname,
                    position: 'right',
                    nameGap: 8,
//                  splitNumber: 4,
                    axisLine: {     //坐标轴线
                        lineStyle:{
                            color: '#dddddd',
                            width: 0.5,
                        }
                    },
                    axisLabel: {
                        inside: true,
                        fontSize: 10,
                        margin: 2,
                        color: '#999999',
                        formatter:function(value,index){
                            return  value.toFixed(2);
                        },
                    },
                    axisTick: {
                        alignWithLabel: true,
                        lineStyle: {    //坐标轴刻度线
                            width: 0,
                        }
                   },
                   splitLine: {
                        lineStyle: {
                            color: '#dddddd',
                            width: 0.5,
                        }
                   },
                },
                {
//                  scale: true,
                    gridIndex: 1,
                    type: 'value',
                    name: '品种价格比',
                    position: 'left',
                    nameGap: 8,
                    nameTextStyle: {    //坐标轴名称属性
                        fontSize: 13,
                        fontFamily: 'PingFang SC Medium',
                        color: '#333333',
//                      align: 'right',
                        width: 100,
                        padding: [0,0,0,65],
                    },
                    axisLine: {
                        lineStyle:{
                            color: '#dddddd',
                            width: 0.5,
                        }
                    },
                    axisLabel: {
                        inside: true,
                        fontSize: 10,
                        margin: 2,
                        color: '#999999',
                        formatter:function(value,index){
                            return  value.toFixed(4);
                        },
                    },
                    axisTick: {
                        alignWithLabel: true,
                        lineStyle: {    //坐标轴刻度线
                            width: 0,
                        }
                   },
                   splitLine: {
                        lineStyle: {
                            color: '#dddddd',
                            width: 0.5,
                        }
                   },
                },
            ],
            series : [
                {
                    name:f_stockname,
                    type:'line',
                    symbol: 'circle',
                    symbolSize: 1,
//                  barWidth: '20%',
                    yAxisIndex: 0, 
                    itemStyle:{
//                      borderType: ,
                        normal:{
                            color:'#ff5039',
                            lineStyle:{
                                width:1
                            }
                        }
                        
                    },
                },
                {
                    name:s_stockname,
                    type:'line',
                    yAxisIndex: 1,
                    symbol: 'circle',
                    symbolSize: 1,
                    itemStyle:{
                        normal:{
                            color:'#0a8fd4',
                            lineStyle:{
                                width:1
                            }
                        }
                    },
                },
                {
                    name:'品种价格比',
                    type:'line',
//                  barWidth: '20%',
                    xAxisIndex: 1,
                    yAxisIndex: 2, 
                    symbol: 'circle',
                    symbolSize: 1,
                    itemStyle:{
                        normal:{
                            color:'#ffae00',
                            lineStyle:{
                                width:1
                            }
                        }
                    },
                }
                
            ]
        };
         // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//赋值操作
function setEChartData(f_stockname, s_stockname) {
    console.log(f_stockname,s_stockname);
//  alert(f_stockname + s_stockname);
//  var dataAxis = _mergeDateArr;
//  var firstShoupanData =  _firstShoupanArr;
//  var secondShoupanData = _secondShoupanArr;
//  var jiaGeBiData = _jiaGeBiArr;
    
//  var yIndex1 = 0;
//  var yIndex2 = 1;
//  if (_hadExchanged) {
//      yIndex1 = 1;
//      yIndex2 = 0;
//  }
//  
    if (_hadExchanged){
        var tempArr = _firstShoupanArr;
        _firstShoupanArr = _secondShoupanArr;
        _secondShoupanArr = tempArr;
    }
        
//获取最大值最小值
        var firstInterval = (_firstMax-_firstMin)/5;
        firstInterval = firstInterval;
        var secondInterval = (_secondMax-_secondMin)/5;
        secondInterval = secondInterval;
         var  option1 = {
        legend: {
                data:[{
                    name: f_stockname,
                },
                {
                    name: s_stockname,
                }],
            },
        xAxis : [
                {
                    data : _mergeDateArr,
                },
                {
                    data: _mergeDateArr,
                }
            ],
            yAxis : [
                {
                    name: f_stockname,
                    min: _firstMin,
                    max: _firstMax,
                    interval: firstInterval,
                },
                {
                    name: s_stockname,
                    min: _secondMin,
                    max: _secondMax,
                    interval: secondInterval,
                },
                {
                    name:'品种价格比',
                    gridIndex: 1,
                    min: _biMin,
                    max: _biMax,
//                  min: 'dataMin',
                },
            ],
        series : [
                {
                    yAxisIndex: 0,
                    name:f_stockname,
                    data:_firstShoupanArr
                },
                {
                    yAxisIndex: 1,
                    name:s_stockname,
                    data:_secondShoupanArr
                },
                {
                    name:'品种价格比',
                    xAxisIndex: 1,
                    yAxisIndex: 2,
                    data:_jiaGeBiArr
                }
                
            ]
    }
        
    // 填入数据
    myChart.setOption(option1);
}

//请求行情数据
//period:0=> 日线 1=> 周线 2=> 月线
function requestStockData(marketid, stockCode, period, limit, callback){
    var urlStr = '//d.10jqka.com.cn/v6/line/' + marketid + '_' + stockCode + '/' + period + '0/last' + limit + '.js';
    var tempStockcode = stockCode.concat();
    tempStockcode = stockCode.replace(/@/, "__");   //解决callbackStr和接口返回的@被转换为__,
    
    var callbackStr = 'quotebridge_v6_line_' + marketid + '_' + tempStockcode +  '_' + period + '0_last' + limit;
    console.log("urlStr",urlStr);
    if ($('#main_hub').length <= 0) {
        addHub();
    }
    $.ajax({ 
        url: urlStr + '?_t=' + Date.now(), 
        dataType: 'text',
        contentType: "text/plain",
        async: false,
        type: 'get',
        //jsonpCallback: callbackStr,
        success: function(data){
            var _data = JSON.parse(data.substring(data.indexOf('(') + 1, data.indexOf(')')));
//          console.log(_data);
            var dic = new Array();
            dic = _data;
            var curveData = dic["data"];
            var dataArr = curveData.split(";");
            
            callNativeHandler(
                "writeLogToNative",
                {"log": "success curveData " + dataArr.length},
                function(data) {
                }
            );
            
            var dateArr=[]; //储存日期数组
            var shoupanArr=[];  //储存收盘价数组
            for (var i=0; i < dataArr.length; i++) {
                var value = dataArr[i];
                var dateDataArr = value.split(",");
                dateArr.push(dateDataArr[0]);
                shoupanArr.push(dateDataArr[4]);
            }
            
            requestSuccess(stockCode, dateArr, shoupanArr);
            
//          if (callback) {
//              callback();
//          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            /*错误信息处理*/
            removeHub();
            layerNative.alert('提示', '请求失败，请重试', 
                        [{word: '刷新', callback: function() {window.location.reload();}, callbackHidden: 1}]
                    );
            callNativeHandler(
                "writeLogToNative",
                {"log": "error " + XMLHttpRequest.readyState +" " + XMLHttpRequest.status + " " + textStatus +" " + errorThrown},
                function(data) {
                }
            );
        }
    });
}

var _mergeDateArr=[];
var _firstShoupanArr=[];
var _secondShoupanArr=[];
var _stockCodeArr=[];
var _jiaGeBiArr=[];
var _firstStandbyArr=[];
var _secondStandbyArr=[];
var _firstMax;
var _firstMin;
var _secondMax;
var _secondMin;
var _biMax;
var _biMin;

function requestSuccess(stockCode, dateArr, shoupanArr) {
    callNativeHandler(
                "writeLogToNative",
                {"log": "stockCode " + stockCode +"  shoupanArr " + shoupanArr.length},
                function(data) {
                }
            );
            
            
    if (stockCode == _firstStockCode) {
        _firstShoupanArr = [];
        _firstShoupanArr = shoupanArr;
    } else if (stockCode == _secondStockCode) {
        _secondShoupanArr=[];
        _secondShoupanArr = shoupanArr;
    }
    if (_stockCodeArr[stockCode] || _stockCodeArr.length>=2 || _stockCodeArr.length==0) {
        _stockCodeArr=[];
        _mergeDateArr=[];
        _stockCodeArr.push(stockCode);
        _mergeDateArr = dateArr;
    } else if (!_stockCodeArr[stockCode] && _stockCodeArr.length==1) {
        _stockCodeArr.push(stockCode);
        
        _firstStandbyArr = _firstShoupanArr.slice(0, 10);
        _secondStandbyArr = _secondShoupanArr.slice(0, 10);
        _firstShoupanArr.splice(0, 10);
        _secondShoupanArr.splice(0, 10);
        
        _firstMax = Math.max.apply(null,_firstShoupanArr);
        _firstMin = Math.min.apply(null,_firstShoupanArr);
        _secondMax = Math.max.apply(null,_secondShoupanArr);
        _secondMin = Math.min.apply(null,_secondShoupanArr);
        //当最大值与最小值差值小于20的时候保留两位小数
        if(_firstMax-_firstMin < 20) {
            _firstMax = _firstMax.toFixed(2);
            _firstMin = _firstMin.toFixed(2);
        }else {
            _firstMax = Math.ceil(Math.max.apply(null,_firstShoupanArr));
            _firstMin = Math.floor(Math.min.apply(null,_firstShoupanArr));
        }
        if(_secondMax-_secondMin < 20) {
            _secondMax = _secondMax.toFixed(2);
            _secondMin = _secondMin.toFixed(2);
        }else {
            _secondMax = Math.ceil(Math.max.apply(null,_secondShoupanArr));
            _secondMin = Math.floor(Math.min.apply(null,_secondShoupanArr));
        }
        
        dateArr.splice(0, 10);
        _mergeDateArr.splice(0, 10);
        
        if (stockCode == _firstStockCode) {
            _mergeDateArr = processArr(dateArr, _mergeDateArr);
        } else if (stockCode == _secondStockCode) {
            _mergeDateArr = processArr(_mergeDateArr, dateArr);
        }
        getJiaGeBi(_mergeDateArr);
//      setAnyChartFun();
        if (_hadExchanged) {
            setEChartData(_secondStockName, _firstStockName);
        }else {
            setEChartData(_firstStockName, _secondStockName);
        }
        
        if ($('#main_hub').length > 0) {
            removeHub();
        }
        
        callNativeHandler(
            "writeLogToNative",
            {"log": "_firstShoupanArr " + _firstShoupanArr.length +" _secondShoupanArr "+ _secondShoupanArr.length},
            function(data) {
            }
        );
    }
}

//数组合并去重
function mergeArr(arr1,arr2){  
    //不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响  
    var arr = arr1.concat();  
    //或者使用slice()复制，var arr = arr1.slice(0)  
    for(var i=0;i<arr2.length;i++){  
        arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0; 
    }
    arr = bubbleSort(arr);
    
    for(var i=0;i<arr.length;i++){
        if (arr1.indexOf(arr[i]) === -1) {
            _firstShoupanArr.splice(i, 0, 'null');
        } 
        if (arr2.indexOf(arr[i]) === -1) {
            _secondShoupanArr.splice(i, 0, 'null');
        }
    }
    
    return arr;  
}

//根据主行情数据处理副行情数据，主有副无，副则添加null；主无副有，副则删除
function processArr(arr1,arr2){
    var tempArr2=[];
    for(var i=0;i<arr1.length;i++){
        var value = arr2.indexOf(arr1[i]);
        if (value === -1) {
            tempArr2.push('null');
        }else {
            tempArr2.push(_secondShoupanArr[value]);
        }
    }

    _secondShoupanArr = tempArr2;
    
    return arr1;
}

//价格比
function getJiaGeBi(arr) {
    var firstValidValue;
    var secondValidValue;
    _jiaGeBiArr = [];
    
    console.log("getJiaGeBi",_firstExchanged, _hadExchanged);
//  if (_firstExchanged) {
//      _hadExchanged = !_hadExchanged;
//  }
    
    if (_firstShoupanArr[0] == 'null') {
        _firstStandbyArr.reverse();//数组反转 
        for (var i=0;i<_firstStandbyArr.length;i++) {
            if (_firstStandbyArr[i] != 'null'){
                firstValidValue = _firstStandbyArr[i];
                break;
            }
        }
    } else{
        firstValidValue = _firstShoupanArr[0];
    }
    if (_secondShoupanArr[0] == 'null') {
        _secondStandbyArr.reverse();//数组反转 
        for (var i=0;i<_secondStandbyArr.length;i++) {
            if (_secondStandbyArr[i] != 'null'){
                secondValidValue = _secondStandbyArr[i];
                break;
            }
        }
    } else{
        secondValidValue = _secondShoupanArr[0];
    }
    for(var i=0;i<arr.length;i++){
        var value;
        if (_firstShoupanArr[i] == 'null') {
            if (_hadExchanged) {
                value = _secondShoupanArr[i]/firstValidValue;
            } else{
                value = firstValidValue/_secondShoupanArr[i];
            }
            
            secondValidValue = _secondShoupanArr[i];
        } else if (_secondShoupanArr[i] == 'null') {
            if (_hadExchanged) {
                value = secondValidValue/_firstShoupanArr[i];
            } else{
                value = _firstShoupanArr[i]/secondValidValue;
            }
            
            firstValidValue = _firstShoupanArr[i];
        } else{
            if (_hadExchanged) {
                value = _secondShoupanArr[i]/_firstShoupanArr[i];
            } else{
                value = _firstShoupanArr[i]/_secondShoupanArr[i];
            }
            
            firstValidValue = _firstShoupanArr[i];
            secondValidValue = _secondShoupanArr[i];
        }
        _jiaGeBiArr.push(value.toPrecision(6));
    }
    
    _biMax = Math.max.apply(null,_jiaGeBiArr);
    _biMin = Math.min.apply(null,_jiaGeBiArr);
        //当最大值与最小值差值小于20的时候保留两位小数
    if(_biMax-_biMin < 5) {
        _biMax = _biMax.toFixed(4);
        _biMin = _biMin.toFixed(4);
    }else {
        _biMax = _biMax.toFixed(2);
        _biMin = _biMin.toFixed(2);
    }
}


//根据stockcode获取marketid
function getMarketIdWithStockcode(stockCode) {
    if(stockCode == "AGTD" || stockCode == "AUTD"|| stockCode == "mAUTD") {
        return "sj";
    }else if(stockCode == "AUUSDO" || stockCode == "AGUSDO" || stockCode == "@CL0Y" || stockCode == "@GC0W" || stockCode == "@SI0W" || stockCode == "@GC0Y" || stockCode == "@SI0Y" || stockCode == "03CAD" || stockCode == "03AHD" || stockCode == "03NID") {
        return "gqh";
    }else if(stockCode == "USDIND" || stockCode == "USDCNH") {
        return "wh";
    }
}

//冒泡排序
function bubbleSort(arr){
    for(var i=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}

$(".swiperTab li").on('click', function(e) {
    var index = $(this).index();
    changeNum(index);   //请求数据
    var md = $(this).attr('data-md');
    e.preventDefault()
    $(".swiperTab .active").removeClass('active');
    $(this).addClass('active');
    ljmPageStat.click({ "id": md });
    
});

$("#bijia_exchangedBtn").on('click', function(e) {
    clearData();
    var md = $(this).attr('data-md');
    ljmPageStat.click({ "id": md });
    _firstExchanged = true;
    
    if (_firstExchanged) {
        _hadExchanged = !_hadExchanged;
    }
    refreshView(_hadExchanged); 
    
});


$("#bijia_first_titleview").on('click', function(e) {
    callNativeHandler(
        "chooseNativeStockCode",
        '',
        function(data) {
            var dataObj = eval(data);
            if(dataObj.resultcode == '1') {
                if (_hadExchanged) {
                    if (dataObj.stockname == _firstStockName) {
                        callNativeHandler(
                            "webviewShowToast",
                            {"toastmessage": "所选行情与另一项重复", "toasttime": "0"},
                            function(data) {
                            }
                        );
                        return false;
                    } else if (dataObj.stockname == _secondStockName) {
                        return false;
                    }
                    _secondStockCode = dataObj.stockcode;
                    _secondStockName = dataObj.stockname;
                }else {
                    if (dataObj.stockname == _secondStockName) {
                        callNativeHandler(
                            "webviewShowToast",
                            {"toastmessage": "所选行情与另一项重复", "toasttime": "0"},
                            function(data) {
                            }
                        );
                        return false;
                    } else if (dataObj.stockname == _firstStockName) {
                        return false;
                    }
                    _firstStockCode = dataObj.stockcode;
                    _firstStockName = dataObj.stockname;
                }
                refreshView(_hadExchanged);
            }
    });
});

$("#bijia_second_titleview").on('click', function(e) {
    callNativeHandler(
        "chooseNativeStockCode",
        '',
        function(data) {
            var dataObj = eval(data);
            if(dataObj.resultcode == '1') {
                
                if (_hadExchanged) {
                    if (dataObj.stockname == _secondStockName) {
                        callNativeHandler(
                            "webviewShowToast",
                            {"toastmessage": "所选行情与另一项重复", "toasttime": "0"},
                            function(data) {
                            }
                        );
                        return false;
                    } else if (dataObj.stockname == _firstStockName) {
                        return false;
                    }
                    _firstStockCode = dataObj.stockcode;
                    _firstStockName = dataObj.stockname;
                }else {
                    if (dataObj.stockname == _firstStockName) {
                        callNativeHandler(
                            "webviewShowToast",
                            {"toastmessage": "所选行情与另一项重复", "toasttime": "0"},
                            function(data) {
                            }
                        );
                        return false;
                    } else if (dataObj.stockname == _secondStockName) {
                        return false;
                    }
                    _secondStockCode = dataObj.stockcode;
                    _secondStockName = dataObj.stockname;
                }
                refreshView(_hadExchanged);
            }
            
    });
});

function refreshView(needExchange) {
//  alert("refreshView " + needExchange);
    callNativeHandler(
        "writeLogToNative",
        {"log": "refreshView-needExchange" + needExchange},
        function(data) {
        }
    );
    if (needExchange == false) {
        setAnyChartFun(_firstStockName, _secondStockName)
        setStockName(_firstStockName, _secondStockName);
        setAxisName(_firstStockName, _secondStockName);
    } else{
        setAnyChartFun(_secondStockName, _firstStockName)
        setStockName(_secondStockName ,_firstStockName);
        setAxisName(_secondStockName ,_firstStockName);
    }
    var firstMarketId = getMarketIdWithStockcode(_firstStockCode);
    var secondMarketId = getMarketIdWithStockcode(_secondStockCode);
//  requestStockData(firstMarketId, _firstStockCode, _currentPeriod, _currentRequestCount, function() {
//      requestStockData(secondMarketId, _secondStockCode, _currentPeriod, _currentRequestCount);
//  });
    requestStockData(firstMarketId, _firstStockCode, _currentPeriod, _currentRequestCount,);
    requestStockData(secondMarketId, _secondStockCode, _currentPeriod, _currentRequestCount);
}

function alertHelpView() {
    callNativeHandler(
        "navBarRightButtonShow",
        {"isshow": "1","btnname": "帮助", "iscallback": "1", "afterclickenable": "1"},
        function(data) {
            var dataObj = eval(data);
            if(dataObj.resultcode == '1') {
                ljmPageStat.click({ "id": "lj_web_bijia_xiangqing.bangzhu" });
                btnActionCallBack();
                callNativeHandler(
                    "webviewShowToast",
                    {"toastmessage": "比价中若图像显示缺失，说明当日未非交易日，缺失期间价格比的算法按照该行情缺失前的最后一个数据进行计算", "toasttime": "1", "toasttype": "1"},
                    function(data) {
                        
                    }
                );
            }
    });
}

function btnActionCallBack() {
    callNativeHandler(
        "navBarRightButtonShow",
        {"isshow": "1","btnname": "帮助", "iscallback": "1", "afterclickenable": "1"},
        function(data) {
            var dataObj = eval(data);
            if(dataObj.resultcode == '1') {
                ljmPageStat.click({ "id": "lj_web_bijia_xiangqing.bangzhu" });
                btnActionCallBack();
                callNativeHandler(
                    "webviewShowToast",
                    {"toastmessage": "比价中若图像显示缺失，说明当日未非交易日，缺失期间价格比的算法按照该行情缺失前的最后一个数据进行计算", "toasttime": "1", "toasttype": "1"},
                    function(data) {
                        
                    }
                );
            }
    });
}

//changeNum(0);
function changeNum(index) {
    clearData();

    switch (index){
        case 0:
            _currentPeriod = '0';
            _currentRequestCount = '66';
            break;
        case 1:
            _currentPeriod = '0';
            _currentRequestCount = '130';
            break;
        case 2:
            _currentPeriod = '0';
            _currentRequestCount = '260';
            break;
        case 3:
            _currentPeriod = '1';
            _currentRequestCount = '156';
            break;
        case 4:
            _currentPeriod = '1';
            _currentRequestCount = '260';
            break;
        case 5:
            _currentPeriod = '2';
            _currentRequestCount = '120';
            break;
        default:
            break;
    }
    
    var firstMarketId = getMarketIdWithStockcode(_firstStockCode);
    var secondMarketId = getMarketIdWithStockcode(_secondStockCode);
//  requestStockData(firstMarketId, _firstStockCode, _currentPeriod, _currentRequestCount, function() {
//      requestStockData(secondMarketId, _secondStockCode, _currentPeriod, _currentRequestCount);
//  });
    requestStockData(firstMarketId, _firstStockCode, _currentPeriod, _currentRequestCount,);
    requestStockData(secondMarketId, _secondStockCode, _currentPeriod, _currentRequestCount);
}

function clearData() {
    _mergeDateArr=[];
    _firstShoupanArr=[];
    _secondShoupanArr=[];
    _stockCodeArr=[];
    _jiaGeBiArr=[];
    _firstStandbyArr=[];
    _secondStandbyArr=[];
    _firstMax = 0;
    _firstMin = 0;
    _secondMax = 0;
    _secondMin = 0;
}

function addHub(){
    $('.box').append("<div class='main' id='main_hub' style='z-index: 1000; position: absolute; margin: auto; width: 0.6rem; height: 0.6rem; left: 50%; top: 50%; transform: translate(-50%,-50%);'><img style='width: 0.6rem;' src='//i.thsi.cn/images/liejin/project/m/search/images/loading.gif' /></div>");
}

function removeHub(){
    $('#main_hub').remove();
}

if (!window.showDownload) {
    function showDownload() {};
}

