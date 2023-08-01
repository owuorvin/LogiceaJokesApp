import React from 'react';

interface FilterProps {
  viewsFilter: number | null;
  onViewsFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ viewsFilter, onViewsFilterChange }) => {
  return (
    <div>
      <label htmlFor="views-filter">Filter by Views:</label>
      <select id="views-filter" value={viewsFilter ?? ''} onChange={onViewsFilterChange}>
        <option value="">All</option>
        <option value="0-25">0-25</option>
        <option value="26-50">26-50</option>
        <option value="51-75">51-75</option>
        <option value="76-100">76-100</option>
      </select>
    </div>
  );
};

export default Filter;
