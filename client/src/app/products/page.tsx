'use client';

import { useState } from 'react';
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api';
import Header from '@/app/(components)/Header';
import Rating from '@/app/(components)/Rating';
import { Loader2, PlusCircle, SearchIcon } from 'lucide-react';
import CreateProductModal from './CreateProductModal';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loader2 className="flex justify-center items-center text-blue-500 animate-spin size-8" />
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className=" font-bold text-center text-red-600 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="size-5 text-gray-200 m-2" />
          <input
            className="w-full py-2 rounded bg-white focus:outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="size-5 mr-2 !text-gray-200" /> Create
        </button>
      </div>

      {/* BODY PRODUCTS LISTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <Loader2 className="size-5 animate-spin text-blue-500" />
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">£{product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
