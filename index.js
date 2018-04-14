const EXPRESS = require("express");
const ALEXA = require("alexa-app");

const EXPRESSAPP = EXPRESS();

const APP_PATH = 'helloworldmanager';
const APP = new ALEXA.app(APP_PATH);

const PORT = 8080;

// setup the alexa app and attach it to express before anything else
APP.express({
    expressApp: EXPRESSAPP,

    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: false,

    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: true
});

APP.launch(function (request, response) {
    response.say("Wilkommen");
});

APP.intent("greeting", {
    "slots": { "name": "AMAZON.DE_FIRST_NAME" },
    "utterances": ["sage hallo zu {-|name}"]
},
    function (request, response) {
        var name = request.slot("name");
        response.say(`Hallo ${name}`);
    }
);

EXPRESSAPP.listen(PORT);

console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + `/${APP_PATH}`);