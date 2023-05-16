import { useState, useRef, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiChevronDown } from "@mdi/js";

const Resume = ({
	state,


	
	onRemoveDescribe,
}) => {
	return (
		<div className="resume">
			<Personal
				personal={state.personal}
			/>
			<Employment
				employment={state.employment}
			/>
			<Education
				education={state.education}
			/>
			<Skills
				skills={state.skills}
			/>
		</div>
	);
};

const Employment = ({
	state,
	handleEdit,
	handleAddForm,
	handleAddDescribe,
	handleRemoveDescribe,
	handleRemoveForm,
}) => {
	return (
		<div className={state.type}>
			<h3>Employment History</h3>
			{state.data.map(employment => (
				<EmploymentForm
					state={state}
					key={employment.id}
					item={employment}
					handleEdit={handleEdit}
					handleAddForm={handleAddForm}
					handleAddDescribe={handleAddDescribe}
					handleRemoveDescribe={handleRemoveDescribe}
					handleRemoveForm={handleRemoveForm}
				/>
			))}
			<button type="button" onClick={() => handleAddForm(state.type)}>
				+ Add {state.data.length > 1 && "one more"} {state.type}
			</button>
		</div>
	);
};

const EmploymentForm = ({
	state,
	item,
	handleEdit,
	handleAddDescribe,
	handleRemoveDescribe,
	handleRemoveForm,
}) => {
	const [rotate, setRotate] = useState(false);
	const [detailHeight, setDetailHeight] = useState(0);

	const ref = useRef(null);

	useEffect(() => {
		setDetailHeight(ref.current.clientHeight);
	}, []);

	const onUpdateFormHeight = () => setDetailHeight(ref.current.clientHeight);

	return (
		<form
			name={state.type}
			key={item.id}
			className={rotate ? "pointer" : ""}
			onClick={() => rotate && setRotate(!rotate)}
		>
			<div className="bar">
				<div>
					<p className={rotate ? "show" : ""}>
						{item.jobTitle} - {item.employer}
					</p>
				</div>
				<div>
					<button
						type="button"
						className="trashCan"
						hidden={rotate ? true : false}
						onClick={() => {
							handleRemoveForm(state.type, item.id);
						}}
					>
						<Icon className="icon " path={mdiTrashCanOutline} />
					</button>
					<button type="button" className="arrow">
						<Icon
							className="icon"
							path={mdiChevronDown}
							rotate={rotate ? 180 : 0}
							onClick={() => setRotate(!rotate)}
						/>
					</button>
				</div>
			</div>
			<div
				className={`detailsWarp ${rotate ? "hiding" : ""}`}
				style={{
					maxHeight: detailHeight,
				}}
			>
				<div className="details" ref={ref}>
					{Object.keys(item).map((key, i) =>
						typeof item[key] === "string" ? (
							<TextInput
								state={state}
								item={key}
								key={key}
								id={item.id}
								handleEdit={handleEdit}
							/>
						) : (
							Array.isArray(item[key]) && (
								<div key={i}>
									{item[key].map((describe, i) => (
										<div key={i}>
											<div className="bar">
												{`Description ${i + 1}:`}
												<button
													type="button"
													className="trashCan"
												>
													<Icon
														className="icon"
														path={
															mdiTrashCanOutline
														}
														onClick={e => {
															e.stopPropagation();
															flushSync(() => {
																handleRemoveDescribe(
																	state.type,
																	item.id,
																	describe.id
																);
															});
															onUpdateFormHeight();
														}}
													/>
												</button>
											</div>

											<Textarea
												state={state}
												id={item.id}
												item={key}
												describeId={describe.id}
												index={i}
												key={describe.id}
												handleEdit={handleEdit}
												handleRemoveDescribe={
													handleRemoveDescribe
												}
												handleUpdateFormHeight={
													onUpdateFormHeight
												}
											/>
										</div>
									))}

									<button
										type="button"
										onClick={() => {
											flushSync(() => {
												handleAddDescribe(
													state.type,
													item.id
												);
											});
											onUpdateFormHeight();
										}}
									>
										+ Add responsibility
									</button>
								</div>
							)
						)
					)}
				</div>
			</div>
		</form>
	);
};

const Education = ({
	state,
	handleEdit,
	handleAddForm,
	handleAddDescribe,
	handleRemoveDescribe,
	handleRemoveForm,
}) => {
	return (
		<div className={state.type}>
			<h3>Education</h3>
			{state.data.map(education => (
				<EducationForm
					state={state}
					key={education.id}
					item={education}
					handleEdit={handleEdit}
					handleAddForm={handleAddForm}
					handleAddDescribe={handleAddDescribe}
					handleRemoveDescribe={handleRemoveDescribe}
					handleRemoveForm={handleRemoveForm}
				/>
			))}
			<button type="button" onClick={() => handleAddForm(state.type)}>
				+ Add {state.data.length > 1 && "one more"} {state.type}
			</button>
		</div>
	);
};

