function drawAColumn(coor, alt, col, num){
  var valt = alt * (90 - Math.abs(coor[1]) + 10) / 90;

  var line = new maptalks.LineString(
        drawASquare(coor)
    , {
        symbol: {
          'lineColor' : col,
          'lineWidth' : 1
        },
        properties : {
          'altitude' : [valt, valt, valt, valt, valt]
        }
      });
  var graph = new maptalks.VectorLayer(
    'vector' + num, 
    [line], 
    { 
        enableAltitude : true, 
        drawAltitude : {
          polygonFill : col,
          polygonOpacity : 0.3,
          lineWidth : 0
      }
    }
  );
  return graph;
}

function drawALabel(coor, alt, text, num, col){

  var valt = alt * (90 - Math.abs(coor[1]) + 10) / 90;
  valt = valt / 10;
  var point = new maptalks.Marker(
        coor,
        {
          properties : {
            altitude : valt
          },
          symbol : {
            'textFaceName' : 'sans-serif',
            'textName' : text,
            'textFill' : col,
            'textHorizontalAlignment' : 'center',
            'textSize' : 20
          }
        }
      );
  return new maptalks.VectorLayer('label' + num, point);
}

function drawASquare(coor){
    var res = [];
    var pos = {
        'x' : coor[0],
        'y' : coor[1]
    };
    var containerPoint = map.coordinateToContainerPoint(pos);
    containerPoint.x -= 5;
    containerPoint.y += 5;
    res.push(map.containerPointToCoordinate(containerPoint));
    containerPoint.x += 10;
    res.push(map.containerPointToCoordinate(containerPoint));
    containerPoint.y -= 10;
    res.push(map.containerPointToCoordinate(containerPoint));
    containerPoint.x -= 10;
    res.push(map.containerPointToCoordinate(containerPoint));
    containerPoint.y += 10;
    res.push(map.containerPointToCoordinate(containerPoint));

    return res;
}

function getData(){
    var recoverednum = 0;
    for (var i = 0;i < covid_recovered.length;i++){
        var a = nowName.toLowerCase();
        var b = covid_recovered[i][1].toLowerCase();
        if (a == 'us')  a = "united states";
        if (b == 'us')  b = "united states";
        if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
           recoverednum += stringToInt(covid_recovered[i][covid_recovered[i].length - 1]); 
        }
    }
    var deathnum = 0;
    for (var i = 0;i < covid_death.length;i++){
        var a = nowName.toLowerCase();
        var b = covid_death[i][1].toLowerCase();
        if (a == 'us')  a = "united states";
        if (b == 'us')  b = "united states";
        if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
            deathnum += stringToInt(covid_death[i][covid_death[i].length - 1]);
        }
    }
    var confirmednum = 0;
    for (var i = 0;i < covid_confirmed.length;i++){
        var a = nowName.toLowerCase();
        var b = covid_confirmed[i][1].toLowerCase();
        if (a == 'us')  a = "united states";
        if (b == 'us')  b = "united states";
        if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
            confirmednum += stringToInt(covid_confirmed[i][covid_confirmed[i].length - 1]);
        }
    }
    return [confirmednum, deathnum, recoverednum];
}