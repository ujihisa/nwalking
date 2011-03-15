#xy2rp = (xy) ->
#  {r: Math.sqrt(Math.pow(xy.x, 2) + Math.pow(xy.y, 2)), p: Math.atan2(xy.y, xy.x)}
#rp2xy = (rp) ->
#  {x: rp.r * Math.cos(rp.p), y: rp.r * Math.sin(rp.p)}
#xy2latlng = (xy) ->
#  new google.maps.LatLng(xy.x, xy.y)
addxy = (ll1, x, y) ->
  new google.maps.LatLng(ll1.lat() + x, ll1.lng() + y)

Nwalking =
  putRoute: (map, r) ->
    dr = new google.maps.DirectionsRenderer()
    dr.setMap map
    dr.setDirections(r)
  lookupRoute: (center, destination, map, trial) ->
    return if trial < 0
    ds = new google.maps.DirectionsService()
    ds.route {origin: center, destination: destination, travelMode: google.maps.DirectionsTravelMode.WALKING}, (r, s) ->
      return unless s is google.maps.DirectionsStatus.OK
      seconds = r.routes[0].legs[0].duration.value
      if seconds < 300
        new google.maps.Marker
          position: destination
          map: map
          title: "#{Math.floor(seconds / 60)} min #{seconds % 60} sec"
        #Nwalking.putRoute(map, r)
      else
        Nwalking.lookupRoute(center, Nwalking.between(center, destination), map, trial - 1)
  between: (l1, l2) ->
    new google.maps.LatLng(0.1*l1.lat() + 0.9*l2.lat(), 0.1*l1.lng() + 0.9*l2.lng())

$ ->
  center = new google.maps.LatLng 49.285178, -123.095241
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
    e = 0.005
    xy = {x: e * Math.sin(i * 2 * Math.PI / n), y: e * Math.cos(i * 2 * Math.PI / n)}
    position = addxy(center, xy.x, xy.y)
    Nwalking.lookupRoute center, position, map, 10

  #$('#map').text 'hello'
