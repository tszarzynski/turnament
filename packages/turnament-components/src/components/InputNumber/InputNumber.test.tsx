import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-react";
import InputNumber from "./InputNumber";

describe("InputNumber", () => {
	it("displays the value", async () => {
		render(<InputNumber value={5} onChange={() => undefined} />);
		await expect.element(page.getByRole("textbox")).toHaveValue("5");
	});

	it("displays value divided by scoringDivisor", async () => {
		render(
			<InputNumber value={10} onChange={() => undefined} scoringDivisor={2} />,
		);
		await expect.element(page.getByRole("textbox")).toHaveValue("5");
	});

	it("hides +/- buttons when not focused", async () => {
		render(<InputNumber value={5} onChange={() => undefined} />);
		await expect
			.element(page.getByRole("img", { name: "Add icon" }))
			.not.toBeInTheDocument();
	});

	it("shows +/- buttons when input is focused", async () => {
		render(<InputNumber value={5} onChange={() => undefined} />);
		await page.getByRole("textbox").click();
		await expect
			.element(page.getByRole("img", { name: "Add icon" }))
			.toBeInTheDocument();
		await expect
			.element(page.getByRole("img", { name: "Remove icon" }))
			.toBeInTheDocument();
	});

	it("calls onChange with incremented value on + click", async () => {
		const onChange = vi.fn();
		render(<InputNumber value={5} onChange={onChange} />);
		await page.getByRole("textbox").click();
		await page.getByRole("img", { name: "Add icon" }).click();
		expect(onChange).toHaveBeenCalledWith(6);
	});

	it("calls onChange with decremented value on - click", async () => {
		const onChange = vi.fn();
		render(<InputNumber value={5} onChange={onChange} />);
		await page.getByRole("textbox").click();
		await page.getByRole("img", { name: "Remove icon" }).click();
		expect(onChange).toHaveBeenCalledWith(4);
	});

	it("does not decrement below minValue", async () => {
		const onChange = vi.fn();
		render(<InputNumber value={0} onChange={onChange} minValue={0} />);
		await page.getByRole("textbox").click();
		await page.getByRole("img", { name: "Remove icon" }).click();
		expect(onChange).toHaveBeenCalledWith(0);
	});

	it("does not increment above maxValue", async () => {
		const onChange = vi.fn();
		render(<InputNumber value={10} onChange={onChange} maxValue={10} />);
		await page.getByRole("textbox").click();
		await page.getByRole("img", { name: "Add icon" }).click();
		expect(onChange).toHaveBeenCalledWith(10);
	});

	it("does not enter edit mode when disabled", async () => {
		render(<InputNumber value={5} onChange={() => undefined} disabled />);
		const input = page.getByRole("textbox");
		await expect.element(input).toBeDisabled();
		await expect
			.element(page.getByRole("img", { name: "Add icon" }))
			.not.toBeInTheDocument();
	});
});
