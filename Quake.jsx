Quake = React.createClass({

    propTypes: {
        quake: React.PropTypes.object.isRequired
    },

    render() {
        var SCALE_EARTHQUAKES = 25;
        // TODO render at a lat/lon position

        var mag = parseFloat(this.props.quake.mag);

        var diameter;
        diameter = mag * SCALE_EARTHQUAKES;

        var radius = diameter / 2;

        // give the circle some color based its magnitude.
        // TODO set this to handle outliers as well
        var tint = 200 - 25*mag;


        var circle = {
            width: diameter + 'px',
            height: diameter + 'px',
            WebkitBorderRadius: radius + 'px',
            MozBorderRadius: radius + 'px',
            borderRadius: radius + 'px',
            background: "rgba(255, " + tint + "," + tint + "," + 0.5 + ")"
            //TODO implement opacity functionality
        };

        // TODO add back styling for circle
        //<div style={circle}></div>
        //<h5>Magnitude: {mag}</h5>


        return (
            <div>
            </div>
        )
    }

});