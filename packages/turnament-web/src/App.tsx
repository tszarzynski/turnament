import { Suspense } from "react";
import { Loader } from "turnament-components";
import { RouteProvider } from "./app/router";
import { Page } from "./components/Page";

const App = () => {
	return (
		<div className="bg-paper">
			<RouteProvider>
				<Suspense fallback={<Loader />}>
					<Page />
				</Suspense>
			</RouteProvider>
		</div>
	);
};

export default App;
