Quakes = new Mongo.Collection('quakes');

var Schemas = {};

Schemas.Quake = new SimpleSchema({
    _id: {
        type: String,
        label: "Quake ID"
    },

    date: {
        // TODO change type back to Date after converting data to Date object type
        type: String,
        label: "Origin Time",
        optional: true
    },

    geoJSON: {
        type: Object,
        label: "GeoJSON Data",
        optional: true
    },

    "geoJSON.type": {
        type: String,
        label: "GeoJSON Type"
    },

    "geoJSON.coordinates": {
        type: Object,
        label: "Coordinates"
    },

    "geoJSON.coordinates.lat": {
        type: String,
        label: "Latitude"
    },

    "geoJSON.coordinates.lon": {
        type: String,
        label: "Longitude"
    },

    mag: {
        type: String,
        label: "Magnitude",
        optional: true
    },

    depth: {
        type: String,
        label: "Earthquake Depth",
        optional: true
    },

    magType: {
        type: String,
        label: "Magnitude Type",
        optional: true
    },

    momag: {
        type: String,
        label: "Moment Magnitude",
        optional: true
    }
});


Quakes.attachSchema(Schemas.Quake);

Meteor.methods({
    // this contains all the methods to store and retrieve earthquake data
    getEQData: function() {
        // TODO: figure out how to collate data from multiple sources
        HTTP.get("http://www.earthquakescanada.nrcan.gc.ca/api/earthquakes/latest/7d.json",
            function(error, result){
                Meteor.call("parseEQData", result.data);
        });
    },

    parseEQData: function(eqData) {
        var quakeName = {};
        for (var quake in eqData) {
            if (quake !== "metadata") {
                quakeName = quake;
                Meteor.call("addEarthquake", eqData[quakeName]);
            }
        }
    },

    addEarthquake: function(data) {
        // TODO parse location

        var quakeId = data.solution_id;

        var coordinates = {
            lat: data.geoJSON.coordinates[0],
            lon: data.geoJSON.coordinates[1]
        };

        JSONObject = {
            type: data.geoJSON.type,
                coordinates: coordinates
        };

        var quake = {
            _id: data.solution_id,
            // TODO set this as a JS Date object
            date: data.origin_time,
            geoJSON: JSONObject,
            mag: data.magnitude,
            depth: data.depth,
            magType: data.magnitude_type
        };

        Quakes.upsert({_id: quakeId}, {
            $set: quake
        });

        console.log(Quakes.findOne({_id: quakeId}));

        // TODO check if we need to change this to upsert when adding additional data sets

    },

    clearQuakes: function() {
        Quakes.remove({});
    }

});