'use client'

import { useState, useEffect } from "react";
import FilterPanel from "../components/FilterPanel";
import CategoryList from "../components/CategoryList";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import ProductSection from "../components/ProductSection";
import { fetchProducts } from "../utils/api";
import { Product } from "../utils/types";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Added Search Query State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState(500);

  // Fetch all products
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Apply filters: Category, Price & Search
  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category));
    }

    // Apply price filter (Ensure min price is $78)
    filtered = filtered.filter((product) => product.price >= 78 && product.price <= priceRange);

    // Apply search filter (Case-insensitive search by name)
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, searchQuery, products]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to change pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {/* ✅ Pass `setSearchQuery` to Navbar */}
      <Navbar onSearch={setSearchQuery} />
      
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar for Filters and Categories */}
          <div className="md:col-span-1">
            <CategoryList
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <FilterPanel priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>

          {/* Products Section */}
          <div className="md:col-span-3">
            <ProductSection
              heading="All Products"
              products={currentProducts} 
              showViewAll={false}
            />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}