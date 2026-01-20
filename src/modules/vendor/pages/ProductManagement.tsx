import { useState } from 'react';
import { Plus, Edit, Eye, Search, Package, DollarSign, Calendar } from 'lucide-react';
import { UserType } from '../../shared/types';
import { Product } from '../types';

interface ProductManagementProps {
  userType: UserType;
}

export default function ProductManagement({ userType }: ProductManagementProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'P001',
      name: '智能防跌倒监测系统',
      category: '智慧监测类',
      price: 2999.00,
      status: 'approved',
      supplier: '科技有限公司A',
      description: '基于AI技术的防跌倒监测系统，能够实时监测用户状态，预防跌倒风险。',
      createdAt: '2023-12-01',
      specifications: '传感器精度: ±0.1°, 电池续航: 7天, 防水等级: IP67'
    },
    {
      id: 'P002',
      name: '电子血压计',
      category: '医疗护理类',
      price: 299.00,
      status: 'approved',
      supplier: '医疗器械公司B',
      description: '数字显示电子血压计，测量准确，操作简便，适用于家庭和医疗机构使用。',
      createdAt: '2023-11-28',
      specifications: '测量范围: 0-300mmHg, 精度: ±3mmHg, 电源: 4节AA电池'
    },
    {
      id: 'P003',
      name: '手动轮椅',
      category: '康复训练类',
      price: 1200.00,
      status: 'approved',
      supplier: '康复设备公司C',
      description: '适用于行动不便者使用的轻便手动轮椅，具有折叠功能，便于携带和存放。',
      createdAt: '2023-11-25',
      specifications: '材质: 航空铝合金, 承重: 120kg, 折叠尺寸: 90x40x30cm'
    },
    {
      id: 'P004',
      name: '智能手环',
      category: '智慧监测类',
      price: 899.00,
      status: 'approved',
      supplier: '智能科技公司D',
      description: '多功能智能手环，专为老年人设计，具有健康监测和紧急报警功能。',
      createdAt: '2023-12-02',
      specifications: '心率监测、睡眠分析、跌倒检测、续航7天'
    },
    {
      id: 'P005',
      name: '医用血糖仪',
      category: '医疗护理类',
      price: 450.00,
      status: 'approved',
      supplier: '医疗器械公司E',
      description: '专业医用血糖仪，快速准确，适合糖尿病患者日常监测。',
      createdAt: '2023-12-03',
      specifications: '测量范围: 1.1-33.3mmol/L, 精度: ±10%, 试纸盒装'
    },
    {
      id: 'P006',
      name: '老人助行器',
      category: '康复训练类',
      price: 680.00,
      status: 'approved',
      supplier: '康复设备公司F',
      description: '轻便耐用的老人助行器，具有座椅功能，方便老年人休息。',
      createdAt: '2023-12-05',
      specifications: '材质: 铝合金, 承重: 150kg, 可折叠, 带座椅'
    },
    {
      id: 'P007',
      name: '智能血压计',
      category: '医疗护理类',
      price: 380.00,
      status: 'approved',
      supplier: '医疗器械公司G',
      description: '智能语音血压计，具有数据上传功能，方便医生查看。',
      createdAt: '2023-12-06',
      specifications: '蓝牙连接, 心率监测, 自动充气, 语音播报'
    },
    {
      id: 'P008',
      name: '防褥疮气垫床',
      category: '生活护理类',
      price: 2500.00,
      status: 'approved',
      supplier: '护理设备公司H',
      description: '专业防褥疮气垫床，有效预防和治疗褥疮，适合长期卧床患者。',
      createdAt: '2023-12-08',
      specifications: '尺寸: 200x90cm, 气囊数量: 18个, 自动调节, 防水面料'
    },
    {
      id: 'P009',
      name: '制氧机',
      category: '医疗护理类',
      price: 3200.00,
      status: 'approved',
      supplier: '医疗器械公司I',
      description: '家用医疗制氧机，适合老年人及呼吸系统疾病患者使用。',
      createdAt: '2023-12-10',
      specifications: '氧气浓度: 90%-96%, 流量: 1-5L/min, 噪音: ≤45dB'
    },
    {
      id: 'P010',
      name: '康复训练床',
      category: '康复训练类',
      price: 8500.00,
      status: 'approved',
      supplier: '康复设备公司J',
      description: '多功能电动康复训练床，支持多角度调节，适用于术后康复训练。',
      createdAt: '2023-11-20',
      specifications: '尺寸: 220x100cm, 电动调节, 承重: 200kg, 带护栏'
    },
    {
      id: 'P011',
      name: '老年人GPS定位器',
      category: '智慧监测类',
      price: 299.00,
      status: 'approved',
      supplier: '智能科技公司K',
      description: '专为老年人设计的GPS定位设备，支持实时位置追踪和紧急求助。',
      createdAt: '2023-11-18',
      specifications: 'GPS+北斗双模定位, 续航7天, 一键SOS'
    },
    {
      id: 'P012',
      name: '护理床垫',
      category: '生活护理类',
      price: 1200.00,
      status: 'approved',
      supplier: '护理设备公司L',
      description: '专业护理床垫，具有防水透气功能，适合长期卧床者使用。',
      createdAt: '2023-11-15',
      specifications: '材质: 高密度海绵, 尺寸: 200x90x10cm, 防水透气'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = products.filter(product => {
    const matchesQuery = searchQuery === '' ||
                         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = searchCategory === 'all' || product.category === searchCategory;
    const matchesStatus = searchStatus === 'all' || product.status === searchStatus;

    // 经办机构只能看到已挂网（approved）产品
    const matchesUserType = userType === '经办机构' ? product.status === 'approved' : true;

    return matchesQuery && matchesCategory && matchesStatus && matchesUserType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'pending': return '待审核';
      case 'approved': return '已通过';
      case 'rejected': return '已驳回';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">产品管理</h2>
        {userType === '生产/代理企业' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>提交新产品</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className={`grid grid-cols-1 ${userType === '经办机构' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 mb-4`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
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
          {userType === '生产/代理企业' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="draft">草稿</option>
                <option value="pending">待审核</option>
                <option value="approved">已通过</option>
                <option value="rejected">已驳回</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchCategory('all');
              setSearchStatus('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的产品数据
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ¥{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductDetail(true);
                        }}
                        title="查看详情"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {product.status === 'draft' && (
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="编辑"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="px-6 py-3 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              显示 {startIndex + 1} 至 {Math.min(endIndex, filteredProducts.length)} 条，共 {filteredProducts.length} 条
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                上一页
              </button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
              </button>

              <div className="flex items-center ml-4">
                <span className="text-sm text-gray-500 mr-2">跳转到</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                />
                <span className="text-sm text-gray-500 ml-2">页</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showProductDetail && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">产品详情</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowProductDetail(false);
                    setSelectedProduct(null);
                  }}
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4">基本信息</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">产品编号</p>
                      <p className="font-medium">{selectedProduct.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">产品名称</p>
                      <p className="font-medium">{selectedProduct.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">产品分类</p>
                      <p className="font-medium">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">供应商</p>
                      <p className="font-medium">{selectedProduct.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">价格</p>
                      <p className="font-medium">¥{selectedProduct.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">状态</p>
                      <p className={`font-medium ${selectedProduct.status === 'approved' ? 'text-green-600' : selectedProduct.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {getStatusLabel(selectedProduct.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">提交时间</p>
                      <p className="font-medium">{selectedProduct.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">产品规格</h4>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="text-sm">{selectedProduct.specifications}</p>
                  </div>

                  <h4 className="font-semibold text-lg mb-4">产品描述</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm">{selectedProduct.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowProductDetail(false);
                    setSelectedProduct(null);
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}