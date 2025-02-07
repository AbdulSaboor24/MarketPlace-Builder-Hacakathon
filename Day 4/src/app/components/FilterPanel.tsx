"use client";
import { useState } from "react";

interface FilterPanelProps {
  priceRange: number;
  setPriceRange: (value: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ priceRange, setPriceRange }) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg border border-gray-200">
      <h3 className="font-bold text-lg mb-4">Filters</h3>

      {/* Price Range Slider */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Max Price: ${priceRange}</label>
        <input
          type="range"
          min="78"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span>$78</span>
          <span>$500</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;