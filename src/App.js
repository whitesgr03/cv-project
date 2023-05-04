import Template from "./components/template";
import EditForm from "./components/editForm";

const initialData = {
	personal: {
		firstName: "Your",
		lastName: "Name",
		email: "example@gmail.com",
		phone: "(555) 555-5555",
		city: "City",
		state: "ST",
	},
	employment: [
		{
			id: null,
			jobTitle: "Job Title",
			employer: "Company Name",
			startDate: "Month Year",
			endDate: "Month Year",
			city: "City",
			state: "ST",
			describe: [
				{ id: null, text: "Core responsibility #1" },
				{ id: null, text: "Core responsibility #2" },
				{ id: null, text: "Core responsibility #3" },
			],
		},
	],
	education: [
		{
			id: null,
			school: "University Name",
			degreeMajors: "Degree, Majors",
			graduation: "Month, Year",
			city: "City",
			state: "ST",
			describe: [
				{ id: null, text: "Honors or fun stuff #1" },
				{ id: null, text: "Honors or fun stuff #2" },
				{ id: null, text: "Honors or fun stuff #3" },
			],
		},
	],
	skills: "Important skills or abilities required to fulfill the task role.",
};


export default App;
