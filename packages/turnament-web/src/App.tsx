import { Suspense } from "react";
import { Loader } from "turnament-components";
import { RouteProvider } from "./app/router";
import { Page } from "./components/Page";

const App: React.FC = () => {
	return (
		<div className="bg-vintage-paper">
			<RouteProvider>
				<Suspense fallback={<Loader />}>
					<Page />
				</Suspense>
			</RouteProvider>
		</div>
	);
};

export default App;
