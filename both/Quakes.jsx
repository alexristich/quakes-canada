Quakes = new Mongo.Collection('quakes');

var Schemas = {};

Schemas.Quake = new SimpleSchema({
    id: {
        type: String,
        label: "Solution ID"
    },

    date: {
        // TODO change type back to Date after converting data to Date object type
        type: String,
        label: "Origin Time",
        optional: true
    },

    lat: {
        type: String,
        label: "Latitude"
    },

    lon: {
        type: String,
        label: "Longitude"
    },

    mag: {
        type: String,
        label: "Magnitude"
    },

    depth: {
        type: String,
        label: "Earthquake Depth",
        optional: true
    },

    type: {
        type: String,
        label: "Earthquake Type",
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


        console.log(Quakes.find({}).fetch())
    },

    addEarthquake: function(quakeData) {
        // TODO add quake
        // TODO parse location

        var quake = {
            id: quakeData.solution_id,
            // TODO set this as a JS Date object
            date: quakeData.origin_time,
            lat: quakeData.geoJSON.coordinates[0],
            lon: quakeData.geoJSON.coordinates[1],
            mag: quakeData.magnitude,
            depth: quakeData.depth,
            type: quakeData.magnitude_type
        };

        console.log(quake);

        // TODO check if we need to change this to upsert when adding additional data sets
        Quakes.insert(quake);
    }

});