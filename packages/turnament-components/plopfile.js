import { resolve } from "node:path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesPath = resolve(__dirname, "plop_templates");
const outputPath = resolve(__dirname, "src");

const requireField = (fieldName) => {
	return (value) => {
		if (String(value).length === 0) {
			return `${fieldName} is required`;
		}
		return true;
	};
};

export default (plop, config) => {
	plop
	plop.setGenerator("component", {
		description: "Create a reusable component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is your component name?",
				validate: requireField("name"),
			},
		],
		actions: [
			{
				type: "add",
				path: `${outputPath}/components/{{pascalCase name}}/{{pascalCase name}}.tsx`,
				templateFile: `${templatesPath}/Component/Component.tsx.hbs`,
				skipIfExists: true,
			},
			{
				type: "add",
				path: `${outputPath}/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
				templateFile: `${templatesPath}/Component/Component.test.tsx.hbs`,
				skipIfExists: true,
			},
			{
				type: "add",
				path: `${outputPath}/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
				templateFile: `${templatesPath}/Component/Component.stories.tsx.hbs`,
				skipIfExists: true,
			},
			{
				type: "add",
				path: `${outputPath}/components/{{pascalCase name}}/index.ts`,
				templateFile: `${templatesPath}/Component/index.ts.hbs`,
			},
			{
				type: "add",
				path: `${outputPath}/index.ts`,
				templateFile: `${templatesPath}/injectable-index.ts.hbs`,
				skipIfExists: true,
			},
			{
				type: "append",
				path: `${outputPath}/index.ts`,
				pattern: "/* PLOP_INJECT_EXPORT */",
				template: `\texport { default as {{pascalCase name}} } from './components/{{pascalCase name}}';`,
			},
		],
	});
};
