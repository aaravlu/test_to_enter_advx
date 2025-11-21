// "use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaGithub } from "react-icons/fa";
import {
  send_all,
  send_age,
  send_email,
  send_name,
  send_github_id,
} from "./send_data_to_server";

export interface AdvxApplicationData {
  github_id: string;
  name: string;
  email: string;
  age: number;
}

const defaultAdvxApplicationData: AdvxApplicationData = {
  github_id: "",
  name: "",
  email: "",
  age: 0,
};

export default function AdvxApplicationForm() {
  const [data, setData] = useState<AdvxApplicationData>(
    defaultAdvxApplicationData,
  );

  return (
    <form
      onSubmit={async () => {
        setData(defaultAdvxApplicationData);
        send_all(data);
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <FaGithub style={{ marginRight: "16px" }} /> Github ID:
        </label>
        <input
          type="text"
          name="github_id"
          value={data.github_id}
          onChange={(e) => {
            setData({ ...data, github_id: e.target.value });
          }}
          onBlur={async (e) => send_github_id(e.target.value)}
          required
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <FaUser style={{ marginRight: "16px" }} /> Name:
        </label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
          onBlur={async (e) => send_name(e.target.value)}
          required
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <FaEnvelope style={{ marginRight: "16px" }} /> Email:
        </label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => {
            if (e.target.checkValidity()) {
              setData({ ...data, email: e.target.value });
            }
          }}
          onBlur={async (e) => {
            send_email(e.target.value);
          }}
          required
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <FaCalendarAlt style={{ marginRight: "16px" }} /> Age:
        </label>
        {/*its length should from 10 to 60, which is length is 51*/}
        <select
          value={data.age}
          onChange={(e) =>
            setData({
              ...data,
              age: parseInt(e.target.value),
            })
          }
          onBlur={async (e) => send_age(parseInt(e.target.value))}
        >
          <option value="">Select Age</option>
          {Array.from({ length: 51 }, (_, i) => i + 10).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
