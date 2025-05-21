import { Suspense } from "react";
import { Loader } from "turnament-components";
import { RouteProvider } from "./app/router";
import { Page } from "./components/Page";

const App: React.FC = () => {
	return (
		<RouteProvider>
			<main className="max-w-sm min-h-screen m-auto filter-grainy">
				<Suspense fallback={<Loader />}>
					<Page />
				</Suspense>
			</main>
		</RouteProvider>
	);
};

export default App;
