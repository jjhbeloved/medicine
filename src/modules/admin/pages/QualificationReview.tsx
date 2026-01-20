import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Clock, AlertTriangle, FileText, Tag, DollarSign, Search, Filter, Calendar, ClipboardCheck } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  specifications: string;
  supplier: string;
  status: 'first_review' | 'second_review' | 'approved' | 'rejected';
  submittedAt: string;
  description: string;
  firstReviewResult?: 'pass' | 'fail';
  firstReviewReason?: string;
  firstReviewer?: string;
  firstReviewTime?: string;
  secondReviewResult?: 'pass' | 'fail';
  secondReviewReason?: string;
  secondReviewer?: string;
  secondReviewTime?: string;
}

export default function QualificationReview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewType, setReviewType] = useState<'first' | 'second'>('first');
  const [reviewResult, setReviewResult] = useState<'pass' | 'fail'>('pass');
  const [reviewReason, setReviewReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [products, setProducts] = useState<Product[]>([
    {
      id: 'P001',
      name: '智能防跌倒监测系统',
      category: '智慧监测类',
      price: 2999.00,
      specifications: '传感器精度: ±0.1°, 电池续航: 7天, 防水等级: IP67',
      supplier: '科技有限公司A',
      status: 'first_review',
      submittedAt: '2023-12-01',
      description: '基于AI技术的防跌倒监测系统，能够实时监测用户状态，预防跌倒风险。'
    },
    {
      id: 'P002',
      name: '电子血压计',
      category: '医疗护理类',
      price: 299.00,
      specifications: '测量范围: 0-300mmHg, 精度: ±3mmHg, 电源: 4节AA电池',
      supplier: '医疗器械公司B',
      status: 'approved',
      submittedAt: '2023-11-28',
      description: '数字显示电子血压计，测量准确，操作简便，适用于家庭和医疗机构使用。',
      firstReviewResult: 'pass',
      firstReviewReason: '产品符合国家标准，功能完备',
      firstReviewer: '张审核员',
      firstReviewTime: '2023-11-29',
      secondReviewResult: 'pass',
      secondReviewReason: '复审通过，建议公示',
      secondReviewer: '李主任',
      secondReviewTime: '2023-11-30'
    },
    {
      id: 'P003',
      name: '手动轮椅',
      category: '康复训练类',
      price: 1200.00,
      specifications: '材质: 航空铝合金, 承重: 120kg, 折叠尺寸: 90x40x30cm',
      supplier: '康复设备公司C',
      status: 'rejected',
      submittedAt: '2023-11-25',
      description: '适用于行动不便者使用的轻便手动轮椅，具有折叠功能，便于携带和存放。',
      firstReviewResult: 'fail',
      firstReviewReason: '材质不符合国家标准要求',
      firstReviewer: '王审核员',
      firstReviewTime: '2023-11-26'
    },
    {
      id: 'P004',
      name: '智能手环',
      category: '智慧监测类',
      price: 899.00,
      specifications: '心率监测、睡眠分析、跌倒检测、续航7天',
      supplier: '智能科技公司D',
      status: 'second_review',
      submittedAt: '2023-12-03',
      description: '多功能智能手环，专为老年人设计，具有健康监测和紧急报警功能。',
      firstReviewResult: 'pass',
      firstReviewReason: '产品功能完备，符合老年人使用需求',
      firstReviewer: '张审核员',
      firstReviewTime: '2023-12-04'
    },
    {
      id: 'P005',
      name: '医用血糖仪',
      category: '医疗护理类',
      price: 450.00,
      specifications: '测量范围: 1.1-33.3mmol/L, 精度: ±10%, 试纸盒装',
      supplier: '医疗器械公司E',
      status: 'first_review',
      submittedAt: '2023-11-30',
      description: '专业医用血糖仪，快速准确，适合糖尿病患者日常监测。'
    },
    {
      id: 'P006',
      name: '电动轮椅',
      category: '康复训练类',
      price: 5800.00,
      specifications: '电机功率: 250W, 电池: 24V, 最大速度: 6km/h, 续航: 25km',
      supplier: '康复设备公司F',
      status: 'first_review',
      submittedAt: '2023-12-02',
      description: '高性能电动轮椅，适合行动不便的老年人，提供舒适的移动体验。'
    },
    {
      id: 'P007',
      name: '老人助行器',
      category: '康复训练类',
      price: 680.00,
      specifications: '材质: 铝合金, 承重: 150kg, 可折叠, 带座椅',
      supplier: '康复设备公司G',
      status: 'approved',
      submittedAt: '2023-11-20',
      description: '轻便耐用的老人助行器，具有座椅功能，方便老年人休息。',
      firstReviewResult: 'pass',
      firstReviewReason: '产品质量良好，安全性能达标',
      firstReviewer: '赵审核员',
      firstReviewTime: '2023-11-21',
      secondReviewResult: 'pass',
      secondReviewReason: '复审确认通过',
      secondReviewer: '刘主任',
      secondReviewTime: '2023-11-22'
    },
    {
      id: 'P008',
      name: '智能血压计',
      category: '医疗护理类',
      price: 380.00,
      specifications: '蓝牙连接, 心率监测, 自动充气, 语音播报',
      supplier: '医疗器械公司H',
      status: 'rejected',
      submittedAt: '2023-11-18',
      description: '智能语音血压计，具有数据上传功能，方便医生查看。',
      firstReviewResult: 'fail',
      firstReviewReason: '测量精度不符合医疗器械标准',
      firstReviewer: '孙审核员',
      firstReviewTime: '2023-11-19'
    },
    {
      id: 'P009',
      name: '防褥疮气垫床',
      category: '生活护理类',
      price: 2500.00,
      specifications: '尺寸: 200x90cm, 气囊数量: 18个, 自动调节, 防水面料',
      supplier: '护理设备公司I',
      status: 'first_review',
      submittedAt: '2023-12-04',
      description: '专业防褥疮气垫床，有效预防和治疗褥疮，适合长期卧床患者。'
    },
    {
      id: 'P010',
      name: '康复机器人',
      category: '智慧监测类',
      price: 15000.00,
      specifications: '关节数量: 6DOF, 负载: 20kg, 精度: 0.1mm, 编程控制',
      supplier: '机器人科技公司J',
      status: 'approved',
      submittedAt: '2023-11-15',
      description: '智能康复训练机器人，帮助患者进行精准的康复训练。',
      firstReviewResult: 'pass',
      firstReviewReason: '技术先进，符合康复医疗需求',
      firstReviewer: '周审核员',
      firstReviewTime: '2023-11-16',
      secondReviewResult: 'pass',
      secondReviewReason: '复审通过，技术领先',
      secondReviewer: '陈主任',
      secondReviewTime: '2023-11-17'
    }
  ]);

  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesQuery = searchQuery === '' ||
                           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = searchCategory === 'all' || product.category === searchCategory;
      const matchesStatus = searchStatus === 'all' || product.status === searchStatus;

      const matchesDateRange = (!startDate || product.submittedAt >= startDate) &&
                               (!endDate || product.submittedAt <= endDate);

      return matchesQuery && matchesCategory && matchesStatus && matchesDateRange;
    });
  };

  const handleApproval = (id: string, approved: boolean) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, status: approved ? 'approved' : 'rejected' }
        : product
    ));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'first_review': return '待初审';
      case 'second_review': return '待复审';
      case 'approved': return '已通过';
      case 'rejected': return '已驳回';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'first_review': return 'bg-blue-100 text-blue-800';
      case 'second_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReview = (productId: string, type: 'first' | 'second', result: 'pass' | 'fail', reason: string) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const updatedProduct = { ...product };

        if (type === 'first') {
          updatedProduct.firstReviewResult = result;
          updatedProduct.firstReviewReason = reason;
          updatedProduct.firstReviewer = '当前审核员'; // 这里可以替换为实际的用户信息
          updatedProduct.firstReviewTime = new Date().toISOString().split('T')[0];

          if (result === 'pass') {
            updatedProduct.status = 'second_review';
          } else {
            updatedProduct.status = 'rejected';
          }
        } else if (type === 'second') {
          updatedProduct.secondReviewResult = result;
          updatedProduct.secondReviewReason = reason;
          updatedProduct.secondReviewer = '复审主任'; // 这里可以替换为实际的用户信息
          updatedProduct.secondReviewTime = new Date().toISOString().split('T')[0];

          if (result === 'pass') {
            updatedProduct.status = 'approved';
            // 这里可以添加自动进入公示的逻辑
            console.log(`产品 ${product.name} 复审通过，自动进入公示流程`);
          } else {
            updatedProduct.status = 'rejected';
          }
        }

        return updatedProduct;
      }
      return product;
    }));

    setShowReviewModal(false);
    setReviewReason('');
    setSelectedProduct(null);
  };

  const filteredProducts = getFilteredProducts();
  
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">资质审核</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="产品名称、供应商或编号"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">审核状态</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="all">全部状态</option>
              <option value="first_review">待初审</option>
              <option value="second_review">待复审</option>
              <option value="approved">已通过</option>
              <option value="rejected">已驳回</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">提交开始日期</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">提交结束日期</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={() => {
                setSearchQuery('');
                setSearchCategory('all');
                setSearchStatus('all');
                setStartDate('');
                setEndDate('');
              }}
            >
              重置筛选
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品信息</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">供应商</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的审核数据
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ¥{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <div className="relative group">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDetail(true);
                          }}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          查看详情
                        </span>
                      </div>
                      {product.status === 'first_review' && (
                        <div className="relative group">
                          <button
                            className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50"
                            onClick={() => {
                              setSelectedProduct(product);
                              setReviewType('first');
                              setReviewResult('pass');
                              setShowReviewModal(true);
                            }}
                          >
                            <ClipboardCheck className="h-5 w-5" />
                          </button>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            进行初审
                          </span>
                        </div>
                      )}
                      {product.status === 'second_review' && (
                        <div className="relative group">
                          <button
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                            onClick={() => {
                              setSelectedProduct(product);
                              setReviewType('second');
                              setReviewResult('pass');
                              setShowReviewModal(true);
                            }}
                          >
                            <ClipboardCheck className="h-5 w-5" />
                          </button>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            进行复审
                          </span>
                        </div>
                      )}
                      {(product.status === 'approved' || product.status === 'rejected') && (
                        <span className="text-gray-400 text-xs flex items-center">
                          {product.status === 'approved' ? '已通过' : '已驳回'}
                        </span>
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
      {showDetail && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">产品审核详情</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowDetail(false);
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
                      <p className="text-sm text-gray-500">提交时间</p>
                      <p className="font-medium">{selectedProduct.submittedAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">审核状态</p>
                      <p className={`font-medium ${selectedProduct.status === 'approved' ? 'text-green-600' : selectedProduct.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {getStatusLabel(selectedProduct.status)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">产品规格</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm">{selectedProduct.specifications}</p>
                  </div>

                  <h4 className="font-semibold text-lg mb-4 mt-6">产品描述</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm">{selectedProduct.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowDetail(false);
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

      {/* Review Modal */}
      {showReviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {reviewType === 'first' ? '初审' : '复审'} - {selectedProduct.name}
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowReviewModal(false);
                    setReviewReason('');
                    setSelectedProduct(null);
                  }}
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">审核结果</h4>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reviewResult"
                      value="pass"
                      checked={reviewResult === 'pass'}
                      onChange={(e) => setReviewResult(e.target.value as 'pass')}
                      className="mr-2"
                    />
                    <span className="text-green-600 font-medium">通过</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reviewResult"
                      value="fail"
                      checked={reviewResult === 'fail'}
                      onChange={(e) => setReviewResult(e.target.value as 'fail')}
                      className="mr-2"
                    />
                    <span className="text-red-600 font-medium">驳回</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {reviewType === 'first' ? '初审' : '复审'}意见 <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder={`请输入${reviewType === 'first' ? '初审' : '复审'}意见...`}
                  value={reviewReason}
                  onChange={(e) => setReviewReason(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => {
                    setShowReviewModal(false);
                    setReviewReason('');
                    setSelectedProduct(null);
                  }}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => handleReview(selectedProduct.id, reviewType, reviewResult, reviewReason)}
                  disabled={!reviewReason.trim()}
                >
                  提交审核
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}