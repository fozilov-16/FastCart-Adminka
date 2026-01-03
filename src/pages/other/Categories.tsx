import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { api, DeleteCategory, GetCategory } from '../../api/api';
import type { Category } from '../../reducers/todoSlice';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type SearchProps = GetProps<typeof Input.Search>;

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(GetCategory());
  }, [dispatch]);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log('Search value:', value, 'Source:', info?.source);
  };

  const { Search } = Input;

  return (
    <div className="pt-6 px-4">
      <div className="flex flex-col gap-6">
        <div className='flex justify-between items-center'>
          <Search
            className="w-[250px]"
            placeholder="Search"
            onSearch={onSearch}
            style={{ width: 250 }}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer">
            + Add category
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          {categories?.map((cat: Category) => (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-start py-6 px-5 rounded-lg border border-gray-400 w-[182px]"
            >
              <img
                src={`${api}/images/${cat.categoryImage}`}
                alt={cat.categoryName}
                className="mb-4 w-14 h-14 object-cover rounded-md"
              />
              <h2 className="text-center font-semibold text-sm mb-2 line-clamp-1">
                {cat.categoryName}
              </h2>
              {cat.subCategories?.[0] ? (
                <p className="text-gray-600 text-xs text-center line-clamp-1">
                  {cat.subCategories[0].subCategoryName}
                </p>
              ) : (
                <p className="text-gray-400 text-xs text-center">No subcategory</p>
              )}
              <div className='flex mt-3'>
                <IconButton
                  color="primary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton color="error"
                  onClick={() => {
                    dispatch(DeleteCategory(cat.id))
                    dispatch(GetCategories());
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
