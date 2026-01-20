import { useState } from 'react';
import { Search, Eye, ShoppingCart, Package, Tag, DollarSign } from 'lucide-react';
import { ProductItem } from '../types';

export default function ProductQuery() {
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'P001',
      name: '智能防跌倒监测系统',
      category: '智慧监测类',
      price: 2999.00,
      specifications: '传感器精度: ±0.1°, 电池续航: 7天, 防水等级: IP67',
      supplier: '科技有限公司A',
      status: 'available'
    },
    {
      id: 'P002',
      name: '电子血压计',
      category: '医疗护理类',
      price: 299.00,
      specifications: '测量范围: 0-300mmHg, 精度: ±3mmHg, 电源: 4节AA电池',
      supplier: '医疗器械公司B',
      status: 'available'
    },
    {
      id: 'P003',
      name: '手动轮椅',
      category: '康复训练类',
      price: 1200.00,
      specifications: '材质: 航空铝合金, 承重: 120kg, 折叠尺寸: 90x40x30cm',
      supplier: '康复设备公司C',
      status: 'available'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchSupplier, setSearchSupplier] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesQuery = searchQuery === '' ||
                         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = searchCategory === 'all' || product.category === searchCategory;
    const matchesSupplier = searchSupplier === '' ||
                            product.supplier.toLowerCase().includes(searchSupplier.toLowerCase());

    return matchesQuery && matchesCategory && matchesSupplier;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">目录产品查询</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索产品</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="产品名称或编号"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品分类</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="all">全部分类</option>
              <option value="生活护理类">生活护理类</option>
              <option value="康复训练类">康复训练类</option>
              <option value="医疗护理类">医疗护理类</option>
              <option value="智慧监测类">智慧监测类</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">供应商</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入供应商名称"
              value={searchSupplier}
              onChange={(e) => setSearchSupplier(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchCategory('all');
              setSearchSupplier('');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            没有符合条件的產品数据
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">产品编号: {product.id}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'available' ? '可采购' : '暂无货'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">分类: {product.category}</span>
                  </div>

                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">供应商: {product.supplier}</span>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-lg font-bold text-blue-600">¥{product.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{product.specifications}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-1" />
                    查看详情
                  </button>
                  {product.status === 'available' && (
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-sm hover:bg-green-700 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      加入购物车
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}