import { useState } from "react";

import Preview from "./components/Preview";
import Resume from "./components/Resume";

const initialData = {
	personal: {
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
	employment: {
		type: "employment",
		data: {
			id: null,
			jobTitle: "Job Title",
			employer: "Company Name",
			startDate: "Month Year",
			endDate: "Month Year",
			city: "City",
			state: "ST",
			describes: [{ id: 1, text: "Core responsibility" }],
		},
		dataDescribe: "Core responsibility",
		dataList: [
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
	education: {
		type: "education",
		data: {
			id: 1,
			school: "University Name",
			degreeMajors: "Degree, Majors",
			graduationDate: "Month, Year",
			city: "City",
			state: "ST",
			describes: [{ id: 1, text: "Honors or fun stuff" }],
		},
		dataDescribe: "Honors or fun stuff",
		dataList: [
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
	skills: {
		type: "skills",
		data: {
			skill: "Important skills or abilities required to fulfill the task role.",
		},
	},
};

const App = () => {
	const [state, setState] = useState(initialData);

	const handleDataChange = (type, name, value) => {
		setState({
			...state,
			[type]: {
				...state[type],
				data: {
					...state[type].data,
					[name]: value,
				},
			},
		});
	};
	
	const handleDataListChange = (type, id, name, value) => {
		setState({
			...state,
			[type]: {
				...state[type],
				dataList: state[type].dataList.map(data =>
					data.id === id ? { ...data, [name]: value } : data
				),
			},
		});
	};

	const addDescribe = (type, id) => {
		setState(
			state.map(item =>
				item.type === type
					? {
							...item,
							data: item.data.map(data =>
								data.id === id
									? {
											...data,
											describes: [
												...data.describes,
												{
													id:
														data.describes.length >
														0
															? data.describes.at(
																	-1
															  ).id + 1
															: 1,
													text: defaultDescribe[type],
												},
											],
									  }
									: data
							),
					  }
					: item
			)
		);
	};

	const removeDescribe = (type, id, describeId) => {
		setState(
			state.map(item =>
				item.type === type
					? {
							...item,
							data: item.data.map(data =>
								data.id === id
									? {
											...data,
											describes: data.describes.filter(
												describe =>
													describe.id !== describeId
											),
									  }
									: data
							),
					  }
					: item
			)
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
				onAddForm={addForm}
				onAddDescribe={addDescribe}
				onRemoveDescribe={removeDescribe}
				onRemoveForm={removeForm}
			/>
			<Preview state={state} />
		</div>
	);
};

export default App;
