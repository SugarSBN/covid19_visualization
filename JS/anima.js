function stringToInt(str){
  var res = 0;
  for (var i = 0;i < str.length;i++){
    if ('0' <= str.charAt(i) && str.charAt(i) <= '9'){
      res *= 10;
      res += str.charAt(i) - '0';
    }
  }
  return res;
}
var geometries = [];
for (i in countryCenter)  {
  var size = 10;
  var active = 0;
  var death = 0;
  var recovered = 0;

  for (var j = 0;j < countrySize.length;j++){
    var a = i.toLowerCase();
    var b = countrySize[j]["country"].toLowerCase();
    if (a == "us")  a = "united states";
    if (b == "us")  b = "united states";
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0){
      size = countrySize[j]["area"];
      break;
    }
  }
  if (i == "United States") size = 9363520.00;
  for (var j = 0;j < covid_confirmed.length;j++){
    var a = i.toLowerCase();
    var b = covid_confirmed[j][1].toLowerCase();
    if (b == "us")  b = "united states";
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0) active += stringToInt(covid_confirmed[j][covid_confirmed[j].length - 1]);
  }

  for (var j = 0;j < covid_death.length;j++){
    var a = i.toLowerCase();
    var b = covid_death[j][1].toLowerCase();
    if (b == "us")  b = "united states";
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0) death += stringToInt(covid_death[j][covid_death[j].length - 1]);
  }

  for (var j = 0;j < covid_recovered.length;j++){
    var a = i.toLowerCase();
    var b = covid_recovered[j][1].toLowerCase();
    if (b == "us")  b = "united states";
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0) recovered += stringToInt(covid_recovered[j][covid_recovered[j].length - 1]);
  }
  //console.log(i + ":" + active + "," + death + "," + recovered);

  var mk = new maptalks.Marker(countryCenter[i],
  {
    properties:{
      "area" : size,
      "active" : active - death - recovered
    }
  }
  );
  geometries.push(mk);
}  
var layer = new maptalks.AnimateMarkerLayer(
  'animatemarker',
  geometries,
  {
    'animation' : 'scale,fade',
    'randomAnimation' : true,
    'geometryEvents' : false,
  }
  );
var styles = [];
for (var i = 0;i < countrySize.length;i++){
  styles.push({
    filter : [
    'all',
    ['==', 'area', countrySize[i]["area"]],
    ['<=', 'active', 10]
    ],
    symbol : {
      'markerType' : 'ellipse',
      'markerLineWidth' : 0,
      'markerFill' : getGradient([144,238,144]),
      'markerFillOpacity' : 0.3,
      'markerWidth' : Math.sqrt(countrySize[i]["area"]) / 15 + 1,
      'markerHeight' : Math.sqrt(countrySize[i]["area"]) / 15 + 1
    }
  });
  styles.push({
    filter : [
    'all',
    ['==', 'area', countrySize[i]["area"]],
    ['<=', 'active', 100]
    ],
    symbol : {
      'markerType' : 'ellipse',
      'markerLineWidth' : 0,
      'markerFill' : getGradient([100,149,237]),
      'markerFillOpacity' : 0.3,
      'markerWidth' : Math.sqrt(countrySize[i]["area"]) / 20 + 1,
      'markerHeight' : Math.sqrt(countrySize[i]["area"]) / 20 + 1
    }
  });
  styles.push({
    filter : [
    'all',
    ['==', 'area', countrySize[i]["area"]],
    ['<=', 'active', 1000]
    ],
    symbol : {
      'markerType' : 'ellipse',
      'markerLineWidth' : 0,
      'markerFill' : getGradient([245,245,220]),
      'markerFillOpacity' : 0.3,
      'markerWidth' : Math.sqrt(countrySize[i]["area"]) / 20 + 1,
      'markerHeight' : Math.sqrt(countrySize[i]["area"]) / 20 + 1
    }
  });
  styles.push({
    filter : [
    'all',
    ['==', 'area', countrySize[i]["area"]],
    ['<=', 'active', 10000]
    ],
    symbol : {
      'markerType' : 'ellipse',
      'markerLineWidth' : 0,
      'markerFill' : getGradient([244,164,96]),
      'markerFillOpacity' : 0.3,
      'markerWidth' : Math.sqrt(countrySize[i]["area"]) / 20 + 1,
      'markerHeight' : Math.sqrt(countrySize[i]["area"]) / 20 + 1
    }
  });
  styles.push({
    filter : [
    'all',
    ['==', 'area', countrySize[i]["area"]],
    ['<=', 'active', 100000]
    ],
    symbol : {
      'markerType' : 'ellipse',
      'markerLineWidth' : 0,
      'markerFill' : getGradient([240,128,128]),
      'markerFillOpacity' : 0.3,
      'markerWidth' : Math.sqrt(countrySize[i]["area"]) / 20 + 1,
      'markerHeight' : Math.sqrt(countrySize[i]["area"]) / 20 + 1
    }
  });
  styles.push({
    filter : [
    'all',
    ['==', 'area', countrySize[i]["area"]],
    ['>=', 'active', 100000]
    ],
    symbol : {
      'markerType' : 'ellipse',
      'markerLineWidth' : 0,
      'markerFill' : getGradient([139,0,0]),
      'markerFillOpacity' : 0.3,
      'markerWidth' : Math.sqrt(countrySize[i]["area"]) / 20 + 1,
      'markerHeight' : Math.sqrt(countrySize[i]["area"]) / 20 + 1
    }
  });
}

styles.push({
  symbol : {
    'markerType' : 'ellipse',
    'markerLineWidth' : 0,
    'markerFill' : getGradient([100,149,237]),
    'markerFillOpacity' : 0.3,
    'markerWidth' : 10,
    'markerHeight' : 10
  }
});
layer.setStyle(styles);
layer.addTo(map);

function getGradient(colors) {
  return {
    type : 'radial',
    colorStops : [
      [0.70, 'rgba(' + colors.join() + ', 0.5)'],
      [0.30, 'rgba(' + colors.join() + ', 1)'],
      [0.20, 'rgba(' + colors.join() + ', 1)'],
      [0.00 , 'rgba(' + colors.join() + ', 0)']
    ]
  };
}