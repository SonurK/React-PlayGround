import React, { useState } from 'react';

function Field() {
  const [text, setText] = useState(window.localStorage.getItem('field'));
  const [field, setField] = useStorage('data', '');

  const save = (value) => {
    setText(value);
    window.localStorage.setItem('field', value);
  }

  return (
    <div className="field">
      <textarea
        value={text}
        onChange={(e) => save(e.target.value)}>
      </textarea>
      <br/>
      <textarea
        value={field}
        onChange={(e) => setField(e.target.value)}>
      </textarea>
    </div>
  );
}

export default Field;

function useStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const val = window.localStorage.getItem(key);
    return val ? JSON.parse(val) : initialValue
  });

  const saveValue = (val) => {
    setValue(val);
    window.localStorage.setItem(key, JSON.stringify(val));
  }

  return [value, saveValue];
}