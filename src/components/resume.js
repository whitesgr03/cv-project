import { useState, useRef, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiChevronDown } from "@mdi/js";

const Resume = ({
	state,
	handleDataChange,
	handleDataListChange,
	handleDescribeChange,
	onAddNewForm,
	onRemoveForm,
	onAddNewDescribe,
	onRemoveDescribe,
}) => {
	return (
		<div className="resume">
			<Personal
				personal={state.personal}
				handleDataChange={handleDataChange}
			/>
			<Employment
				employment={state.employment}
				onAddNewForm={onAddNewForm}
				onRemoveForm={onRemoveForm}
				onAddNewDescribe={onAddNewDescribe}
				onRemoveDescribe={onRemoveDescribe}
				handleDataListChange={handleDataListChange}
				handleDescribeChange={handleDescribeChange}
			/>
			<Education
				education={state.education}
				onAddNewForm={onAddNewForm}
				onRemoveForm={onRemoveForm}
				onAddNewDescribe={onAddNewDescribe}
				onRemoveDescribe={onRemoveDescribe}
				handleDataListChange={handleDataListChange}
				handleDescribeChange={handleDescribeChange}
			/>
			<Skills skills={state.skills} handleDataChange={handleDataChange} />
		</div>
	);
};

const Textarea = ({
	index,
	type,
	dataId,
	describeId,
	onRemoveDescribe,
	handleDescribeChange,
}) => (
	<div>
		<div className="bar">
			<p>{`Description #${index + 1}:`}</p>
			<button type="button" className="trashCan">
				<Icon
					className="icon"
					path={mdiTrashCanOutline}
					onClick={() => {
						onRemoveDescribe(type, dataId, describeId);
					}}
				/>
			</button>
		</div>
		<label>
			<textarea
				type="text"
				onChange={e =>
					handleDescribeChange(
						type,
						dataId,
						describeId,
						e.target.value
					)
				}
			></textarea>
		</label>
	</div>
);

const Wrap = ({
	title,
	type,
	content,
	id,
	describes,
	children,
	onRemoveForm,
	onAddNewDescribe,
	onRemoveDescribe,
	handleDescribeChange,
}) => {
	const [wrapBlockHight, setWrapBlockHight] = useState(null);
	const [displayForm, setDisplayForm] = useState(false);

	const ref = useRef(null);

	useEffect(() => {
		setWrapBlockHight(ref.current.clientHeight);
	}, [describes.length]);

	return (
		<div
			className={`wrap ${displayForm ? "pointer" : ""}`}
			onClick={() => displayForm && setDisplayForm(!displayForm)}
		>
			<div className="bar">
				<p className={`"title" ${displayForm ? "show" : ""}`}>
					{title} - {content}
				</p>
				<div className="buttonWrap">
					<button
						type="button"
						className="trashCan"
						hidden={displayForm ? true : false}
						onClick={() => {
							onRemoveForm(type, id);
						}}
					>
						<Icon className="icon " path={mdiTrashCanOutline} />
					</button>
					<button type="button" className="arrow">
						<Icon
							className="icon"
							path={mdiChevronDown}
							rotate={displayForm ? 180 : 0}
							onClick={() => setDisplayForm(!displayForm)}
						/>
					</button>
				</div>
			</div>
			<div
				className={`formWrap ${displayForm ? "hiding" : ""}`}
				style={{
					maxHeight: wrapBlockHight !== null ? wrapBlockHight : "",
				}}
			>
				<form name={type} ref={ref}>
					{children}
					<div className="describes">
						{describes.map((describe, index) => {
							return (
								<Textarea
									key={describe.id}
									index={index}
									type={type}
									dataId={id}
									describeId={describe.id}
									onRemoveDescribe={onRemoveDescribe}
									handleDescribeChange={handleDescribeChange}
								/>
							);
						})}
					</div>
					<button
						type="button"
						onClick={() => {
							onAddNewDescribe(type, id);
						}}
					>
						+ Add new describe
					</button>
				</form>
			</div>
		</div>
	);
};

