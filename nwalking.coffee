#xy2rp = (xy) ->
#  {r: Math.sqrt(Math.pow(xy.x, 2) + Math.pow(xy.y, 2)), p: Math.atan2(xy.y, xy.x)}
#rp2xy = (rp) ->
#  {x: rp.r * Math.cos(rp.p), y: rp.r * Math.sin(rp.p)}
#xy2latlng = (xy) ->
#  new google.maps.LatLng(xy.x, xy.y)
addxy = (ll1, x, y) ->
  new google.maps.LatLng(ll1.lat() + x, ll1.lng() + y)

$ ->
  center = new google.maps.LatLng 49.285094, -123.095262
  map = new google.maps.Map document.getElementById("main"),
    zoom: 18
    center: center
    mapTypeId: google.maps.MapTypeId.ROADMAP
  marker = new google.maps.Marker
    position: center
    map: map
    title: 'You are here'
  n = 36 
  for i in [0...n]
    xy = {x: 0.001 * Math.sin(i * 2 * Math.PI / n), y: 0.001 * Math.cos(i * 2 * Math.PI / n)}
    m = new google.maps.Marker
      position: addxy(center, xy.x, xy.y)
      map: map
      title: 'sliced'
  #$('#map').text 'hello'
