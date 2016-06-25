var OptionsDialog = React.createClass({

	propTypes: {
		options: React.PropTypes.object,
	},

	getInitialState: function(){ return {
		pulled_down = false,
	};},

	render: function() {
		return React.createElement("div",
			{ className: "options-header" },
			null
		);
	},

});
