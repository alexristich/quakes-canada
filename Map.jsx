Map = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            earthquakes: Quakes.find(query).fetch()
        }
    },

    getQuake() {
        return this.data.earthquakes[0];
    },

    renderFeatures(vectorSource) {
        return (
         this.data.earthquakes.map((quake) => {
             vectorSource.addFeature(new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(
                    [quake.feature.geometry.coordinates.lon, quake.feature.geometry.coordinates.lat]))
            }));
             console.log("This is the lon: " + quake.feature.geometry.coordinates.lon);
             console.log("This is the lat: " + quake.feature.geometry.coordinates.lat)
        }))
    },

    render() {

        var image = new ol.style.Circle({
            radius: 20,
            fill: null,
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        });

        var styles = {
            'Point': new ol.style.Style({
                image: image
            })
        };

        // initialize a blank vectorSource
        var vectorSource = new ol.source.Vector({});

        var geojsonObject = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0, 0]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': ol.proj.fromLonLat([-96, 61])
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': ol.proj.fromLonLat([0, 0])
                }
            }]
        };

        vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
        });

        var quakeToInsert = this.getQuake();

        var newFeatures =                 {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': ol.proj.fromLonLat([0, 0])
                    }
                }]
        };

        this.renderFeatures(vectorSource);


        if (quakeToInsert) {
            vectorSource.addFeature(new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(
                [quakeToInsert.feature.geometry.coordinates.lon,
                quakeToInsert.feature.geometry.coordinates.lat]))));
            console.log("Quake latitude: " + quakeToInsert.feature.geometry.coordinates.lat);
            console.log("Quake longitude: " + quakeToInsert.feature.geometry.coordinates.lon);
        }




        //get geoJSON features
        //var geoJSONParser = new ol.format.GeoJSON({});

        //for (var i=0; i<this.data.earthquakes.length; i++) {
        //    var feature = geoJSONParser.readFeature(this.data.earthquakes[i].feature);
        //    vectorSource.addFeatures(feature)
        //}
        var styleFunction = function(feature) {
            return styles[feature.getGeometry().getType()];
        };

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
        });

        var map = new ol.Map({
            target: 'render-map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.Stamen({layer: 'toner'})
                }),
                vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([-96, 61]),
                zoom: 2
            })
        });

        // rendering in this case is handled by OpenLayers
        return (
            <div />
        )
    }


});