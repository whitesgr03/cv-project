import { useState } from "react";

const initialData = [
	{
		id: 1,
		type: "personal",
		data: {
			firstName: "Your",
			lastName: "Name",
			email: "example@gmail.com",
			phone: "(555) 555-5555",
			city: "City",
			state: "ST",
		},
	},
	{
		id: 2,
		type: "employment",
		data: [
			{
				id: 1,
				jobTitle: "Job Title",
				employer: "Company Name",
				startDate: "Month Year",
				endDate: "Month Year",
				city: "City",
				state: "ST",
				describes: [
					{ id: 1, text: "Core responsibility #1" },
					{ id: 2, text: "Core responsibility #2" },
				],
			},
			{
				id: 2,
				jobTitle: "Job Title",
				employer: "Company Name",
				startDate: "Month Year",
				endDate: "Month Year",
				city: "City",
				state: "ST",
				describes: [{ id: 1, text: "Core responsibility #1" }],
			},
		],
	},
	{
		id: 3,
		type: "education",
		data: [
			{
				id: 1,
				school: "University Name",
				degreeMajors: "Degree, Majors",
				graduationDate: "Month, Year",
				city: "City",
				state: "ST",
				describes: [{ id: 1, text: "Honors or fun stuff #1" }],
			},
		],
	},
	{
		id: 4,
		type: "skills",
		data: "Important skills or abilities required to fulfill the task role.",
	},
];

const App = () => {
	const [state, setState] = useState(initialData);

	const edit = newData => {
		setState(newData);
	};

	return (
		<div>
			<EditForm formData={formData} onEdit={edit} />
			<Template formData={formData} />
		</div>
	);
};

export default App;
