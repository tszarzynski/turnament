import { render } from "vitest-browser-react";
import Button from "./Button";

describe("Button", () => {
	it("renders without error", () => {
		const { asFragment } = render(<Button>Click me</Button>);
		expect(asFragment()).toMatchSnapshot();
	});
});
