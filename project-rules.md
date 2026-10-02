---

description: Project-wide development rules and conventions
alwaysApply: true
-----------------

# Project Rules

## Tech Stack

* Use Node.js LTS.
* Use TypeScript for application code.
* Use the project's configured framework and libraries consistently.
* Prefer existing dependencies and patterns before introducing new ones.

## Code Quality

* Write clean, readable, maintainable code.
* Use descriptive names for variables, functions, classes, and files.
* Keep functions focused and reasonably small.
* Avoid unnecessary complexity and duplication.
* Handle errors explicitly and provide useful error messages.

## TypeScript

* Prefer strong typing over `any`.
* Define clear interfaces or types for structured data.
* Avoid unnecessary type assertions.
* Keep TypeScript configuration strict where practical.

## Project Structure

* Follow the existing project structure.
* Keep related functionality together.
* Separate business logic, utilities, configuration, and UI/API code where appropriate.
* Do not create unnecessary files or directories.

## Dependencies

* Before adding a dependency, check whether the functionality can reasonably be implemented using the existing stack.
* Do not add dependencies without a clear reason.
* Keep dependencies up to date when practical.

## Testing

* Add tests for important functionality and edge cases.
* Do not remove or weaken existing tests just to make implementation pass.
* Run relevant tests after making changes.

## Git

* Use Conventional Commits.
* Commit messages should follow:
  `type: concise description`
* Common types include `feat`, `fix`, `docs`, `refactor`, `test`, and `chore`.
* Keep commits focused on a single logical change.

## Documentation

* Keep the README accurate and up to date.
* Document setup, installation, usage, and important project decisions.
* Update documentation when significant functionality changes.

## AI-Assisted Development

* Before making significant changes, inspect the relevant existing code.
* Explain the intended approach when a task is complex.
* Make the smallest reasonable change that solves the problem.
* Do not overwrite working code unnecessarily.
* After making changes, review the diff for unintended modifications.
* Never claim that a command, test, or build succeeded unless it was actually run and verified.

## Security

* Never commit API keys, passwords, tokens, or other secrets.
* Use environment variables for sensitive configuration.
* Validate untrusted input.
* Follow secure coding practices appropriate to the application.

## Before Completing a Task

1. Review the changes for correctness.
2. Run relevant tests, linting, or type checks when available.
3. Check the Git diff for unintended changes.
4. Update documentation if necessary.
5. Summarize what was changed and mention any verification performed.
