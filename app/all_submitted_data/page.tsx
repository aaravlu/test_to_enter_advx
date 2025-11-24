import fs from "fs/promises";
import path from "path";
import { AdvxData } from "../../types/advx";
import {
  FaGithub,
  FaEnvelope,
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaHeart,
} from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

export const dynamic = "force-dynamic";

export default async function AllSubmittedData() {
  const dataDir = path.join(process.cwd(), "data");
  const files = await fs.readdir(dataDir);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  const dataList: AdvxData[] = [];
  for (const file of jsonFiles) {
    try {
      const filePath = path.join(dataDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(content) as AdvxData;
      dataList.push(data);
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        All Submitted Data
      </h1>

      {dataList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500 text-lg">No data submitted yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {dataList.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaGithub className="w-5 h-5 mr-2 text-gray-600" />
                {data.github_id}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-4 h-4 text-gray-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">{data.email}</p>
                  </div>
                </div>

                {/* Name */}
                <div className="flex items-center space-x-3">
                  <FaUser className="w-4 h-4 text-gray-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-800 font-medium">{data.name}</p>
                  </div>
                </div>

                {/* Age */}
                <div className="flex items-center space-x-3">
                  <FaBirthdayCake className="w-4 h-4 text-gray-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-gray-800 font-medium">{data.age}</p>
                  </div>
                </div>

                {/* Birthday */}
                <div className="flex items-center space-x-3">
                  <FaCalendarDays className="w-4 h-4 text-gray-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Birthday</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(data.birthday).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center space-x-3">
                  <FaVenusMars className="w-4 h-4 text-gray-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-800 font-medium capitalize">
                      {data.gender}
                    </p>
                  </div>
                </div>

                {/* Interests */}
                <div className="flex items-start space-x-3 md:col-span-2">
                  <FaHeart className="w-4 h-4 text-gray-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Interests</p>
                    <p className="text-gray-800 font-medium">
                      {data.interests || "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
