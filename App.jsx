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


    render() {
        return (
        <div>
            <h1>Hello!</h1>
            <ul>
                {this.renderQuakes()}
            </ul>
        </div>
        )
    }
});