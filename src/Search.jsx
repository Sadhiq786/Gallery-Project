import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { useTheme } from './ThemeContext';
import Switch from 'react-switch';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://api.unsplash.com';
const IMAGES_PER_PAGE = 20;

function Search() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [index, setIndex] = useState(-1);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { query } = useParams();

  const fetchImages = useCallback(async () => {
    try {
      if (query) {
        setErrorMsg('');
        const { data } = await axios.get(
          `${API_URL}/search/photos?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
      } else {
        setErrorMsg('');
        const { data } = await axios.get(
          `${API_URL}/photos/random?count=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        setImages(data);
        setTotalPages(10); // Since it's random, we consider it as a single page
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.log(error);
    }
  }, [page, query]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = searchInput.current.value.trim();
    if (searchValue !== '') {
      navigate(`/gallery/search/${searchValue}`);
      setPage(1);
    } else {
      searchInput.current.value = '';
    }
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    navigate(`/gallery/search/${selection}`);
    setPage(1);
  };

  return (
    <div className={`toggleColor ${theme}`}>
      <div className="container">
        <h1 className='title'>Gallery</h1>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        <div className='search-section'>
          <Form onSubmit={handleSearch}>
            <Form.Control
              type='search'
              placeholder='Type something to search...'
              className='search-input'
              ref={searchInput}
            />
            <label>
              <Switch
                onChange={toggleTheme}
                checked={theme === 'dark'}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                handleDiameter={8}
                offColor='#000'
                onColor='#bbb'
              /><br/>
              <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </label>
          </Form>
        </div>

        <div className='filters'>
          <div onClick={() => handleSelection('mountains')}>Mountains</div>
          <div onClick={() => handleSelection('beaches')}>Beaches</div>
          <div onClick={() => handleSelection('birds')}>Birds</div>
          <div onClick={() => handleSelection('food')}>Food</div>
        </div>

        <div className='images'>
          {images.map((image, idx) => (
            <div
              className='image-container'
              key={image.id}
              onClick={() => setIndex(idx)}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className='image'
                title='Preview'
              />
            </div>
          ))}
        </div>

        <div className='buttons'>
          {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
          {page < totalPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
        </div>

        <Lightbox
          plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
          captions={{
            showToggle: true,
            descriptionTextAlign: 'end',
          }}
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={images.map((image) => ({
            src: image.urls.regular,
            alt: image.alt_description,
            description: image.alt_description,
          }))}
        />
      </div>
    </div>
  );
}

export default Search;