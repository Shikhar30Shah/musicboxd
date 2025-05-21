import Form from 'next/form'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

export default function SearchForm({ name }) {

    return (
        <Form action={'/'} scroll={true} className="search-form">
            <input defaultValue={name} name="name" className="search-input" placeholder="Start Searching..." autoComplete="off" />

            <div className="flex gap-2">
                {name.length && <SearchFormReset name={name} />}

                <button type='submit' className='search-btn'>
                    <Search />
                </button>
            </div>
        </Form>
    )
}