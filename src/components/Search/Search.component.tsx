import { BaseSyntheticEvent, useEffect, useState, useRef } from 'react';

import useDebounce from '../../hooks/useDebounce';
import { CommonSearchItem } from '../../services/types';
import Highlight from '../Highlight/Highlight.component';
import Loader from '../Loader/Loader.component';

import './Search.styles.css';

type SearchProps<Item> = {
  label: string,
  fetchItems: (title: string) => Promise<Item[]>
}
type SearchState<Item> = {
  items?: Item[],
  isLoading?: boolean,
  isError?: boolean
}

const initialSearchState = { items: [], isLoading: false, isError: false }

const Search = <Item extends CommonSearchItem>({ fetchItems, label }: SearchProps<Item>) => {
  const [{ items, isLoading, isError }, setSearchState] = useState<SearchState<Item>>(initialSearchState)

  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const searchTitle = useDebounce(search);

  const outsideCLickRef = useRef<HTMLDivElement>(null);

  const openResults = () => {
    setOpen(true)
  }
  const changeSearchValue = async ({ target: { value } }: BaseSyntheticEvent) => {
    setSearch(value)
  }
  const updateSearchState = (update: SearchState<Item>) => {
    setSearchState((prev) => ({ ...prev, ...update }))
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (outsideCLickRef.current && !outsideCLickRef.current.contains(event['target'] as HTMLDivElement)) {
      setOpen(false);
    }
  };
  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  }, []);

  const getData = async () => {
    updateSearchState({ isError: false, isLoading: true })
    try {
      const result = await fetchItems(searchTitle)
      updateSearchState({ items: result, isLoading: false })
    } catch (e) {
      updateSearchState({ isError: true, isLoading: false })
    }
  }

  useEffect(() => {
    getData()
  }, [searchTitle])

  const onItemSelect = () => {
    setOpen(false);
  }

  return (
    <div className="search" ref={outsideCLickRef}>
      <section className={`search__textfield ${isError ? 'error' : ''}`}>
        <input onFocus={openResults} className={`search__input ${search.length ? 'filled': ''}`} name={label} onChange={changeSearchValue}/>
        <label className="search__label" htmlFor={label}>{label}</label>
      </section>
      {isError
        ? <section className="search__item error">Oops, something went wrong... Try again?</section>
        : <section className={`search__result ${open ? 'opened' : ''}`}>
          {isLoading && <Loader />}
          <div className="search__list">
            {!!items?.length && items.map(({ title, id }) => (
              <div key={id} className="search__item" onClick={onItemSelect}>
                <Highlight text={title} highlight={search} />
              </div>
            ))}
            {!isLoading && !items?.length && <div className="search__item">No results</div>}
          </div>
        </section>
      }
    </div>
  );
}

export default Search;