const Personal = ({ personal, handleDataChange }) => {
	return (
		<div className="personal">
			<h3>Personal Details</h3>
			<form name="personal">
				<label>
					FirstName
					<input
						type="text"
						name="firstName"
						onChange={e =>
							handleDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					LastName
					<input
						type="text"
						name="lastName"
						onChange={e =>
							handleDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					Email
					<input
						type="email"
						name="email"
						onChange={e =>
							handleDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					Phone
					<input
						type="tel"
						name="phone"
						onChange={e =>
							handleDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					City
					<input
						type="text"
						name="city"
						onChange={e =>
							handleDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					State
					<input
						type="text"
						name="state"
						onChange={e =>
							handleDataChange(
								personal.type,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
			</form>
		</div>
	);
};

const Employment = ({
	employment,
	onAddNewForm,
	onRemoveForm,
	onAddNewDescribe,
	onRemoveDescribe,
	handleDataListChange,
	handleDescribeChange,
}) => {
	const forms = employment.dataList.map(form => {
		return (
			<Wrap
				type={employment.type}
				title={form.jobTitle}
				content={form.employer}
				id={form.id}
				key={form.id}
				describes={form.describes}
				onRemoveForm={onRemoveForm}
				onAddNewDescribe={onAddNewDescribe}
				onRemoveDescribe={onRemoveDescribe}
				handleDescribeChange={handleDescribeChange}
			>
				<label>
					JobTitle
					<input
						type="text"
						name="jobTitle"
						onChange={e =>
							handleDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					Employer
					<input
						type="text"
						name="employer"
						onChange={e =>
							handleDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					StartDate
					<input
						type="month"
						name="startDate"
						onChange={e =>
							handleDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					EndDate
					<input
						type="month"
						name="endDate"
						onChange={e =>
							handleDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					City
					<input
						type="text"
						name="city"
						onChange={e =>
							handleDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
				<label>
					State
					<input
						type="text"
						name="state"
						onChange={e =>
							handleDataListChange(
								employment.type,
								form.id,
								e.target.name,
								e.target.value
							)
						}
					/>
				</label>
			</Wrap>
		);
	});

	return (
		<div className="employment">
			<h3>Employment History</h3>
			{forms}
			<button type="button" onClick={() => onAddNewForm(employment.type)}>
				{`+ Add ${employment.type}${
					employment.dataList.length > 1 ? " one more" : ""
				}`}
			</button>
		</div>
	);
};

const Education = ({
	education,
	onAddNewForm,
	onRemoveForm,
	onAddNewDescribe,
	onRemoveDescribe,
	handleDataListChange,
	handleDescribeChange,
}) => {
	const forms = education.dataList.map(form => (
		<Wrap
			type={education.type}
			title={form.school}
			content={form.degreeMajors}
			key={form.id}
			id={form.id}
			describes={form.describes}
			onRemoveForm={onRemoveForm}
			onAddNewDescribe={onAddNewDescribe}
			onRemoveDescribe={onRemoveDescribe}
			handleDataListChange={handleDataListChange}
			handleDescribeChange={handleDescribeChange}
		>
			<label>
				School
				<input
					type="text"
					name="school"
					onChange={e =>
						handleDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				DegreeMajors
				<input
					type="text"
					name="degreeMajors"
					onChange={e =>
						handleDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				GraduationDate
				<input
					type="month"
					name="graduationDate"
					onChange={e =>
						handleDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				City
				<input
					type="text"
					name="city"
					onChange={e =>
						handleDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
			<label>
				State
				<input
					type="text"
					name="state"
					onChange={e =>
						handleDataListChange(
							education.type,
							form.id,
							e.target.name,
							e.target.value
						)
					}
				/>
			</label>
		</Wrap>
	));
	return (
		<div className="education">
			<h3>Education</h3>
			{forms}
			<button type="button" onClick={() => onAddNewForm(education.type)}>
				{`+ Add education${
					education.dataList.length > 1 ? " one more" : ""
				}`}
			</button>
		</div>
	);
};

const Skills = ({ skills, handleDataChange }) => (
	<div className="Skills">
		<h3>Skills</h3>
		<form name="Skills">
			<label>
				<textarea
					type="text"
					name="skill"
					onChange={e =>
						handleDataChange(
							skills.type,
							e.target.name,
							e.target.value
						)
					}
				></textarea>
			</label>
		</form>
	</div>
);

export default Resume;
