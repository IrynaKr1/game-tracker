import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import Input from '../Input';
import Select from '../Select';
import { GAME_STATUS, GAME_STATUS_LIST } from '../../../utils/constants';
import { createGameThunk } from '../../../store/slices/gamesSlice';
import styles from './GamesForm.module.scss';

function GameForm ({ createGame, onSuccess }) {
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
    if (values.image) {
      formData.append('image', values.image);
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
      {formikProps => (
        <Form className={styles.formContainer}>
          <Input
            label='Title:'
            type='text'
            name='title'
            placeholder='Add game title'
            classes={classes}
          />
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
                formikProps.setFieldValue(
                  'image',
                  e.currentTarget.files[0] ?? null
                )
              }
            />
            {formikProps.values.image && (
              <span>{formikProps.values.image.name}</span>
            )}
          </label>
          <button type='submit' disabled={formikProps.isSubmitting}>
            {formikProps.isSubmitting ? 'Submitting...' : 'Add game'}
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
