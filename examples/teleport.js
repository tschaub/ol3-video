var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  renderer: exampleNS.getRendererFromQueryString(),
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});

map.setTarget('map1');

var teleportButton = document.getElementById('teleport');

teleportButton.addEventListener('click', function() {
  var target = map.getTarget() === 'map1' ? 'map2' : 'map1';
  map.setTarget(target);
}, false);
