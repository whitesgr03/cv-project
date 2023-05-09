const Preview = ({ state }) => (
	<div className="preview">
		{state.map(item => (
			<Form item={item} key={item.id} />
		))}
	</div>
);

const Form = ({ item }) => {
	switch (item.type) {
		case "personal":
			return <Personal item={item} />;
		case "employment":
			return <Employment item={item} />;
		case "education":
			return <Education item={item} />;
		case "skills":
			return <Skills item={item} />;
	}
};

const Personal = ({ item }) => (
	<div className={item.type}>
		<h1>
			{item.data.firstName} {item.data.lastName}
		</h1>
		<ul>
			<li>{item.data.email} </li>
			<span>-</span>
			<li>{item.data.phone}</li>
			<span>-</span>
			<li>
				{item.data.city}, {item.data.state}
			</li>
		</ul>
	</div>
);
const Employment = ({ item }) => (
	<div className={item.type}>
		<p>WORK EXPERIENCE</p>
		{item.data.map((employment, i) => (
			<div key={employment.id ?? i}>
				<p>
					<span>{employment.employer}</span>
					<span>
						{employment.startDate} - {employment.endDate}
					</span>
				</p>
				<p>
					<span>{employment.jobTitle}</span>
					<span>
						{employment.city}, {employment.state}
					</span>
				</p>
				<ul>
					{employment.describes.map((describe, i) => (
						<li key={describe.id ?? i}>{describe.text}</li>
					))}
				</ul>
			</div>
		))}
	</div>
);
const Education = ({ item }) => (
	<div className={item.type}>
		<p>EDUCATION</p>
		{item.data.map((education, i) => (
			<div key={education.id ?? i}>
				<p>
					<span>{education.school}</span>
					<span>Graduation {education.graduationDate}</span>
				</p>
				<p>
					<span>{education.degreeMajors}</span>
					<span>
						{education.city}, {education.state}
					</span>
				</p>
				<ul>
					{education.describes.map((describe, i) => (
						<li key={describe.id ?? i}>{describe.text}</li>
					))}
				</ul>
			</div>
		))}
	</div>
);
const Skills = ({ item }) => (
	<div className={item.type}>
		<p>SKILLS</p>
		<p>{item.data}</p>
	</div>
);

export default Preview;
