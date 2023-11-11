

/**
 * local session
 */

session.udpate = function(){};
session.prompt_login = function(content, callbackSucceed, callbackFailed){
	var username = "toto";
	var password = "1234";
	this.login(content, callbackSucceed, callbackFailed, username, password);
};

/**
 * override request
 */
request = function(content, callback, configure){
	session.request(content, callback,
			function(xhr){ alert("Request failed due to:"+xhr.statusText); },
			configure);
}
