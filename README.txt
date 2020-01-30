How to access the app?
Open index.html in browser and run it. To make it easy to access, used js and jQuery.


Created the Solar Web Calculator, which calculates area and shows Nominal Power.

I have used Twitter Bootstrap for UI to simplify & platform support.

For functionality used JavaScript & jQuery Library for animations and DOM manipulation.

	- Divided app into two parts:
	
		1. Searching & Validating Location
		
		2. Drawing on Map & Calculating Nominal Power
		
	
	Searching & Validating Location:
		
		Used Google Map API's as it is most commonly used Map API, and is quite reliable with accuracy and it's response time.
		
		Also bounded the location search to United States.
		
		Commented Autocomplete code as well with bounding that as well with United States.
		
	Drawing on Map & Calculating Nominal Power:
	
		Used Google Map API's drawingManager event listener for enabling drawing polygon over map.
		
		Which helps to get area in meter square units.
		
		Further converted meter square area output to Nominal Power with below approximate assumption:
			
			Nominal Power (kWdc) = Area (meter square) * 1 kW/m(square) * Module Effciency (%)
			
			Assuming efficency to 16%, as it depends on module.
			
			Example: Nominal Power (kWdc) = 108m(square) * 1 * 16% = 17.28
			

		
		
		