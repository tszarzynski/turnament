import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-react";
import InputText from "./InputText";

describe("InputText", () => {
	it("renders an input element", async () => {
		render(<InputText value="hello" onChange={() => undefined} />);
		await expect.element(page.getByRole("textbox")).toBeInTheDocument();
	});

	it("displays the provided value", async () => {
		render(<InputText value="test value" onChange={() => undefined} />);
		await expect.element(page.getByRole("textbox")).toHaveValue("test value");
	});

	it("fires onChange when the user types", async () => {
		const onChange = vi.fn();
		render(<InputText value="" onChange={onChange} />);
		await page.getByRole("textbox").fill("x");
		expect(onChange).toHaveBeenCalled();
	});

	it("is disabled when disabled prop is set", async () => {
		render(<InputText value="" onChange={() => undefined} disabled />);
		await expect.element(page.getByRole("textbox")).toBeDisabled();
	});

	it("applies disabled styles when disabled", async () => {
		render(<InputText value="" onChange={() => undefined} disabled />);
		await expect
			.element(page.getByRole("textbox"))
			.toHaveClass("cursor-not-allowed");
	});

	it("applies completed styles when completed", async () => {
		render(<InputText value="" onChange={() => undefined} completed />);
		await expect
			.element(page.getByRole("textbox"))
			.toHaveClass("text-gray-300");
	});

	it("sets autoComplete and autoCorrect to off", async () => {
		render(<InputText value="" onChange={() => undefined} />);
		const input = page.getByRole("textbox");
		await expect.element(input).toHaveAttribute("autocomplete", "off");
		await expect.element(input).toHaveAttribute("autocorrect", "off");
	});
});
