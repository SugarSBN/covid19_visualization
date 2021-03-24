var map = new maptalks.Map('map', {
        center:     [0,35.5],
        zoom:  3,
        minZoom: 3,
        maxZoom: 5,
        pitch : 0,
        baseLayer : new maptalks.TileLayer('base',{
          'urlTemplate': 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
          'subdomains'  : ['a','b','c','d']
        }),
        // additional TileLayers in create options
        layers : [
          new maptalks.TileLayer('boudaries',{
            'urlTemplate': 'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
            'subdomains'  : ['a','b','c','d']
          })
        ]
      });
var marker = new maptalks.Marker(
        [0, 70],
        {
          visible : true,
          editable : true,
          cursor : 'pointer',
          shadowBlur : 0,
          shadowColor : 'black',
          draggable : false,
          dragShadow : false, 
          drawOnAxis : null,  
          symbol : {
            'textFaceName' : 'sans-serif',
            'textName' : 'Double click to get start',
            'textFill' : '#FFFFFF',
            'textHorizontalAlignment' : 'center',
            'textSize' : 50
          }
        }
      );
var markers = [marker];
var animMarkerLayer = new maptalks.AnimateMarkerLayer('anim-markers', markers, {
	animationDuration : 1000,
	opacity : 0.3,
	animation : 'fade',
	fps : 60

}).addTo(map);

function changeView() {
	var pitch = 0, d = 'up', bearing = 0;
	var paused = false;
	map.setPitch(pitch++);
    map.setBearing(bearing++);
    if (!paused) {
        requestAnimationFrame(changeView);
    }
}

function flyTo(x, y, zoom, pitch, bearing) {
    map.animateTo({
	    	center: [x, y],
	    	zoom: zoom,
	        pitch: pitch,
	        bearing: bearing
	    }, {
	    	duration: 1000
		}
	);
}

var down = false, clicked = false;
var graph1, graph2, graph3, poly, id, nowName, chart, cen, label1, label2, label3;
map.on("dblclick", function(param){
	var z = param.coordinate.toFixed(5);
	if (!clicked){
		clicked = true;
		map.removeLayer(animMarkerLayer);
	}
	if (!down){
		down = true;
		id = checkCountry(z["x"], z["y"]);
		
		if (id != -1){
			nowName = boundaries["features"][id]["properties"]["ADMIN"];
			cen = getCenter(z["x"], z["y"], nowName);	

			poly = drawPoly(boundaries["features"][id]["geometry"]["coordinates"]);
			poly.addTo(map);

			chart = drawChart(drawchartCenter(cen));
			chart.addTo(map).show();

			console.log(nowName);

			var pos = {
			        'x' : cen[0],
			        'y' : cen[1]
			    };
		    var containerPoint = map.coordinateToContainerPoint(pos);
		    var tmp = getData();
		    var maxh = Math.max(Math.max(tmp[0], tmp[1]), tmp[2]);
			graph2 = drawAColumn([map.containerPointToCoordinate(containerPoint).x, map.containerPointToCoordinate(containerPoint).y], tmp[0] / maxh * 1500000, "#FF0000", 2);
			graph2.addTo(map);
			label1 = drawALabel([map.containerPointToCoordinate(containerPoint).x, map.containerPointToCoordinate(containerPoint).y], tmp[0] * 10, "感染" + tmp[0] + "人", 2, "#FF0000");
			label1.addTo(map);
			containerPoint.x += 45;
			containerPoint.y -= 8;
			graph3 = drawAColumn([map.containerPointToCoordinate(containerPoint).x, map.containerPointToCoordinate(containerPoint).y], tmp[1] / maxh * 1500000, "#696969", 3);
			graph3.addTo(map);
			label2 = drawALabel([map.containerPointToCoordinate(containerPoint).x, map.containerPointToCoordinate(containerPoint).y], tmp[1] * 10, "死亡" + tmp[1] + "人", 3, "#696969");
			label2.addTo(map);
			containerPoint.x -= 18;
			containerPoint.y += 40;
			graph1 = drawAColumn([map.containerPointToCoordinate(containerPoint).x, map.containerPointToCoordinate(containerPoint).y], tmp[2] / maxh * 1500000, "#98FB98", 1);
			graph1.addTo(map);
			label3 = drawALabel([map.containerPointToCoordinate(containerPoint).x, map.containerPointToCoordinate(containerPoint).y], tmp[2] * 10, "治愈" + tmp[2] + "人", 1, "#98FB98");
			label3.addTo(map);
		}
		cen = getCenter(z["x"], z["y"], nowName);	
		console.log(z["x"] + ',' + z["y"]);
		flyTo(cen[0], cen[1], 5, 50, 50);
	}else	{
		down = false;
		if (id != -1)	{
			map.removeLayer(poly);
			chart.hide();
			map.removeLayer(graph1);
			map.removeLayer(graph2);
			map.removeLayer(graph3);
			map.removeLayer(label1);
			map.removeLayer(label2);
			map.removeLayer(label3);
		}
		nowName = undefined;

		flyTo(0, 35.5, 3, 0, 0);
	}
});

