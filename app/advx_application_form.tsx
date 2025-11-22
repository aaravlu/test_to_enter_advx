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
      <div className="flex items-center mb-4">
        <label className="flex items-center">
          <FaGithub className="mr-4" /> Github ID:
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
          className="ml-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="flex items-center">
          <FaUser className="mr-4" /> Name:
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
          className="ml-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="flex items-center">
          <FaEnvelope className="mr-4" /> Email:
        </label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          onBlur={async (e) => {
            send_email(e.target.value);
          }}
          required
          className="ml-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="flex items-center">
          <FaCalendarAlt className="mr-4" /> Age:
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
          className="ml-2"
        >
          <option value="">Select Age</option>
          {Array.from({ length: 51 }, (_, i) => i + 10).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-blue-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
