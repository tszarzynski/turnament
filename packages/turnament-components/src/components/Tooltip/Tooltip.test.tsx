import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-react";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
	it("content is hidden initially", async () => {
		render(
			<Tooltip content="Tooltip text">
				<span>Trigger</span>
			</Tooltip>,
		);
		await expect
			.element(page.getByText("Tooltip text"))
			.not.toBeInTheDocument();
	});

	it("shows content on trigger click", async () => {
		render(
			<Tooltip content="Tooltip text">
				<span>Trigger</span>
			</Tooltip>,
		);
		await page.getByRole("button").click();
		await expect.element(page.getByText("Tooltip text")).toBeInTheDocument();
	});

	it("sets aria-expanded based on visibility", async () => {
		render(
			<Tooltip content="Tooltip text">
				<span>Trigger</span>
			</Tooltip>,
		);
		const trigger = page.getByRole("button");
		await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
		await trigger.click();
		await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
	});
});
