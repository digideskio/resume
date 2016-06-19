var config = {
	university: false,
	printer_friendly: false,
};

function setConfig(key, value) {
	config[key] = value;
	React.render(React.createElement(Resume, {resume: resume, config: config}), document.getElementById("page"));
}
