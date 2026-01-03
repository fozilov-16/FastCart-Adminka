import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useState, useEffect } from 'react';
import { api, GetCategory } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';

type SearchProps = GetProps<typeof Input.Search>;

const Categories = () => {
  const { categories } = useSelector((state: RootState) => state.todo)
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
        <div className='flex items-center justify-between'>
          {categories?.map((prod) => (
            <div key={prod.id} className='py-[24px] px-[20px] rounded-[4px] border border-gray-400 w-[182px]'>
              <img
                src={`https://store-api.softclub.tj/images/${prod.categoryImage}`}
                alt={prod.categoryName}
                width={56}
                className='mb-[16px]'
              />

              <p>{prod.subCategories[0]?.subCategoryName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories