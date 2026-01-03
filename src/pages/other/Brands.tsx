import { Input, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { useEffect } from 'react'
import { GetBrend } from '../../api/api'


const Brands = () => {
  const { brend } = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBrend())
  })

  return (
    <div className="p-6 bg-white">
      <div className="flex gap-6">
        <div className="w-1/2 border rounded-md">
          <div className="flex justify-between px-4 py-3 border-b font-medium">
            <span>Brands</span>
            <span>Action</span>
          </div>

          {brend.map((brand) => (
            <div
              key={brand.id}
              className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
            >
              <span>{brand.brandName}</span>

              <div className="flex gap-4">
                <EditOutlined className="text-blue-500 cursor-pointer" />
                <DeleteOutlined className="text-red-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 border rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Add new brand</h2>

          <Input
            placeholder="Brand name"
            className="mb-4"
          />

          <div className="flex justify-end">
            <Button type="primary">
              Create
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Brands
