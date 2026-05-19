import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
// biome-ignore lint/style/noNonNullAssertion: No risk here since we control the HTML and know the element exists
const root = createRoot(container!);
root.render(<App />);
