var Resume = React.createClass({

	propTypes: {
		resume: React.PropTypes.object,
	},

	render: function() {

		var resume_elements = {
		   "skills": React.createElement(SkillSummary, { skills: this.props.resume.skills }),
		   "past_jobs": React.createElement(WorkExperience, { jobs: this.props.resume.past_jobs }),
		   "projects": React.createElement(ProjectList, { projects: this.props.resume.projects }),
		   "education": React.createElement(Education, { schools: this.props.resume.education }),
		};
		var order = this.props.resume.order;

		var arr = [];
		for (var a = 0; a < order.length; ++a) {
			arr.push(resume_elements[order[a]]);
		};

		return (
			React.createElement("div", { className: "resume" }, [
				React.createElement(ResumeHeader, { info: this.props.resume.info }),
				arr
			])
		);
	},

});
