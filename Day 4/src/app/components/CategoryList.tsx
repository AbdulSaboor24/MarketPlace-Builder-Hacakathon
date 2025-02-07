"use client";
import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";

interface CategoryListProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // Handle category selection/deselection
  const toggleCategory = (category: string) => {
    setSelectedCategories([
      ...selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category) // Remove if already selected
        : [...selectedCategories, category] // Add if not selected
    ]);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-4 py-2 rounded transition text-sm font-medium ${
              selectedCategories.includes(category)
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;