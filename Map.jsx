Map = React.createClass({

    propTypes: {
        earthquakes: React.PropTypes.array.isRequired
    },

    renderMap() {
        var map = new ol.Map({
            target: 'render-map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'sat'})
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([37.41, 8.82]),
                zoom: 4
            })
        });


        ReactDOM.render(map, document.getElementById("render-map"));
    },

    render() {
        return(
            <div>
                {this.renderMap()}
            </div>
        )
    }
});