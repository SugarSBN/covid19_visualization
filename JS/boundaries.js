function drawPoly(coordinates){
  var active = 0;
  var polygon = new maptalks.MultiPolygon(coordinates, {
        visible : true,
        editable : true,
        cursor : null,
        shadowBlur : 0,
        shadowColor : 'white',
        draggable : false,
        dragShadow : false,
        drawOnAxis : null,  
        symbol: {
          'lineColor' : '#000080',
          'lineWidth' : 1,
          'polygonFill' : 'rgb(25,25,112)',
          'polygonOpacity' : 0.3
        },
        properties :{
          altitude : 5000
        }
      });
  var res = new maptalks.VectorLayer("poly", polygon, {enableAltitude : true});
  return res;
}

function checkCountry(x, y){
  for(var i = 0; i < boundaries["features"].length;i++){
    var ins = false;
    var tmp = boundaries["features"][i]["geometry"]["coordinates"];
    for(var j = 0;j < tmp.length;j++){
      if (check(x, y, boundaries["features"][i]["geometry"]["coordinates"][j][0])){
        ins = true;
        break;
      }
    }
    if (ins) return i;
  }
  return -1;
}


function check(x, y, poly){
  var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var xi = poly[i][0], yi = poly[i][1];
        var xj = poly[j][0], yj = poly[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function getCenter(x, y, name){
  if (name == undefined)  return [x, y];
  var a = name.toLowerCase();
  if (a == "us")  a = "united states";
  for (i in countryCenter){
    var b = i.toLowerCase();
    if (b == "us")  b = "united states";
    if (a == b){
      return countryCenter[i];
    }
  }
  for (i in countryCenter){
    var b = i.toLowerCase();
    if (b == "us")  b = "united states";
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
      return countryCenter[i];
    }
  }
  return [x, y];
}