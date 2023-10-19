import React from 'react';
import Card from './Card';

interface SearchListProps {
  filteredPersons: Array<{ id: number }>;
}


const SearchList: React.FC<SearchListProps> = ({ filteredPersons }) => {

  const filtered = filteredPersons.map(person => (
    <Card key={person.id} person={person} />
  ));


  
  return (
    <div className=''>
      {filtered}
    </div>
  );
}

export default SearchList;
