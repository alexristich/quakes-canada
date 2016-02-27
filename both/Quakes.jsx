Quakes = new Mongo.Collection('quakes');

var Schemas = {};

Schemas.Quake = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },

    lat: {
        type: Number,
        label: "Latitude"
    },

    lon: {
        type: Number,
        label: "Longitude"
    },

    mag: {
        type: Number,
        label: "Magnitude"
    },

    depth: {
        type: Number,
        label: "Earthquake Depth",
        optional: true
    },

    type: {
        type: String,
        label: "Earthquake Type",
        optional: true
    },

    momag: {
        type: Number,
        label: "Moment Magnitude",
        optional: true
    }
});


Quakes.attachSchema(Schemas.Quake);

Meteor.methods({
    // this contains all the methods to store and retrieve earthquake data
    
});