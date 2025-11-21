import { AdvxApplicationData } from "./advx_application_form";

const ROUTE_GITHUB_ID = "/api/save/github_id";
const ROUTE_NAME = "/api/save/name";
const ROUTE_EMAIL = "/api/save/email";
const ROUTE_AGE = "/api/save/age";

export async function send_all(data: AdvxApplicationData) {
  try {
    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to save:", error);
  }
}

// Send data to neon server's database.
export async function send_github_id(github_id: string) {
  try {
    await fetch(ROUTE_GITHUB_ID, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: github_id,
    });
  } catch (error) {
    console.error("Failed to save:", error);
  }
}
export async function send_name(name: string) {
  try {
    await fetch(ROUTE_NAME, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: name,
    });
  } catch (error) {
    console.error("Failed to save:", error);
  }
}
export async function send_email(email: string) {
  try {
    await fetch(ROUTE_EMAIL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: email,
    });
  } catch (error) {
    console.error("Failed to save:", error);
  }
}
export async function send_age(age: number) {
  try {
    await fetch(ROUTE_AGE, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: age.toString(),
    });
  } catch (error) {
    console.error("Failed to save:", error);
  }
}
