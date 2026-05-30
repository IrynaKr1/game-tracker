import React, { useState, useRef } from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import Input from '../Input';
import Select from '../Select';
import { GAME_STATUS, GAME_STATUS_LIST } from '../../../utils/constants';
import { createGameThunk } from '../../../store/slices/gamesSlice';
import styles from './GamesForm.module.scss';

const RAWG_API_KEY = import.meta.env.VITE_API_KEY_RAWG;

function GameForm ({ createGame, onSuccess }) {
  const [suggestions, setSuggestions] = useState([]);

  const debounceRef = useRef(null);

  const searchGames = (query, setFieldValue) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}&search_precise=true&page_size=5`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch {
        setSuggestions([]);
      }
    }, 400);
  };

  const handleSelectSuggestion = (game, setFieldValue) => {
    setFieldValue('title', game.name);
    setFieldValue('genre', game.genres?.[0]?.name || '');
    setFieldValue('rawgId', game.id);
    setFieldValue('imageUrl', game.background_image || null);
    setSuggestions([]);
  };

  const initialValues = {
    title: '',
    genre: '',
    status: GAME_STATUS.NOT_STARTED,
    playtime: '',
    image: null,
    imageUrl: null,
    rawgId: null,
  };

  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('genre', values.genre);
    formData.append('status', values.status);
    formData.append('playtime', values.playtime);
    if (values.image) {
      formData.append('image', values.image);
    } else if (values.imageUrl) {
      formData.append('imageUrl', values.imageUrl);
    }
    createGame(formData);
    formikBag.resetForm();
    onSuccess();
  };

  const classes = {
    error: styles.error,
    input: styles.input,
    valid: styles.valid,
    invalid: styles.invalid,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, values, isSubmitting }) => (
        <Form className={styles.formContainer}>
          <div className={styles.autocomplete}>
            <label>
              <span>Title: </span>
              <input
                className={classes.input}
                type='text'
                placeholder='Add game title'
                value={values.title}
                onChange={e => {
                  setFieldValue('title', e.target.value);
                  searchGames(e.target.value);
                }}
                onBlur={() => setTimeout(() => setSuggestions([]), 150)}
              />
            </label>
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map(game => (
                  <li
                    key={game.id}
                    className={styles.suggestionItem}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => handleSelectSuggestion(game, setFieldValue)}
                  >
                    <span>{game.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Input
            label='Genre:'
            type='text'
            name='genre'
            placeholder='Add game genre'
            classes={classes}
          />
          <Select
            label='Status:'
            name='status'
            options={GAME_STATUS_LIST}
            classes={classes}
          />
          <Input
            label='Playtime (hours):'
            type='number'
            name='playtime'
            placeholder='0'
            classes={classes}
          />
          <label>
            <span>Image: </span>
            <input
              className={classes.input}
              type='file'
              onChange={e =>
                setFieldValue('image', e.currentTarget.files[0] ?? null)
              }
            />
            {values.image && <span>{values.image.name}</span>}
            {!values.image && values.imageUrl && (
              <img
                src={values.imageUrl}
                alt='game cover'
                style={{ width: '80px', marginTop: '4px' }}
              />
            )}
          </label>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Add game'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createGame: values => dispatch(createGameThunk(values)),
});

export default connect(null, mapDispatchToProps)(GameForm);
