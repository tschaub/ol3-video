var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.BingMaps({
        key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
        imagerySet: 'Aerial'
      })
    })
  ],
  view: new ol.View2D({
    center: [-13553864, 5918250],
    zoom: 11,
    minZoom: 9,
    maxZoom: 13
  })
});
