import React, { useState } from "react";
import Logo from "../assets/logo/logo.png";
import ShoppingCartIcon from "../assets/icon/cart.png";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FilterPanel } from "./Filters";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
export const Header = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <header className="bg-black w-full flex justify-between common-padding items-center sticky top-0 z-50 py-2 text-white px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="size-18">
          <img src={Logo} alt="ElectroStore Logo" className="h-10 w-auto" />
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Right Side Navigation */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Filter Toggle */}
          <Tooltip title="Filter">
            <div
              className="cursor-pointer"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FilterListIcon style={{ fontSize: "34px" }} />
            </div>
          </Tooltip>
          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 md:gap-2 text-white cursor-pointer"
          >
            <div className="relative size-6 md:size-8">
              <img src={ShoppingCartIcon} alt="Cart" />
              <span className="absolute -top-2 right-0 size-5 text-sm bg-green-500 text-white rounded-full flex items-center justify-center">
                {cartItems.length || 0}
              </span>
            </div>
            <span className="hidden md:block">Cart</span>
          </Link>

          {/* Orders */}
          <Link
            to="/orders"
            className="hidden md:flex items-center gap-1 text-white cursor-pointer"
          >
            <span>Orders</span>
          </Link>
        </div>
      </header>

      {/* Filter Panel toggled below header */}
      {showFilter && (
        <div className="bg-white px-4 py-4 shadow-md z-40 relative">
          <FilterPanel onChange={(filters) => console.log(filters)} />
        </div>
      )}
    </>
  );
};
