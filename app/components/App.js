var React = require('react');

var App = React.createClass({
	render: function (){
		return (<div>
			<h1>Hellooo World!</h1>
			<ul><li>List item one</li><li>List item two</li></ul>
<p>This page is somehow being served after being found by express after being found by node after being directed by server files which found the files that were built by webpack after being translated from JSX after being run through babel after being written as a component.</p>
			</div>);
	}
});

module.exports = App;
