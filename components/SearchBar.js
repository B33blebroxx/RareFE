import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };

  return (
    <Form className="search-bar" onSubmit={handleSubmit}>
      <FormControl type="text" id="search" placeholder="Search Posts by Title" size="lg" onChange={handleChange} value={searchInput} />
    </Form>
  );
}
