import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useState, useEffect } from 'react';
import { GetCategory } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';

type SearchProps = GetProps<typeof Input.Search>;

const Categories = () => {
  const { products, isLoading } = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetCategory())
  }, [])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const { Search } = Input;

  return (
    <div className="pt-[24px]">
      <div className="flex flex-col gap-[24px]">
        <Search className='w-[250px]' placeholder="Search" onSearch={onSearch} style={{ width: 200 }} />

        <div>

        </div>
      </div>
    </div>
  )
}

export default Categories