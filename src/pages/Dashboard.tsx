import sales from "../assets/icon-sales.png";
import cost from "../assets/icon-cost.png";
import profit from "../assets/icon-profit.png";
import bottle from "../assets/bottle.png";

const Dashboard = () => {
  return (
    <div className="p-[28px] bg-[#F8FAFC] min-h-screen flex flex-col gap-[24px]">
      <h1 className="text-[24px] font-semibold">Dashboard</h1>

      
      <div className="flex gap-[16px]">
        <div className="w-[207px] h-[84px] bg-[#FEF3F2] rounded flex items-center gap-4 px-4">
          <img src={sales} />
          <div>
            <p className="text-[#6C737F] text-sm">Sales</p>
            <h2 className="text-xl font-semibold">$152k</h2>
          </div>
        </div>

        <div className="w-[207px] h-[84px] bg-[#FFFAEB] rounded flex items-center gap-4 px-4">
          <img src={cost} />
          <div>
            <p className="text-[#6C737F] text-sm">Cost</p>
            <h2 className="text-xl font-semibold">$99.7k</h2>
          </div>
        </div>

        <div className="w-[207px] h-[84px] bg-[#F0FDF9] rounded flex items-center gap-4 px-4">
          <img src={profit} />
          <div>
            <p className="text-[#6C737F] text-sm">Profit</p>
            <h2 className="text-xl font-semibold">$32.1k</h2>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-[24px]">

        <div className="col-span-2 bg-white rounded-xl p-5">
          <h2 className="font-semibold mb-4">Sales Revenue</h2>

          <svg viewBox="0 0 600 200" className="w-full h-[200px]">
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
              points="0,150 80,130 160,140 240,90 320,110 400,60 480,100 560,80"
            />
          </svg>
        </div>

        
        <div className="bg-white rounded-xl p-5">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Top selling products</h2>
            <span className="text-blue-600 text-sm cursor-pointer">See All →</span>
          </div>

          <div className="flex items-center gap-3 py-3 border-b">
            <img src={ bottle } className="w-10 h-10 bg-gray-200 rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium">Healthcare Erbology</p>
              <p className="text-xs text-gray-400">in Accessories</p>
            </div>
            <span className="text-green-600">13,153</span>
          </div>

          <div className="flex items-center gap-3 py-3 border-b">
            <img src={ bottle } className="w-10 h-10 bg-gray-200 rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium">Healthcare Erbology</p>
              <p className="text-xs text-gray-400">in Accessories</p>
            </div>
            <span className="text-green-600">13,153</span>
          </div>

          <div className="flex items-center gap-3 py-3 border-b">
            <img src={ bottle } className="w-10 h-10 bg-gray-200 rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium">Healthcare Erbology</p>
              <p className="text-xs text-gray-400">in Accessories</p>
            </div>
            <span className="text-green-600">13,153</span>
          </div>

          <div className="flex items-center gap-3 py-3 border-b">
           <img src={ bottle } className="w-10 h-10 bg-gray-200 rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium">Healthcare Erbology</p>
              <p className="text-xs text-gray-400">in Accessories</p>
            </div>
            <span className="text-green-600">13,153</span>
          </div>

          <div className="flex items-center gap-3 py-3">
            <img src={ bottle } className="w-10 h-10 bg-gray-200 rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium">Healthcare Erbology</p>
              <p className="text-xs text-gray-400">in Accessories</p>
            </div>
            <span className="text-green-600">13,153</span>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-[24px]">
        
        <div className="bg-white rounded-xl p-5">
          <h2 className="font-semibold mb-4">Recent Transactions</h2>

          <div className="flex justify-between py-3 border-b">
            <span>Jagannath S.</span>
            <span>24.05.2023</span>
            <span>$124.97</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
              Paid
            </span>
          </div>

          <div className="flex justify-between py-3 border-b">
            <span>Anand G.</span>
            <span>23.05.2023</span>
            <span>$55.42</span>
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
              Pending
            </span>
          </div>

          <div className="flex justify-between py-3 border-b">
            <span>Kartik S.</span>
            <span>23.05.2023</span>
            <span>$89.90</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
              Paid
            </span>
          </div>

          <div className="flex justify-between py-3 border-b">
            <span>Rakesh S.</span>
            <span>22.05.2023</span>
            <span>$141.73</span>
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
              Pending
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h2 className="font-semibold mb-4">Top Products by Units Sold</h2>

          <div className="flex justify-between py-3 border-b">
            <span>Men Grey Hoodie</span>
            <span>$49.90</span>
            <span>204</span>
          </div>

          <div className="flex justify-between py-3 border-b">
            <span>Women Striped T-Shirt</span>
            <span>$34.90</span>
            <span>155</span>
          </div>

          <div className="flex justify-between py-3">
            <span>Women White T-Shirt</span>
            <span>$40.90</span>
            <span>120</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;