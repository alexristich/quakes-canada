Map = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            earthquakes: Quakes.find(query).fetch()
        }
    },


    render() {
        // initialize a blank vectorSource
        var vectorSource = new ol.source.Vector({});

        //get geoJSON features
        var geoJSONParser = new ol.format.GeoJSON({});

        vectorSource.addFeatures(geoJSONParser.readFeatures(this.data.earthquakes));

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
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
                zoom: 4
            })
        });

        // rendering in this case is handled by OpenLayers
        return (
            <div />
        )
    }

});