import { Suspense } from "react";
import { Loader } from "turnament-components";
import { RouteProvider } from "./app/router";
import { Page } from "./components/Page";

const App: React.FC = () => {
	return (
		<RouteProvider>
			<Suspense fallback={<Loader />}>
				<Page />
			</Suspense>
		</RouteProvider>
	);
};

export default App;
