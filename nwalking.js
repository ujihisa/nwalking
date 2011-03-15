(function() {
  var Nwalking, addxy;
  addxy = function(ll1, x, y) {
    return new google.maps.LatLng(ll1.lat() + x, ll1.lng() + y);
  };
  Nwalking = {
    putRoute: function(map, r) {
      var dr;
      dr = new google.maps.DirectionsRenderer();
      dr.setMap(map);
      return dr.setDirections(r);
    },
    lookupRoute: function(center, destination, map, trial) {
      var ds;
      if (trial < 0) {
        return null;
      }
      ds = new google.maps.DirectionsService();
      return ds.route({
        origin: center,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.WALKING
      }, function(r, s) {
        var seconds;
        if (s !== google.maps.DirectionsStatus.OK) {
          return null;
        }
        seconds = r.routes[0].legs[0].duration.value;
        if (seconds < 240) {

        } else if (seconds < 300) {
          return new google.maps.Marker({
            position: r.routes[0].legs[0].end_location,
            map: map,
            title: ("" + (Math.floor(seconds / 60)) + " min " + (seconds % 60) + " sec")
          });
        } else {
          return Nwalking.lookupRoute(center, Nwalking.between(center, destination), map, trial - 1);
        }
      });
    },
    between: function(l1, l2) {
      return new google.maps.LatLng(0.1 * l1.lat() + 0.9 * l2.lat(), 0.1 * l1.lng() + 0.9 * l2.lng());
    }
  };
  $(function() {
    var center, map;
    center = new google.maps.LatLng(49.285178, -123.095241);
    map = new google.maps.Map(document.getElementById("main"), {
      zoom: 17,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    return google.maps.event.addListener(map, 'click', function(event) {
      var _result, e, i, marker, n, position, xy;
      center = event.latLng;
      marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'You are here'
      });
      n = 36;
      _result = [];
      for (i = 0; (0 <= n ? i <= n : i >= n); (0 <= n ? i += 1 : i -= 1)) {
        _result.push((function() {
          e = 0.005;
          xy = {
            x: e * Math.sin(i * 2 * Math.PI / n),
            y: e * Math.cos(i * 2 * Math.PI / n)
          };
          position = addxy(center, xy.x, xy.y);
          return Nwalking.lookupRoute(center, position, map, 10);
        })());
      }
      return _result;
    });
  });
}).call(this);
