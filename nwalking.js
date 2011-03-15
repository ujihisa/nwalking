(function() {
  var addxy;
  addxy = function(ll1, x, y) {
    return new google.maps.LatLng(ll1.lat() + x, ll1.lng() + y);
  };
  $(function() {
    var _result, center, i, m, map, marker, n, xy;
    center = new google.maps.LatLng(49.285094, -123.095262);
    map = new google.maps.Map(document.getElementById("main"), {
      zoom: 18,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    marker = new google.maps.Marker({
      position: center,
      map: map,
      title: 'You are here'
    });
    n = 36;
    _result = [];
    for (i = 0; (0 <= n ? i < n : i > n); (0 <= n ? i += 1 : i -= 1)) {
      _result.push((function() {
        xy = {
          x: 0.001 * Math.sin(i * 2 * Math.PI / n),
          y: 0.001 * Math.cos(i * 2 * Math.PI / n)
        };
        return (m = new google.maps.Marker({
          position: addxy(center, xy.x, xy.y),
          map: map,
          title: 'sliced'
        }));
      })());
    }
    return _result;
  });
}).call(this);
