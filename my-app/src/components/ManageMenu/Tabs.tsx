import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";

type Category = {
    id: number;
    name: string;
};

type Props = {
    value: string;
    onChange: (category: string) => void;
};

export default function Tabs({ value, onChange }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from("Categories")
            .select("id, name")
            .order("id", { ascending: true });

        if (error) {
            console.error("Error fetching categories:", error);
            return;
        }

        setCategories(data || []);
    };

    const tabs = [
        { id: 0, name: "ทั้งหมด" },
        ...categories
    ];

    return (
        <div className="mt-4 p-4 bg-white rounded-xl shadow-sm grid grid-cols-2 lg:grid-cols-10 gap-3">

            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.name)}
                    className={`px-4 py-2 rounded-md transition
                        ${value === tab.name
                            ? "bg-pink-400 text-white"
                            : "bg-pink-50 text-pink-400 border border-pink-300 hover:bg-pink-100"
                        }`}
                >
                    {tab.name}
                </button>
            ))}

        </div>
    );
}