if (Meteor.isClient) {
    // This code is executed on the client only

    Meteor.startup(function () {
        // Use Meteor.startup to render the component after the page is ready
        Meteor.subscribe("quakes");

        ReactDOM.render(<Map />, document.getElementById("render-map"));
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.call("clearQuakes");
        Meteor.call('getEQData');

    });
}

