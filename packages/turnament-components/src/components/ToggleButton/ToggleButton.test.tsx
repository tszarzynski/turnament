import { render } from "vitest-browser-react";
import IconReorder from "../IconReorder";
import ToggleButton from "./ToggleButton";

describe("ToggleButton", () => {
	it("renders without error", () => {
		const { asFragment } = render(
			<ToggleButton
				checked={true}
				onChange={() => undefined}
				iconSlot={<IconReorder />}
			/>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
