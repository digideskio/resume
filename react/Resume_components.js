var ResumeHeader = React.createClass({

	propTypes: {
		info: React.PropTypes.object,
		config: React.PropTypes.object,
	},

	render: function() {
		var config = this.props.config;
		return (
			React.createElement("div", {
				className: "resume" +
				(config.printer_friendly ? " printer-friendly" : ""),
			}, [
				React.createElement("h1", { className: "header" }, [this.props.info.name]),
				React.createElement("div", { className: "info" }, [
					React.createElement("a", { className: "info-entry", href: "mailto:"+this.props.info.email }, [this.props.info.email]),
					React.createElement("br"),
					React.createElement("a", { className: "info-entry", href: this.props.info.website }, [this.props.info.website]),
					React.createElement("br"),
					React.createElement("a", { className: "info-entry", href: this.props.info.github }, [this.props.info.github]),
					React.createElement("br"),
					React.createElement("a", { className: "info-entry", href: "tel:"+this.props.info.phone }, [phone_number(this.props.info.phone)]),
					(config.university === true) ? React.createElement("br") : null,
					(config.university === true) ? React.createElement("span", { className: "info-entry" }, [phone_number(this.props.info.u_email)]) : null,
				]),
			])
		);
	},

});



var SkillSummary = React.createClass({

	propTypes: {
		skills: React.PropTypes.array
	},

	render: function() {
		var arr = [];
		for (var a = 0; a < this.props.skills.length; ++a) {
			var skill = this.props.skills[a];
			arr.push(React.createElement("li", {key: a}, [skill]))
		}
		return React.createElement("div", {},
			React.createElement("h2", {className: "section-header skills-header"}, ["Skill Summary"]),
			React.createElement("ul", {}, arr)
		);
	}

})




var ProjectEntry = React.createClass({

	propTypes: {
		project: React.PropTypes.object
	},

	render: function() {

		var description = null;
		if (this.props.project.description) {
			description = React.createElement("p", {className: "project-description"}, [this.props.project.description]);
		}

		var points = null;
		if (this.props.project.points) {
			point_lis = [];
			for (var a = 0; a < this.props.project.points.length; ++a) {
				point_lis.push(React.createElement("li", {}, this.props.project.points[a]));
			}
			points = React.createElement("ul", {}, point_lis);
		}

		return (
			React.createElement("div", {
				className: "entry",
			},[
				React.createElement("h3", {className: "project-title"}, [this.props.project.name]),
				React.createElement("div", {className: "rightinfo"}, [
					React.createElement("h4", {className: "project-company"}, [this.props.project.company]),
					React.createElement("h5", {className: "project-date"}, [datespan(this.props.project.date_from, this.props.project.date_to, 2)]),
				]),
				description,
				points,
			])
		);

	},

});



var ProjectList = React.createClass({

	propTypes: {
		projects: React.PropTypes.array
	},

	render: function() {

		var arr = [];

		for (var a = 0; a < this.props.projects.length; ++a) {
			arr.push(React.createElement(ProjectEntry, {
				key: a,
				project: this.props.projects[a]
			}));
		}

		return (
			React.createElement("div", {className: "projects"}, [
				React.createElement("h2", {className: "section-header projects-header"}, ["Projects"]),
				arr
			])
		);
	},

});




var JobEntry = React.createClass({

	propTypes: {
		job: React.PropTypes.object
	},

	render: function() {

		var description = null;
		if (this.props.job.description) {
			description = React.createElement("p", {className: "job-description"}, [this.props.job.description]);
		}

		var points = null;
		if (this.props.job.points) {
			var point_lis = [];
			for (var a = 0; a < this.props.job.points.length; ++a) {
				point_lis.push(React.createElement("li", {}, this.props.job.points[a]));
			}
			points = React.createElement("ul", {}, point_lis);
		}

		return (
			React.createElement("div", {
				className: "entry",
			},[
				React.createElement("h3", {className: "job-title"}, [this.props.job.title]),
				React.createElement("div", {className: "rightinfo"}, [
					React.createElement("h4", {className: "job-company"}, [this.props.job.company]),
					React.createElement("h5", {className: "job-date"}, [datespan(this.props.job.date_from, this.props.job.date_to, 2)]),
				]),
				description,
				points,
			])
		);

	},

});



var WorkExperience = React.createClass({

	propTypes: {
		jobs: React.PropTypes.array
	},

	render: function() {

		var arr = [];

		for (var a = 0; a < this.props.jobs.length; ++a) {
			arr.push(React.createElement(JobEntry, {
				key: a,
				job: this.props.jobs[a]
			}));
		}

		return (
			React.createElement("div", {className: "work-experience"}, [
				React.createElement("h2", {className: "section-header work-exp-header"}, ["Work Experience"]),
				arr
			])
		);
	},

});




var SchoolEntry = React.createClass({

	propTypes: {
		school: React.PropTypes.object
	},

	render: function() {

		var term = null;
		if (this.props.school.term)
			term = React.createElement("li", {}, ["Currently in term " + this.props.school.term]);

		var grad_date = null;
		if (this.props.school.grad_date) {
			if (this.props.school.date_to === "present") {
				grad_date = React.createElement("li", {}, ["Expected graduation date: " + datespan(this.props.school.grad_date, this.props.school.grad_date, 2)]);
			} else {
				grad_date = React.createElement("li", {}, ["Graduated " + this.props.school.grad_date]);
			}
		}


		return (
			React.createElement("div", {
				className: "entry",
			},[
				React.createElement("h3", {className: "school-degree"}, [this.props.school.degree]),
				React.createElement("div", {className: "rightinfo"}, [
					React.createElement("h4", {className: "university"}, [this.props.school.university]),
					React.createElement("h5", {className: "university-date"}, [datespan(this.props.school.date_from, this.props.school.date_to, 2)]),
				]),
				React.createElement("ul", {}, [
					term,
					grad_date
				]),
			])
		);
	},

});


var Education = React.createClass({

	propTypes: {
		schools: React.PropTypes.array
	},

	render: function() {

		var arr = [];

		for (var a = 0; a < this.props.schools.length; ++a) {
			arr.push(React.createElement(SchoolEntry, {
				key: a,
				school: this.props.schools[a]
			}));
		}

		return (
			React.createElement("div", {className: "education"}, [
				React.createElement("h2", {className: "section-header education-header"}, ["Education"]),
				arr
			])
		);
	},

});
