import IconLoading from "../IconLoading";

const Loader = () => {
	return (
		<div className="flex justify-center items-center w-full min-h-screen text-primary">
			<div className="border-1">
				<div className="animate-spin">
					<IconLoading />
				</div>
			</div>
		</div>
	);
};

export default Loader;
