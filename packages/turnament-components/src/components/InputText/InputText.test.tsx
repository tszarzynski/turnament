import { render } from "vitest-browser-react";
import InputText from "./InputText";

describe("InputText", () => {
	it("renders without error", () => {
		const { asFragment } = render(<InputText />);
		expect(asFragment()).toMatchSnapshot();
	});
});
