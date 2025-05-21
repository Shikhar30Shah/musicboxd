"use client"
import { createContext, useContext, useState } from "react";

const SearchParamsContext = createContext(null);

export function SearchParamsProvider({ children }) {
  const [params, setParams] = useState(null);
  return (
    <SearchParamsContext.Provider value={{ params, setParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export const useSearchParamsStore = () => useContext(SearchParamsContext);