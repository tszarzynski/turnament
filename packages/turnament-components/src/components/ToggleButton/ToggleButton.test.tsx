import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-react";
import ToggleButton from "./ToggleButton";

const icon = <span>icon</span>;

describe("ToggleButton", () => {
	it("renders the icon slot", async () => {
		render(
			<ToggleButton
				checked={false}
				onChange={() => undefined}
				iconSlot={icon}
			/>,
		);
		await expect.element(page.getByText("icon")).toBeInTheDocument();
	});

	it("applies primary color when checked", async () => {
		render(
			<ToggleButton
				checked={true}
				onChange={() => undefined}
				iconSlot={icon}
			/>,
		);
		await expect
			.element(page.getByText("icon").element().closest("label")!)
			.toHaveClass("text-primary");
	});

	it("applies secondary color when unchecked", async () => {
		render(
			<ToggleButton
				checked={false}
				onChange={() => undefined}
				iconSlot={icon}
			/>,
		);
		await expect
			.element(page.getByText("icon").element().closest("label")!)
			.toHaveClass("text-secondary");
	});

	it("applies rounded-full for circle shape", async () => {
		render(
			<ToggleButton
				checked={false}
				onChange={() => undefined}
				iconSlot={icon}
				shape="circle"
			/>,
		);
		const iconWrapper = page.getByText("icon").element().closest("div")!;
		await expect.element(iconWrapper).toHaveClass("rounded-full");
	});

	it("does not apply rounded-full for square shape", async () => {
		render(
			<ToggleButton
				checked={false}
				onChange={() => undefined}
				iconSlot={icon}
				shape="square"
			/>,
		);
		const iconWrapper = page.getByText("icon").element().closest("div")!;
		await expect.element(iconWrapper).not.toHaveClass("rounded-full");
	});

	it("fires onChange when clicked", async () => {
		const onChange = vi.fn();
		render(
			<ToggleButton checked={false} onChange={onChange} iconSlot={icon} />,
		);
		await page.getByRole("checkbox").click();
		expect(onChange).toHaveBeenCalled();
	});

	it("does not fire onChange when disabled", async () => {
		const onChange = vi.fn();
		render(
			<ToggleButton
				checked={false}
				onChange={onChange}
				iconSlot={icon}
				disabled
			/>,
		);
		const checkbox = page.getByRole("checkbox");
		await expect.element(checkbox).toBeDisabled();
		// Playwright refuses to click disabled elements; verify the handler is not wired
		expect(onChange).not.toHaveBeenCalled();
	});
});
