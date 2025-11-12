'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Cadastro() {

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    return (
        <div className="bg-slate-700 h-[47.7vw] text-white">
            <h1>React Hook Form</h1>

            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <input {...register("firstName")} placeholder="First name" />
                <select {...register("category", { required: true })}>
                    <option value="">Select...</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                </select>
                <textarea {...register("aboutYou")} placeholder="About you" />
                <p>{data}</p>
                <input type="submit" />
            </form>

        </div>
    )
}