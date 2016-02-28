App = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            earthquakes: Quakes.find(query, {sort: {date: 1}}).fetch()
        }
    },

    renderQuakes() {
        return(
            this.data.earthquakes.map((quake) => {
                return <Quake key={quake._id} quake={quake}/>
            })
        )
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
        return (
        <div>{this.renderMap()}
        </div>
        )
    }
});