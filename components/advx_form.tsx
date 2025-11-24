import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ADVX_DATA_DEFAULT, ADVX_SCHEMA, AdvxData } from "../types/advx";
import {
  FaGithub,
  FaEnvelope,
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaHeart,
} from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

export default function FormComponent() {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<AdvxData>({
    resolver: zodResolver(ADVX_SCHEMA),
    defaultValues: ADVX_DATA_DEFAULT,
  });

  const handleBlur = async (field: keyof AdvxData) => {
    if (!(await trigger(field))) return;

    const values = getValues();
    const github_id = values.github_id;

    if (field !== "github_id") {
      try {
        await fetch("/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ github_id, [field]: values[field] }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* GitHub ID Field */}
      <div className="space-y-2">
        <label
          htmlFor="github_id"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub ID
        </label>
        <div className="relative">
          <input
            {...register("github_id")}
            id="github_id"
            type="text"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800"
            onBlur={() => handleBlur("github_id")}
            required
          />
          <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        </div>
        {errors.github_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.github_id.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="relative">
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800"
            onBlur={() => handleBlur("email")}
            required
          />
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="relative">
          <input
            {...register("name")}
            id="name"
            type="text"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800"
            onBlur={() => handleBlur("name")}
            required
          />
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Age Field */}
      <div className="space-y-2">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="relative">
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800"
            onBlur={() => handleBlur("age")}
            required
          />
          <FaBirthdayCake className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        </div>
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      {/* Birthday Field */}
      <div className="space-y-2">
        <label
          htmlFor="birthday"
          className="block text-sm font-medium text-gray-700"
        >
          Birthday
        </label>
        <div className="relative">
          <input
            {...register("birthday", { valueAsDate: true })}
            id="birthday"
            type="date"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800"
            onBlur={() => handleBlur("birthday")}
            required
          />
          <FaCalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        </div>
        {errors.birthday && (
          <p className="text-red-500 text-sm mt-1">{errors.birthday.message}</p>
        )}
      </div>

      {/* Gender Field */}
      <div className="space-y-2">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          Gender
        </label>
        <div className="relative">
          <select
            {...register("gender")}
            id="gender"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none text-gray-800"
            onBlur={() => handleBlur("gender")}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* Interests Field */}
      <div className="space-y-2">
        <label
          htmlFor="interests"
          className="block text-sm font-medium text-gray-700"
        >
          Interests
        </label>
        <div className="relative">
          <textarea
            {...register("interests")}
            id="interests"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none min-h-20 text-gray-800"
            onBlur={() => handleBlur("interests")}
          />
          <FaHeart className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
        </div>
        {errors.interests && (
          <p className="text-red-500 text-sm mt-1">
            {errors.interests.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
