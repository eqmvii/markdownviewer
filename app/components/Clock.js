var React = require('react');

/*class Clock extends React.Component {
	render () {
		return <h1>Clock Works! It is {this.props.time} o'clock!</h1>
	}
}*/

var Clock = React.createClass ({
	render: function () {
		return <h1>This is with CreateClass!</h1>
	}
})

module.exports = Clock;
