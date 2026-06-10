import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-react";
import Button from "./Button";

describe("Button", () => {
	it("renders children", async () => {
		render(<Button>Click me</Button>);
		await expect.element(page.getByText("Click me")).toBeInTheDocument();
	});

	it("calls onClick when clicked", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click me</Button>);
		await page.getByRole("button").click();
		expect(onClick).toHaveBeenCalledOnce();
	});

	it("does not call onClick when disabled", async () => {
		const onClick = vi.fn();
		render(
			<Button onClick={onClick} disabled>
				Click me
			</Button>,
		);
		await expect.element(page.getByRole("button")).toBeDisabled();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("applies primary variant styles by default", async () => {
		render(<Button>Click me</Button>);
		await expect.element(page.getByRole("button")).toHaveClass("text-primary");
	});

	it("applies secondary variant styles", async () => {
		render(<Button variant="secondary">Click me</Button>);
		await expect
			.element(page.getByRole("button"))
			.toHaveClass("text-secondary");
	});

	it("applies disabled styles when disabled", async () => {
		render(<Button disabled>Click me</Button>);
		await expect
			.element(page.getByRole("button"))
			.toHaveClass("cursor-not-allowed");
	});

	it("applies w-full when fullWidth is set", async () => {
		render(<Button fullWidth>Click me</Button>);
		await expect.element(page.getByRole("button")).toHaveClass("w-full");
	});

	it("renders iconSlot when provided", async () => {
		render(
			<Button iconSlot={<span data-testid="icon">icon</span>}>Click me</Button>,
		);
		await expect.element(page.getByTestId("icon")).toBeInTheDocument();
	});
});
