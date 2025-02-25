import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const LIMIT = 10;
  const [offset, setOffset] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(data.slice(offset, offset + LIMIT));
  }, [offset, data]);

  const handlePagination = (direction) => {
    setOffset((prevOffset) => Math.max(prevOffset + direction, 0));
  };

  const handleSearch = (query) => {
    if (!query) {
      setOffset(0);
      setFilteredProducts(data.slice(0, LIMIT));
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter(
      ({ description = "", alt_description = "" }) =>
        description.toLowerCase().includes(lowerCaseQuery) ||
        alt_description.toLowerCase().includes(lowerCaseQuery)
    );
    
    setOffset(0);
    setFilteredProducts(filtered.slice(0, LIMIT));
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={handleSearch} />
      <div className="mt2 mb2">
        {filteredProducts.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-LIMIT)} disabled={offset === 0} />
        <Button text="Next" handleClick={() => handlePagination(LIMIT)} disabled={offset + LIMIT >= data.length} />
      </div>
    </div>
  );
};

export default CardList;
