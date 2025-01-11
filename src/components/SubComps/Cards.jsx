import React, { useState } from 'react'
import products from '../../config.json'

function Cards() {

  // TODO : cart function

  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7 lg:grid-cols-4'> 
      { products.map( (product , index) => ( 
      <div className="rounded-2xl border border-blue-100 bg-white p-[6px]">
    <div className="relative flex h-[240px] w-full items-center justify-center rounded-xl bg-[#F6DAB0] p-4">
      <img
        src={product.image}
        alt={`${product.id} image`}
        className="max-h-full max-w-full object-contain"
      />
        <span className="absolute left-2 top-2 rounded-md bg-[#FB991C] px-2 py-1 text-sm text-white">
          -15%
        </span>
    </div>

    <div className="p-2 pt-0">
      <h3 className="my-5 line-clamp-2 text-sm font-medium sm:h-12">
        {product.title}
      </h3>

      <div className="mb-8 flex items-center">
        <span className="mr-2 text-lg font-medium text-[#FB991C]">
          ${product.prv_price}
        </span>
        {product.prv_price && (
          <span className="font-medium text-[#C9C9C9] line-through">
            ${product.price}
          </span>
        )}
      </div>

      <div className="flex gap-[10px]">
        <button
          // onClick={handleShowProductInfo}
          className="rounded-md bg-blue-50 p-2 hover:bg-[#e1e2e6] focus:outline-[#e1e2e6]"
          aria-label={`View details of ${product.title}`}
        >
          {/* <BadgeInfo color="#C9C9C9" /> */}
        </button>
        <button
          // onClick={handleAddToCart}
          className="w-full rounded-md bg-blue-50 py-[6px] font-medium text-[#1C7690] hover:bg-[#e1e2e6] focus:outline-[#e1e2e6]"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
  )) }
    </div>
    
)
}

export default Cards
