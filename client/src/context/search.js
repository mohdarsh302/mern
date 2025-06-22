import { useState, useContext, createContext, useEffect } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });
  

   useEffect(() => {
      const data = localStorage.getItem("searchResult");
      if (data) {
        const parseData = JSON.parse(data);
        setValues({
          ...values,
          keyword: parseData.keyword,
          results: parseData.data,
        });
      }
      //eslint-disable-next-line
    }, []);

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
