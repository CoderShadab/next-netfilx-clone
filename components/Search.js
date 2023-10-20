'use client';
import React, { useState } from 'react';
import SearchList from '@/components/SearchList';


function Search({ details }) {


  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);


  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const filteredPersons = details.filter((person) => {
    return (
      person.title.toLowerCase().includes(searchField?.toLowerCase() || "")
    );
  });

  function searchList() {
    if (searchShow) {
      if (filteredPersons.length === 0) {
        // Display a message or nothing when there are no matching results
        return <p className='bg-black text-white'>No matching results found.</p>;
      } else {
        return (
          <div className='text-white'>
            <SearchList filteredPersons={filteredPersons} movieId='' />
          </div>
        );
      }
    }
  }



  return (
    <div className="">
      <div className="space-y-">
        <input
          className="w-1/2 p-[1%] md:w-[70%] md:p-1 lg:w-full lg:p-2 bg-opacity-30  bg-black rounded-md text-white"
          type="search"
          placeholder="Search Movie"
          onChange={handleChange}
        />
      </div>
      <div className='mt-3'>
        {searchList()}
      </div>
    </div>
  );
}

export default Search;