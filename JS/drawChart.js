
function slices(){
    var confirmed = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0;i < covid_confirmed.length;i++){
        var a = nowName.toLowerCase();
        var b = covid_confirmed[i][1].toLowerCase();
        if (a == 'us')  a = "united states";
        if (b == 'us')  b = "united states";
        if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
            for (var j = 1;j < 8;j++){
                confirmed[confirmed.length - j] += stringToInt(covid_confirmed[i][covid_confirmed[i].length - j]);
            }
        }
    }
    var death = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0;i < covid_death.length;i++){
        var a = nowName.toLowerCase();
        var b = covid_death[i][1].toLowerCase();
        if (a == 'us')  a = "united states";
        if (b == 'us')  b = "united states";
        if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
            for (var j = 1;j < 8;j++){
                death[death.length - j] += stringToInt(covid_death[i][covid_death[i].length - j]);
            }
        }
    }
    var recovered = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0;i < covid_recovered.length;i++){
        var a = nowName.toLowerCase();
        var b = covid_recovered[i][1].toLowerCase();
        if (a == 'us')  a = "united states";
        if (b == 'us')  b = "united states";
        if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
            for (var j = 1;j < 8;j++){
                recovered[recovered.length - j] += stringToInt(covid_recovered[i][covid_recovered[i].length - j]);
            }
        }
    }
    var active = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0;i < 7;i++)   active[i] = confirmed[i] - recovered[i] - death[i];
    return [confirmed, death, recovered, active];
}

function drawChart(coor){
    var date = new Date();
    date.setDate(date.getDate() - 7);
    var series = [];
    for (var i = 0;i < 7;i++){
        series.push((date.getMonth() + 1) + "/" + date.getDate());
        date.setDate(date.getDate() + 1);
    }
    var datasets = slices();

    var highChartsUI = new maptalks.ui.UIMarker(coor, {
        'draggable'     : false,
        'content'       : createBar()
    });

    function createBar() {
        var dom = document.createElement('div');
        dom.style.cssText = 'min-width: 300px; min-height: 300px; margin: 0 auto; position:absolute;';
        new Highcharts.Chart({
            chart: {
                renderTo: dom,
                backgroundColor: 'rgba(106,90,205, 0.5)',
                type: 'area',
                spacingBottom: 30,
                width : 600,
                height : 450,
                reflow : true,
                borderRadius: 20,
            },
            title: {
                text: '近一周' + nowName + '地区疫情情况',
                style: {
                    "color" : "#000000",
                    "fontSize" : "24px"
                }
            },
            subtitle: {
                text: 'Data source: <a href="https://github.com/CSSEGISandData/COVID-19/blob/master/README.md" target="_blank"> https://github.com/CSSEGISandData/COVID-19/blob/master/README.md</a>'
            },
            xAxis: {
                categories: series
            },
            yAxis: {
                title: {
                    text: '人数(人)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                            // 开启数据标签
                            enabled: true          
                        },
                        // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: '累计确诊',
                    data: datasets[0],
                }, {
                    name: '累计死亡',
                    data: datasets[1],
                    fillColor: "#696969"
                },{
                    name: '累计治愈',
                    data: datasets[2],
                    fillColor: "#90EE90"
                },{
                    name: '现存确诊',
                    data: datasets[3],
                    fillColor: "#C71585"
                }]

            });
        return dom;
    }
    return highChartsUI;
}

function drawchartCenter(coor){
    var pos = {
        'x' : coor[0],
        'y' : coor[1]
    };
    var containerPoint = map.coordinateToContainerPoint(pos);
    containerPoint.x -= 50;
    containerPoint.y -= 130;
    var res = map.containerPointToCoordinate(containerPoint);
    return [res.x, res.y];
}