const EducationForm = ({
	state,
	item,
	handleEdit,
	handleAddDescribe,
	handleRemoveDescribe,
	handleRemoveForm,
}) => {
	const [rotate, setRotate] = useState(false);

	const [detailHeight, setDetailHeight] = useState(0);

	const ref = useRef(null);

	useEffect(() => {
		setDetailHeight(ref.current.clientHeight);
	}, []);

	const onUpdateFormHeight = () => setDetailHeight(ref.current.clientHeight);

	return (
		<form name={state.type} key={item.id}>
			<div className="bar">
				<div>
					<p className={rotate ? "show" : ""}>
						{item.school} - {item.degreeMajors}
					</p>
				</div>
				<div className="icons">
					<button
						type="button"
						className="trashCan"
						hidden={rotate ? true : false}
						onClick={() => {
							handleRemoveForm(state.type, item.id);
						}}
					>
						<Icon className="icon" path={mdiTrashCanOutline} />
					</button>
					<button type="button">
						<Icon
							className="icon"
							path={mdiChevronDown}
							rotate={rotate ? 180 : 0}
							onClick={() => setRotate(!rotate)}
						/>
					</button>
				</div>
			</div>
			<div
				className={`detailsWarp ${rotate ? "hiding" : ""}`}
				style={{
					maxHeight: detailHeight,
				}}
			>
				<div className={`details ${rotate ? "hiding" : ""}`} ref={ref}>
					{Object.keys(item).map((key, i) =>
						typeof item[key] === "string" ? (
							<TextInput
								state={state}
								item={key}
								key={key}
								id={item.id}
								handleEdit={handleEdit}
							/>
						) : (
							Array.isArray(item[key]) && (
								<div key={i}>
									{item[key].map((describe, i) => (
										<div key={describe.id}>
											<div className="bar">
												{`Description ${i + 1}:`}
												<button
													type="button"
													className="trashCan"
												>
													<Icon
														className="icon"
														path={
															mdiTrashCanOutline
														}
														onClick={e => {
															e.stopPropagation();
															flushSync(() => {
																handleRemoveDescribe(
																	state.type,
																	item.id,
																	describe.id
																);
															});
															onUpdateFormHeight();
														}}
													/>
												</button>
											</div>

											<Textarea
												state={state}
												id={item.id}
												item={key}
												describeId={describe.id}
												index={i}
												key={describe.id}
												handleEdit={handleEdit}
												handleRemoveDescribe={
													handleRemoveDescribe
												}
											/>
										</div>
									))}
									<button
										type="button"
										onClick={() => {
											flushSync(() => {
												handleAddDescribe(
													state.type,
													item.id
												);
											});
											onUpdateFormHeight();
										}}
									>
										+ Add responsibility
									</button>
								</div>
							)
						)
					)}
				</div>
			</div>
		</form>
	);
};

const Skills = ({ state, handleEdit }) => (
	<div className={state.type}>
		<h3>Skills</h3>
		<form name={state.type}>
			<Textarea state={state} handleEdit={handleEdit} />
		</form>
	</div>
);

const TextInput = ({ state, item, handleEdit, id }) => {
	return (
		<label>
			{item
				.replace(/([A-Z])/g, " $1")
				.replace(/^./, str => str.toUpperCase())}
			:
			<input
				type={[item.slice(-4)][0] === "Date" ? "month" : "text"}
				name={item}
				onChange={e => {
					handleEdit({
						type: state.type,
						data: Array.isArray(state.data)
							? state.data.map(i =>
									i.id === id
										? {
												...i,
												[item]: getValue(
													e.target.value
												),
										  }
										: i
							  )
							: {
									...state.data,
									[item]: e.target.value,
							  },
					});
				}}
			/>
		</label>
	);
};

const Textarea = ({ state, item, describeId, handleEdit, id }) => {
	return (
		<label>
			<textarea
				type="text"
				name={item}
				onChange={e =>
					handleEdit({
						type: state.type,
						data: Array.isArray(state.data)
							? state.data.map(i =>
									i.id === id
										? {
												...i,
												[item]: i[item].map(x =>
													x.id === describeId
														? {
																...x,
																text: e.target
																	.value,
														  }
														: x
												),
										  }
										: i
							  )
							: e.target.value,
					})
				}
			></textarea>
		</label>
	);
};

export default Resume;
