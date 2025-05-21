import { render } from "@testing-library/react";
import IconButton from "./IconButton";

describe("IconButton", () => {
	it("renders without error", () => {
		const { asFragment } = render(<IconButton />);
		expect(asFragment()).toMatchSnapshot();
	});
});
