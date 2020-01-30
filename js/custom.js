//Popup Modals
const alertModal = (data) => {
  $('.modal').find(".modal-text").html(data);
  $('.modal').modal();
}

let map;

const initMap = (newLatLng) => {

  const latlng = new google.maps.LatLng(39.049094, -95.812996); //US Lat & Lng

  const mapOptions = {
    zoom: 19,
    center: (newLatLng) ? newLatLng : latlng,
    tilt: 0
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  //To set markers
  const markerOptions = {
    position: (newLatLng) ? newLatLng : latlng,
    map: map
  };

  let marker = new google.maps.Marker(markerOptions);
  
  //If autocomplete needed activate below code

  /*
  let autocomplete;
  let inputElem = document.getElementById('place_search');
  let autocompleteOptions = {
    componentRestrictions: {country: 'us'}
  };
  autocomplete = new google.maps.places.Autocomplete(inputElem, autocompleteOptions);
  */


  //Editable Shape

  let drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false,
    polygonOptions: { editable: true }
  });

  drawingManager.setMap(map);

  //On polygon shape completes
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    if (event.type != google.maps.drawing.OverlayType.MARKER) {
      drawingManager.setMap(null);
      drawingManager.setDrawingMode(null);


      let newShape = event.overlay;

      let area = google.maps.geometry.spherical.computeArea(newShape.getPath());
      area = area.toFixed(2);

		//Nominal Power (kWdc) = 108m(square) * 1 * 16% = 17.28
	const efficiency = 16;
	let nominalPower = area * efficiency / 100;
     nominalPower = nominalPower.toFixed(2);
      $(".meter_square").html(area);
      $(".nom_power").html(nominalPower);
      $(".calc_box").fadeIn();
    }
  });
}


const locateOnMap = () => {

  let placeString = document.getElementById('place_search').value;

  if(placeString !== '' && placeString !== ' ' && (placeString.length>0)) {
    let geocoder = new google.maps.Geocoder();

    let componentRestrictions = {
      country: 'US'
    };

    geocoder.geocode( { 'address': placeString, 'componentRestrictions' : componentRestrictions }, (results, status) => {
      if(status == 'OK') {

        $(".section_location").fadeOut("fast");
        $(".section_area").slideDown();
        
        initMap(results[0].geometry.location);

      } else {
        if(status = 'ZERO_RESULTS') {
          alertModal("Couldn't find your location within United States.");
        } else {
          alertModal("Geocode was not successful for the following reason: " + status);
        }
      }
    });

    map.setTilt(0);

  } else {
    //alert("Please add location below!");
    alertModal("Please add location below!");
  }
}