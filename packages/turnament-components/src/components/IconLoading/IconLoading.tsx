const IconLoading = () => {
	return (
		<svg
			className="h-10 w-10"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-label="Loading icon"
			role="img"
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<rect x="4" y="4" width="16" height="16" rx="2" />
			<circle cx="8.5" cy="8.5" r=".5" /> <circle cx="15.5" cy="8.5" r=".5" />
			<circle cx="15.5" cy="15.5" r=".5" /> <circle cx="8.5" cy="15.5" r=".5" />
		</svg>
	);
};

export default IconLoading;
