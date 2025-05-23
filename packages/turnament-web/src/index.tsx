import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const root = createRoot(container!);
root.render(<App />);
