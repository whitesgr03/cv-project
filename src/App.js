import { useState } from "react";

import Preview from "./components/preview";
import Resume from "./components/resume";

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
				describes: [{ id: 1, text: "Core responsibility" }],
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
				describes: [{ id: 1, text: "Honors or fun stuff" }],
			},
		],
	},
	{
		id: 4,
		type: "skills",
		data: "Important skills or abilities required to fulfill the task role.",
	},
];

const defaultTemplate = {
	employment: {
		jobTitle: "Job Title",
		employer: "Company Name",
		startDate: "Month Year",
		endDate: "Month Year",
		city: "City",
		state: "ST",
		describes: [{ id: 1, text: "Core responsibility" }],
	},
	education: {
		school: "University Name",
		degreeMajors: "Degree, Majors",
		graduationDate: "Month, Year",
		city: "City",
		state: "ST",
		describes: [{ id: 1, text: "Honors or fun stuff" }],
	},
};
const App = () => {
	const [state, setState] = useState(initialData);

	const editInput = ({ type, data }) => {
		setState(
			state.map(item => (item.type === type ? { ...item, data } : item))
		);
	};
	const addForm = type => {
		setState(
			state.map(item =>
				item.type === type
					? {
							...item,
							data: [
								...item.data,
								{
									id:
										item.data.length > 0
											? item.data.at(-1).id + 1
											: 1,
									...defaultTemplate[type],
								},
							],
					  }
					: item
			)
		);
	};

	const removeForm = (type, id) => {
		setState(
			state.map(item =>
				item.type === type
					? {
							...item,
							data: item.data.filter(data => data.id !== id),
					  }
					: item
			)
		);
	};

	return (
		<div>
			<Resume
				state={state}
				onEdit={editInput}
				onRemoveDescribe={removeDescribe}
				onRemoveForm={removeForm}
			/>
			<Preview state={state} />
		</div>
	);
};

export default App;
