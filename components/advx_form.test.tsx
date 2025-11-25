import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import ADVXForm from "./advx_form";

describe("ADVXForm", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders all form fields", () => {
    render(<ADVXForm />);
    expect(screen.getByLabelText(/GitHub ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interests/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("shows error for empty github_id on blur", async () => {
    render(<ADVXForm />);
    const input = screen.getByLabelText(/GitHub ID/i);
    await userEvent.click(input);
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByText("GitHub ID is required")).toBeInTheDocument();
    });
  });

  it("shows error for invalid email on blur", async () => {
    render(<ADVXForm />);
    const input = screen.getByLabelText(/Email/i);
    await userEvent.type(input, "invalid-email");
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("shows error for empty name on blur", async () => {
    render(<ADVXForm />);
    const input = screen.getByLabelText(/Name/i);
    await userEvent.click(input);
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("shows error for invalid age on blur", async () => {
    render(<ADVXForm />);
    const input = screen.getByLabelText(/Age/i);
    await userEvent.clear(input);
    await userEvent.type(input, "-5");
    await userEvent.tab();
    await waitFor(() => {
      expect(
        screen.getByText("Age must be a positive integer"),
      ).toBeInTheDocument();
    });
  });

  it("does not show error for valid gender", async () => {
    render(<ADVXForm />);
    const select = screen.getByLabelText(/Gender/i);
    await userEvent.selectOptions(select, "male");
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.queryByText(/Invalid/i)).not.toBeInTheDocument();
    });
  });

  it("does not submit on github_id blur", async () => {
    render(<ADVXForm />);
    const input = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(input, "testuser");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  it("submits on email blur with valid data", async () => {
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_id: "testuser",
          email: "test@example.com",
        }),
      });
    });
  });

  it("submits on name blur with valid data", async () => {
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, "Test Name");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_id: "testuser", name: "Test Name" }),
      });
    });
  });

  it("submits on age blur with valid data", async () => {
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const ageInput = screen.getByLabelText(/Age/i);
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, "25");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_id: "testuser", age: 25 }),
      });
    });
  });

  it("submits on birthday blur with valid data", async () => {
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const birthdayInput = screen.getByLabelText(/Birthday/i);
    await userEvent.type(birthdayInput, "1990-01-01");
    await userEvent.tab();
    await waitFor(() => {
      const call = fetchMock.mock.calls[0];
      expect(call[0]).toBe("/post");
      expect(call[1]).toEqual(
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
      const body = JSON.parse(call[1].body);
      expect(body).toEqual({
        github_id: "testuser",
        birthday: expect.any(String), // Date is serialized as ISO string
      });
    });
  });

  it("submits on gender blur with valid data", async () => {
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const genderSelect = screen.getByLabelText(/Gender/i);
    await userEvent.selectOptions(genderSelect, "female");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_id: "testuser", gender: "female" }),
      });
    });
  });

  it("submits on interests blur with valid data", async () => {
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const interestsTextarea = screen.getByLabelText(/Interests/i);
    await userEvent.type(interestsTextarea, "Coding, Reading");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_id: "testuser",
          interests: "Coding, Reading",
        }),
      });
    });
  });

  it("handles fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockRejectedValueOnce(new Error("Network error"));
    render(<ADVXForm />);
    const githubInput = screen.getByLabelText(/GitHub ID/i);
    await userEvent.type(githubInput, "testuser");
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, "Test Name");
    await userEvent.tab();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(new Error("Network error"));
    });
    consoleSpy.mockRestore();
  });
});
