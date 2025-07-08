# turnament

Tournament scheduling app

[![CircleCI](https://circleci.com/gh/tszarzynski/turnament.svg?style=svg)](https://circleci.com/gh/circleci/circleci-docs)

## Available Scripts

This project uses `pnpm` as the package manager. The following scripts are available in the root `package.json`:

| Script         | Description                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- |
| `postinstall`  | Runs `husky install` to set up git hooks after installing dependencies.                     |
| `lint`         | Runs `turbo lint` to lint all packages in the monorepo.                                     |
| `dev`          | Runs `turbo watch dev` to start all development servers in watch mode.                      |
| `test`         | Runs `turbo test -- --silent` to execute all tests in silent mode.                          |
| `build`        | Runs `turbo build` to build all packages in the monorepo.                                   |
| `serve`        | Runs `turbo serve` to serve the built application locally.                                  |
| `predeploy`    | Runs `pnpm run build` before deployment (used internally by the `deploy` script).           |
| `deploy`       | Deploys the web app to GitHub Pages using `gh-pages -d ./packages/turnament-web/dist`.      |

### Additional Tooling

- **Husky**: Used for git hooks (pre-commit and pre-push).
- **lint-staged**: Runs linters and formatters on staged files before commit.
- **Turbo**: Task runner for monorepo scripts.
- **gh-pages**: Deploys the web app to GitHub Pages.

### Development Workflow

1. Install dependencies: `pnpm install`
2. Start development: `pnpm dev`
3. Lint code: `pnpm lint`
4. Run tests: `pnpm test`
5. Build for production: `pnpm build`
6. Serve locally: `pnpm serve`
7. Deploy: `pnpm deploy`
