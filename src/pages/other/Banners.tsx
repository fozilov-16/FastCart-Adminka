import { DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons'

const images = [
  { id: 1, name: 'Healthcare_Erbology.png', img: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Healthcare_Erbology.png', img: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Healthcare_Erbology.png', img: 'https://via.placeholder.com/50' },
]

const UploadMock = () => (
  <div className="h-[128px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-center">
    <div className="w-8 h-8 mb-2 rounded-full bg-gray-200 flex items-center justify-center">
      ⬆️
    </div>
    <p className="font-medium text-sm">Click to upload or drag and drop</p>
    <p className="text-xs text-gray-400">
      (SVG, JPG, PNG, or gif maximum 900×400)
    </p>
  </div>
)

const Banners = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-3">Main sliders</h2>

          <UploadMock />

          <div className="border rounded-lg overflow-hidden mt-4">
            <div className="grid grid-cols-3 px-4 py-2 text-sm text-gray-500 bg-gray-50 border-b">
              <span>Image</span>
              <span>File name</span>
              <span className="text-right">Action</span>
            </div>

            {images.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 items-center px-4 py-3 border-b last:border-b-0"
              >
                <img src={item.img} className="w-10 h-10 rounded" />
                <span className="text-sm">{item.name}</span>
                <div className="flex justify-end">
                  <DeleteOutlined className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <div className="border rounded-md px-3 py-2 text-sm text-gray-500">
              Subtitle
            </div>
            <div className="border rounded-md px-3 py-2 text-sm text-gray-500">
              Title
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-3">Banner</h2>

          <UploadMock />

          <div className="border rounded-lg overflow-hidden mt-4">
            <div className="grid grid-cols-3 px-4 py-2 text-sm text-gray-500 bg-gray-50 border-b">
              <span>Image</span>
              <span>File name</span>
              <span className="text-right">Action</span>
            </div>

            <div className="grid grid-cols-3 items-center px-4 py-3">
              <img src="https://via.placeholder.com/50" className="w-10 h-10 rounded" />
              <span className="text-sm">Healthcare_Erbology.png</span>
              <div className="flex justify-end">
                <DeleteOutlined className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="border rounded-md px-3 py-2 text-sm text-gray-500">
              Categories
            </div>

            <div className="border rounded-md px-3 py-2 text-sm text-gray-500 flex items-center justify-between">
              05d/23h/59m/35s
              <ClockCircleOutlined className="text-gray-400" />
            </div>

            <div className="border rounded-md px-3 py-2 text-sm text-gray-500">
              Title
            </div>

            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm">
                Save
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Banners
