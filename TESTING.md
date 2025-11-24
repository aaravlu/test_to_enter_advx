# Testing Guide

## Setup

This project uses Vitest for testing with React Testing Library. To get started:

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run tests:
   ```bash
   pnpm test          # Run tests in watch mode
   pnpm test:run      # Run tests once
   pnpm test:ui       # Run with Vitest UI
   pnpm test:setup    # Auto-install dependencies and run tests
   ```

## Test Structure

### FormComponent Tests

The `advx_form.test.tsx` file contains comprehensive tests for the form component:

- **Rendering**: Verifies all form fields render correctly
- **Validation**: Tests Zod schema validation for required fields, email format, age validation, etc.
- **Blur Submission**: Tests the auto-submit behavior on field blur
- **Error Handling**: Tests graceful handling of network errors
- **User Interaction**: Tests user interactions with form fields

### Key Test Features

1. **Mock Fetch**: Global fetch is mocked to test API calls
2. **User Events**: Uses `@testing-library/user-event` for realistic user interactions
3. **Async Testing**: Uses `waitFor` for asynchronous operations
4. **Error Boundaries**: Tests error handling and console error logging

## Test Coverage

The tests cover:

- ✅ Form field rendering
- ✅ Required field validation
- ✅ Email format validation
- ✅ Age validation (positive integers only)
- ✅ Date field validation
- ✅ Gender selection
- ✅ Optional interests field
- ✅ Auto-submit on blur (excluding github_id)
- ✅ Error handling for failed API calls
- ✅ User interaction scenarios

## Running Specific Tests

To run a specific test file:
```bash
pnpm test components/advx_form.test.tsx
```

To run tests with coverage:
```bash
pnpm test --coverage
```

To automatically install dependencies and run tests:
```bash
pnpm test:setup
```

## Test Environment

- **Testing Framework**: Vitest
- **DOM Environment**: jsdom
- **Assertion Library**: @testing-library/jest-dom
- **User Interaction**: @testing-library/user-event
- **React Testing**: @testing-library/react

## Test Runner

The project includes an automated test runner (`test-runner.ts`) that:

- Automatically checks for and installs missing dependencies
- Handles both pnpm and npm package managers
- Installs required test dependencies if missing
- Runs the test suite automatically

## Adding New Tests

When adding new tests:

1. Follow the existing patterns for mocking and assertions
2. Use `userEvent` for user interactions
3. Mock external dependencies appropriately
4. Test both success and error scenarios
5. Include accessibility considerations where relevant