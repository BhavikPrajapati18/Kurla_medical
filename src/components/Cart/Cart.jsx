import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const {cart} = useSelector(item=>item.user)
  console.log(cart);

    return (
      <div>
        { cart.map( (product ) => ( 
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
      </div>
    </div>
    )) }
      </div>
    )
}

export default Cart
