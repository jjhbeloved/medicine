import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Power, PowerOff, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Category, CATEGORIES } from '../types';

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      code: 'SHHL001',
      name: '成人纸尿裤',
      level1Category: '生活护理类',
      level2Category: '成人纸尿裤',
      genericName: '成人纸尿裤',
      material: '无纺布、吸收芯、高分子材料',
      status: 'active',
      description: '适用于失禁或行动不便的老年人使用的成人纸尿裤，具有良好的吸收性和透气性。',
      createdAt: '2023-01-15'
    },
    {
      id: '2',
      code: 'KFXL001',
      name: '手动轮椅',
      level1Category: '康复训练类',
      level2Category: '轮椅（手动）',
      genericName: '手动轮椅',
      material: '航空铝合金、钢化玻璃',
      status: 'active',
      description: '适用于行动不便者使用的轻便手动轮椅，具有折叠功能，便于携带和存放。',
      createdAt: '2023-01-20'
    },
    {
      id: '3',
      code: 'YLHL001',
      name: '电子体温计',
      level1Category: '医疗护理类',
      level2Category: '体温计',
      genericName: '电子体温计',
      material: '塑料、电子元件',
      status: 'active',
      description: '数字显示电子体温计，测量准确，操作简便，适用于家庭和医疗机构使用。',
      createdAt: '2023-02-01'
    },
    {
      id: '4',
      code: 'ZHJC001',
      name: '智能防跌倒监测系统',
      level1Category: '智慧监测类',
      level2Category: '防跌倒系统',
      genericName: '智能防跌倒监测系统',
      material: '传感器、微处理器',
      status: 'inactive',
      description: '基于AI技术的防跌倒监测系统，能够实时监测用户状态，预防跌倒风险。',
      createdAt: '2023-02-15'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchLevel1, setSearchLevel1] = useState('all');
  const [searchLevel2, setSearchLevel2] = useState('');
  const [searchGenericName, setSearchGenericName] = useState('');
  const [searchMaterial, setSearchMaterial] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter categories based on search criteria
  const filteredCategories = categories.filter(category => {
    const matchesQuery = searchQuery === '' ||
                         category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel1 = searchLevel1 === 'all' || category.level1Category === searchLevel1;
    const matchesLevel2 = searchLevel2 === '' ||
                          category.level2Category.toLowerCase().includes(searchLevel2.toLowerCase());
    const matchesGenericName = searchGenericName === '' ||
                               category.genericName.toLowerCase().includes(searchGenericName.toLowerCase());
    const matchesMaterial = searchMaterial === '' ||
                            category.material.toLowerCase().includes(searchMaterial.toLowerCase());
    const matchesStatus = searchStatus === 'all' ||
                          (searchStatus === 'active' && category.status === 'active') ||
                          (searchStatus === 'inactive' && category.status === 'inactive');

    return matchesQuery && matchesLevel1 && matchesLevel2 && matchesGenericName && matchesMaterial && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleToggleStatus = (id: string) => {
    setCategories(categories.map(category =>
      category.id === id
        ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' }
        : category
    ));
  };

  const handleAddCategory = (newCategoryData: Omit<Category, 'id' | 'createdAt'>) => {
    const newId = `CAT${new Date().getFullYear()}${String(categories.length + 1).padStart(3, '0')}`;
    const newCategory: Category = {
      ...newCategoryData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCategories([...categories, newCategory]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">类目管理</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-5 w-5" />
          <span>新增类目</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">生活护理类</p>
              <p className="text-xl font-bold">{CATEGORIES['生活护理类'].items.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-3">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">康复训练类</p>
              <p className="text-xl font-bold">{CATEGORIES['康复训练类'].items.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-3">
              <div className="w-6 h-6 bg-yellow-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">医疗护理类</p>
              <p className="text-xl font-bold">{CATEGORIES['医疗护理类'].items.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-3">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">智慧监测类</p>
              <p className="text-xl font-bold">{CATEGORIES['智慧监测类'].items.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="类目名称或代码"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">一级分类</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchLevel1}
              onChange={(e) => setSearchLevel1(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="生活护理类">生活护理类</option>
              <option value="康复训练类">康复训练类</option>
              <option value="医疗护理类">医疗护理类</option>
              <option value="智慧监测类">智慧监测类</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">二级分类</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入二级分类"
              value={searchLevel2}
              onChange={(e) => setSearchLevel2(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">器具通用名</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入通用名"
              value={searchGenericName}
              onChange={(e) => setSearchGenericName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">器具材质</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入材质"
              value={searchMaterial}
              onChange={(e) => setSearchMaterial(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="active">上架</option>
              <option value="inactive">下架</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchLevel1('all');
              setSearchLevel2('');
              setSearchGenericName('');
              setSearchMaterial('');
              setSearchStatus('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">序号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类代码</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类目名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">一级分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">二级分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">器具通用名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">器具材质</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCategories.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的类目数据
                </td>
              </tr>
            ) : (
              currentCategories.map((category, index) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.level1Category === '生活护理类' ? 'bg-blue-100 text-blue-800' :
                      category.level1Category === '康复训练类' ? 'bg-green-100 text-green-800' :
                      category.level1Category === '医疗护理类' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {category.level1Category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.level2Category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.genericName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {category.material}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status === 'active' ? '上架' : '下架'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowDetail(true);
                        }}
                        title="查看详情"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowEditForm(true);
                        }}
                        title="编辑"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className={`${
                          category.status === 'active' ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'
                        }`}
                        onClick={() => handleToggleStatus(category.id)}
                        title={category.status === 'active' ? '下架' : '上架'}
                      >
                        {category.status === 'active' ? <PowerOff className="h-5 w-5" /> : <Power className="h-5 w-5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              显示 {startIndex + 1} 至 {Math.min(endIndex, filteredCategories.length)} 条，共 {filteredCategories.length} 条
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page numbers */}
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
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Jump to page */}
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

      {/* Category Detail Modal */}
      {showDetail && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">类目详情</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedCategory(null);
                  }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4">基本信息</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">分类代码</p>
                      <p className="font-medium">{selectedCategory.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">类目名称</p>
                      <p className="font-medium">{selectedCategory.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">一级分类</p>
                      <p className="font-medium">{selectedCategory.level1Category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">二级分类</p>
                      <p className="font-medium">{selectedCategory.level2Category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">器具通用名</p>
                      <p className="font-medium">{selectedCategory.genericName}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">详细信息</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">器具材质</p>
                      <p className="font-medium">{selectedCategory.material}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">状态</p>
                      <p className={`font-medium ${selectedCategory.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedCategory.status === 'active' ? '上架' : '下架'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">创建时间</p>
                      <p className="font-medium">{selectedCategory.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">类目描述</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>{selectedCategory.description}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedCategory(null);
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{showAddForm ? '新增类目' : '编辑类目'}</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    setSelectedCategory(null);
                  }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分类代码</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="请输入分类代码"
                      defaultValue={selectedCategory?.code || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">类目名称</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="请输入类目名称"
                      defaultValue={selectedCategory?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">一级分类</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue={selectedCategory?.level1Category || ''}
                    >
                      <option value="">请选择一级分类</option>
                      <option value="生活护理类">生活护理类</option>
                      <option value="康复训练类">康复训练类</option>
                      <option value="医疗护理类">医疗护理类</option>
                      <option value="智慧监测类">智慧监测类</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">二级分类</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="请输入二级分类"
                      defaultValue={selectedCategory?.level2Category || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">器具通用名</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="请输入器具通用名"
                      defaultValue={selectedCategory?.genericName || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">器具材质</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="请输入器具材质"
                      defaultValue={selectedCategory?.material || ''}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">类目描述</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="请输入类目描述"
                    defaultValue={selectedCategory?.description || ''}
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    onClick={() => {
                      setShowAddForm(false);
                      setShowEditForm(false);
                      setSelectedCategory(null);
                    }}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAddForm(false);
                      setShowEditForm(false);
                      setSelectedCategory(null);
                    }}
                  >
                    {showAddForm ? '新增' : '保存'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}