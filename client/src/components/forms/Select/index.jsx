import classNames from 'classnames';
import { Field } from 'formik';
import React from 'react';

function Select({ name, label, classes, options = [] }) {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        const selectClassNames = classNames(classes.input, {
          [classes.valid]: !meta.error && meta.touched,
          [classes.invalid]: meta.error && meta.touched,
        });

        return (
          <label>
            <span>{label} </span>
            <select className={selectClassNames} {...field}>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {meta.error && meta.touched && (
              <span className={classes.error}>{meta.error}</span>
            )}
          </label>
        );
      }}
    </Field>
  );
}

export default Select;
