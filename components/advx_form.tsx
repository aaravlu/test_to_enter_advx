import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ADVX_DATA_DEFAULT, ADVX_SCHEMA, AdvxData } from "../types/advx";

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
    <form className="space-y-4">
      <div>
        <label htmlFor="github_id" className="block text-sm font-medium">
          GitHub ID
        </label>
        <input
          {...register("github_id")}
          id="github_id"
          type="text"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("github_id")}
          required
        />
        {errors.github_id && (
          <p className="text-red-500 text-sm">{errors.github_id.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("email")}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("name")}
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("age")}
          required
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="birthday" className="block text-sm font-medium">
          Birthday
        </label>
        <input
          {...register("birthday", { valueAsDate: true })}
          id="birthday"
          type="date"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("birthday")}
          required
        />
        {errors.birthday && (
          <p className="text-red-500 text-sm">{errors.birthday.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium">
          Gender
        </label>
        <select
          {...register("gender")}
          id="gender"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("gender")}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="interests" className="block text-sm font-medium">
          Interests
        </label>
        <textarea
          {...register("interests")}
          id="interests"
          className="w-full p-2 border rounded"
          onBlur={() => handleBlur("interests")}
        />
        {errors.interests && (
          <p className="text-red-500 text-sm">{errors.interests.message}</p>
        )}
      </div>

      <div>
        <button type="submit" className="font-medium">
          Submit
        </button>
      </div>
    </form>
  );
}
