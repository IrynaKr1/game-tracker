import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import Input from '../Input';
import { GAME_STATUS } from '../../../utils/constants';
import { createGameThunk } from '../../../store/slices/gamesSlice';
import styles from './GamesForm.module.scss';

function GameForm ({ createGame }) {
  const initialValues = {
    title: '',
    genre: '',
    status: GAME_STATUS.NOT_STARTED,
    playtime: '',
    image: '',
  };

  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('genre', values.genre);
    formData.append('status', values.status);
    formData.append('playtime', values.playtime);
    formData.append('image', values.image);
    createGame(formData);
    formikBag.resetForm();
  };

  const classes = {
    error: styles.error,
    input: styles.input,
    valid: styles.valid,
    invalid: styles.invalid,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formikProps => (
        <Form>
          <Input
            label='Title:'
            type='text'
            name='title'
            placeholder='Add game title'
            classes={classes}
          />
          <button type='submit'>Add</button>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createGame: data => dispatch(createGameThunk(data)),
});

export default connect(null, mapDispatchToProps)(GameForm);
