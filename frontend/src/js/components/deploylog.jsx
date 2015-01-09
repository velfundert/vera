var React = require('react');

var LogRow = require('./logrow.jsx')

module.exports = DeployLog = React.createClass({

    getInitialState: function () {
        return {
            applicationFilter: '',
            environmentFilter: '',
            deployerFilter: '',
            versionFilter: '',
            timestampFilter: ''
        };
    },

    handleChange: function (e) {
        this.state[e.target.id] = e.target.value
        this.setState(this.state);
    },

    render: function () {
        var applicationFilter = this.state.applicationFilter.trim().toLowerCase();
        var environmentFilter = this.state.environmentFilter.trim().toLowerCase();
        var deployerFilter = this.state.deployerFilter.trim().toLowerCase();
        var versionFilter = this.state.versionFilter.trim().toLowerCase();
        var timestampFilter = this.state.timestampFilter.trim().toLowerCase();

        var nonMatchingEvents = function (elem) {
            var application = elem.application.toLowerCase();
            var environment = elem.environment.toLowerCase();
            var deployer = elem.deployer.toLowerCase();
            var version = elem.version.toLowerCase();
            var timestamp = elem.timestamp;

            return application.indexOf(applicationFilter) > -1
                && environment.indexOf(environmentFilter) > -1
                && deployer.indexOf(deployerFilter) > -1
                && version.indexOf(versionFilter) > -1
                && timestamp.toString().indexOf(timestampFilter) > -1;
        }

        return (
            <div>
                <h1>Events ({this.props.items.filter(nonMatchingEvents).length + "/" + this.props.items.length})</h1>
                <table className='table table-striped'>
                    <tr>
                        <th>application</th>
                        <th>environment</th>
                        <th>deployer</th>
                        <th>version</th>
                        <th>timestamp</th>
                    </tr>
                    <tr>
                        <th>
                            <input id="applicationFilter" type="text" onChange={this.handleChange} />
                        </th>
                        <th>
                            <input id="environmentFilter" type="text" onChange={this.handleChange} />
                        </th>
                        <th>
                            <input id="deployerFilter" type="text" onChange={this.handleChange} />
                        </th>
                        <th>
                            <input id="versionFilter" type="text" onChange={this.handleChange} />
                        </th>
                        <th>
                            <input id="timestampFilter" type="text" onChange={this.handleChange} />
                        </th>
                    </tr>
                    <tbody>
                        {this.props.items
                            .filter(nonMatchingEvents)
                            .map(function (elem) {
                                return <LogRow key={elem._id} event={elem} />
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
});
