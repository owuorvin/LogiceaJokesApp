import React from 'react';

interface SortProps {
  sortBy: string | null;
  onSortByChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = ({ sortBy, onSortByChange }) => {
  return (
    <div>
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={sortBy ?? ''} onChange={onSortByChange}>
        <option value="">None</option>
        <option value="Views">Views</option>
        <option value="CreatedAt">Created Date</option>
      </select>
    </div>
  );
};

export default Sort;
