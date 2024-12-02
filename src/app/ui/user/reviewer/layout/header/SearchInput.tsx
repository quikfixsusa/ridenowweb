import SearchIcon from '@/app/components/svg/icons/SearchIcon';
import { useState } from 'react';

export default function SearchInput() {
  const [search, setSearch] = useState('');
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('search', search);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full min-w-min max-w-[45%] items-center rounded-lg border border-gray-400 px-3"
    >
      <SearchIcon size={20} color="gray" />
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="h-[38px] w-full appearance-none rounded-lg pl-2 outline-none"
        placeholder="Search"
        type="text"
      />
    </form>
  );
}
