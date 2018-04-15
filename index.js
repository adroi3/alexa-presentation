let express = require("express");
let alexa = require("alexa-app");
let expressApp = express();

const APP_PATH = 'helloworldmanager';

let app = new alexa.app(APP_PATH);

const PORT = 8080;

// setup the alexa app and attach it to express before anything else
app.express({
    expressApp: expressApp,

    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: false,

    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: true
});

app.launch(function (request, response) {
    response.say("Wilkommen");
});

app.intent("greeting", {
    "slots": { "name": "AMAZON.DE_FIRST_NAME" },
    "utterances": ["sage hallo zu {-|name}"]
},
    function (request, response) {
        let name = request.slot("name");
        
        request.getSession().set("name", name);

        response.say(`wollen sie ${name} hallo sagen?`).shouldEndSession(false);
    }
);

app.intent("AMAZON.YesIntent", null,
    function (request, response) {
        let name = request.getSession().get("name");

        response.say(`Hallo ${name}`);
    }
);

expressApp.listen(PORT);

console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + `/${APP_PATH}`);