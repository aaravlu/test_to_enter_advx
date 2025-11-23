import { dataStore } from "@/lib/data_store";

export const dynamic = "force-dynamic";

export default async function AllSubmittedData() {
  const dataList = Array.from(dataStore.values());

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Submitted Data</h1>
      <div className="space-y-4">
        {dataList.map((data, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">
              GitHub ID: {data.github_id}
            </h2>
            <p>Email: {data.email}</p>
            <p>Name: {data.name}</p>
            <p>Age: {data.age}</p>
            <p>Birthday: {new Date(data.birthday).toLocaleDateString()}</p>
            <p>Gender: {data.gender}</p>
            <p>Interests: {data.interests || "None"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
