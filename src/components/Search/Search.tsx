import { ReactElement, useEffect, useState } from 'react';
import { Input } from 'antd';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../store';

import './style.css';

export function Search(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const isBasketClicked = useSelector(
    (state: any) => state.navigation.isBasketClicked,
  );

  const handleSearch = async (text: string): Promise<void> => {
    dispatch(search(text));
  };

  useEffect(() => {
    setInputValue('');
  }, [isBasketClicked]);

  return (
    <Input.Search
      placeholder="Поиск"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      enterButton
      onSearch={handleSearch}
    />
  );
}
