var React = require('react');
var Clock = require('./Clock.js');

var App = React.createClass({
	render: function (){
		return (<div>
			<h1>Hellooo World!</h1>
<h3>The time is {new Date().toLocaleTimeString()}.</h3>
<Clock time="Three!"/>

			<ul><li>List item one</li><li>List item two</li></ul>
<p>This page is somehow being served after being found by express after being found by node after being directed by server files which found the files that were built by webpack after being translated from JSX after being run through babel after being written as a component.</p>
<p>Also, it is connected to a running MongoDB. There is no reason that is true, however.</p>
<p>Also, the entire thing is written in React, which I neglected to mention above.</p>
<p>It is not interactive or interesting or styled in any way.</p>
			</div>);
	}
});

module.exports = App;
