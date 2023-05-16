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

	const handleDescribeChange = (type, dataId, describeId, value) => {
		setState({
			...state,
			[type]: {
				...state[type],
				dataList: state[type].dataList.map(data =>
					data.id === dataId
						? {
								...data,
								describes: data.describes.map(describe =>
									describe.id === describeId
										? {
												...describe,
												text: value,
										  }
										: describe
								),
						  }
						: data
				),
			},
		});
	};

	const onAddNewForm = type => {
		setState({
			...state,
			[type]: {
				...state[type],
				dataList: [
					...state[type].dataList,
					{
						...state[type].data,
						id:
							state[type].dataList.length === 0
								? 1
								: state[type].dataList.at(-1).id + 1,
					},
				],
			},
		});
	};

	const onRemoveForm = (type, id) => {
		setState({
			...state,
			[type]: {
				...state[type],
				dataList: state[type].dataList.filter(data => data.id !== id),
			},
		});
	};

	const onAddNewDescribe = (type, id) => {
		setState({
			...state,
			[type]: {
				...state[type],
				dataList: state[type].dataList.map(data =>
					data.id === id
						? {
								...data,
								describes: [
									...data.describes,
									{
										id:
											data.describes.length === 0
												? 1
												: data.describes.at(-1).id + 1,
										text: state[type].dataDescribe,
									},
								],
						  }
						: data
				),
			},
		});
	};

	const onRemoveDescribe = (type, dataId, describeId) => {
		setState({
			...state,
			[type]: {
				...state[type],
				dataList: state[type].dataList.map(data =>
					data.id === dataId
						? {
								...data,
								describes: data.describes.filter(
									describe => describe.id !== describeId
								),
						  }
						: data
				),
			},
		});
	};

	return (
		<div>
			<Resume
				state={state}
				handleDataChange={handleDataChange}
				handleDataListChange={handleDataListChange}
				handleDescribeChange={handleDescribeChange}
				onAddNewForm={onAddNewForm}
				onRemoveForm={onRemoveForm}
				onAddNewDescribe={onAddNewDescribe}
				onRemoveDescribe={onRemoveDescribe}
			/>
			<Preview state={state} />
		</div>
	);
};

export default App;
