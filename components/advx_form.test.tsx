import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ADVXForm from "./advx_form";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ADVXForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it("renders all form fields correctly", () => {
    render(<ADVXForm />);

    expect(screen.getByLabelText(/GitHub ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interests/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup();
    render(<ADVXForm />);

    // Get all required fields
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const ageInput = screen.getByLabelText(/Age/i);
    const birthdayInput = screen.getByLabelText(/Birthday/i);

    // Focus and blur each field to trigger validation
    await user.click(githubInput);
    await user.tab();

    await user.click(emailInput);
    await user.tab();

    await user.click(nameInput);
    await user.tab();

    await user.click(ageInput);
    await user.tab();

    await user.click(birthdayInput);
    await user.tab();

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/GitHub ID is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Age must be a positive integer/i),
      ).toBeInTheDocument();
    });
  });

  it("validates email format correctly", async () => {
    const user = userEvent.setup();
    render(<ADVXForm />);

    const emailInput = screen.getByLabelText(/Email/i);

    // Enter invalid email
    await user.type(emailInput, "invalid-email");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });

    // Enter valid email
    await user.clear(emailInput);
    await user.type(emailInput, "test@example.com");
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/Invalid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  it("validates age as positive integer", async () => {
    const user = userEvent.setup();
    render(<ADVXForm />);

    const ageInput = screen.getByLabelText(/Age/i);

    // Test with negative number - should show error
    await user.type(ageInput, "-5");
    await user.tab();

    await waitFor(() => {
      // Check that age field shows validation error
      const ageContainer = ageInput.closest("div");
      const errorMessage = ageContainer?.querySelector(".text-red-500");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(/.+/); // Should have some text content
    });

    // Clear field and test with decimal - should show error
    await user.clear(ageInput);
    await user.type(ageInput, "25.5");
    await user.tab();

    await waitFor(() => {
      // Check that age field still shows validation error
      const ageContainer = ageInput.closest("div");
      const errorMessage = ageContainer?.querySelector(".text-red-500");
      expect(errorMessage).toBeInTheDocument();
    });

    // Test with valid positive integer - should not show error
    await user.clear(ageInput);
    await user.type(ageInput, "25");
    await user.tab();

    await waitFor(() => {
      // Check that no validation error is shown for age field
      const ageContainer = ageInput.closest("div");
      const errorMessage = ageContainer?.querySelector(".text-red-500");
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it("submits form data on blur for non-github fields", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ADVXForm />);

    // Fill required fields first
    await user.type(screen.getByLabelText(/GitHub ID/i), "testuser");
    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Name/i), "Test User");
    await user.type(screen.getByLabelText(/Age/i), "25");

    // Test email field submission on blur
    const emailInput = screen.getByLabelText(/Email/i);
    await user.click(emailInput);
    await user.tab();

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_id: "testuser",
          email: "test@example.com",
        }),
      });
    });
  });

  it("does not submit on blur for github_id field", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ADVXForm />);

    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await user.type(githubInput, "testuser");
    await user.tab();

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  it("handles fetch errors gracefully", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ADVXForm />);

    // Fill required fields first
    await user.type(screen.getByLabelText(/GitHub ID/i), "testuser");
    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Name/i), "Test User");
    await user.type(screen.getByLabelText(/Age/i), "25");

    // Trigger blur on email field
    const emailInput = screen.getByLabelText(/Email/i);
    await user.click(emailInput);
    await user.tab();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it("handles gender selection correctly", async () => {
    const user = userEvent.setup();
    render(<ADVXForm />);

    const genderSelect = screen.getByLabelText(/Gender/i);

    // Check default value
    expect(genderSelect).toHaveValue("other");

    // Change to male
    await user.selectOptions(genderSelect, "male");
    expect(genderSelect).toHaveValue("male");

    // Change to female
    await user.selectOptions(genderSelect, "female");
    expect(genderSelect).toHaveValue("female");
  });

  it("handles optional interests field", async () => {
    const user = userEvent.setup();
    render(<ADVXForm />);

    const interestsTextarea = screen.getByLabelText(/Interests/i);

    // Should not have validation error for empty optional field
    await user.click(interestsTextarea);
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/Interests is required/i),
      ).not.toBeInTheDocument();
    });

    // Should accept text input
    await user.type(interestsTextarea, "Programming, Reading, Music");
    expect(interestsTextarea).toHaveValue("Programming, Reading, Music");
  });

  it("handles date input correctly", async () => {
    const user = userEvent.setup();
    render(<ADVXForm />);

    const birthdayInput = screen.getByLabelText(/Birthday/i);

    // Test with valid date
    await user.type(birthdayInput, "1990-01-15");
    expect(birthdayInput).toHaveValue("1990-01-15");

    // Test validation - date field is required but doesn't have a custom error message
    await user.clear(birthdayInput);
    await user.tab();

    await waitFor(() => {
      // The date field validation error will be shown but without specific message
      expect(birthdayInput).toBeInvalid();
    });
  });
});
