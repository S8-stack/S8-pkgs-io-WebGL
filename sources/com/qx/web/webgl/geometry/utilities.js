


/*
 * Utilities
 */

var serverURL = "http://localhost:1337/";

function request(requestText, callback) {
	// Set up an asynchronous request
	var request = new XMLHttpRequest();


	// Hook the event that gets called as the request progresses
	request.onreadystatechange = function () {
		// If the request is "DONE" (completed or failed)
		if (request.readyState == 4) {
			// If we got HTTP status 200 (OK)
			if (request.status == 200 || request.status == 0) {
				callback(request);
			}
			// Failed
			else { 
				alert("Request failed");
			}
		}
	};
	
	request.open("POST", serverURL, true);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	request.send(requestText);    
}



/*
 * Utilities
 */

function rgb(r, g, b){
	return [r, g, b, 1.0];
};

function rgba(r, g, b, a){
	return [r, g, b, a];
};


