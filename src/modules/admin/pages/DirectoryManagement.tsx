import { useState } from 'react';
import { Plus, Edit, Trash, Check, X, FileText, Tag, Search, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { Directory } from '../types';

export default function DirectoryManagement() {
  const [directories, setDirectories] = useState<Directory[]>([
    {
      id: 'DIR2023001',
      name: '2023年长护险辅助器具目录',
      rules: [
        '申请人必须是参加长护险的老年人',
        '辅助器具必须符合国家相关标准',
        '同一类辅助器具限购一件'
      ],
      categories: [],
      status: 'draft',
      createdAt: '2023-01-15'
    },
    {
      id: 'DIR2023002',
      name: '2023年长护险辅助器具目录（第二批）',
      rules: [
        '申请人年龄须满65周岁',
        '辅助器具使用年限一般不超过5年',
        '价格合理，符合市场行情'
      ],
      categories: [],
      status: 'published',
      createdAt: '2023-06-01'
    }
  ]);

  const [showNewForm, setShowNewForm] = useState(false);
  const [newDirectory, setNewDirectory] = useState({
    id: '',
    name: '',
    rules: [] as string[],
    categories: [] as any[],
    priceLimit: undefined as number | undefined
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');

  const [newRule, setNewRule] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    subcategories: [] as any[]
  });
  const [newSubcategory, setNewSubcategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const toggleCategoryExpand = (categoryId: number) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId]
    });
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setNewDirectory(prev => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()]
      }));
      setNewRule('');
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim()) {
      setNewCategory(prev => ({
        ...prev,
        subcategories: [
          ...prev.subcategories,
          { id: Date.now(), name: newSubcategory.trim() }
        ]
      }));
      setNewSubcategory('');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() && newCategory.subcategories.length > 0) {
      setNewDirectory(prev => ({
        ...prev,
        categories: [
          ...prev.categories,
          {
            id: Date.now(),
            name: newCategory.name,
            subcategories: newCategory.subcategories
          }
        ]
      }));
      setNewCategory({
        name: '',
        subcategories: []
      });
    }
  };

  const handleCreateDirectory = () => {
    if (newDirectory.name.trim() && newDirectory.rules.length > 0 && newDirectory.categories.length > 0) {
      const newId = `DIR${new Date().getFullYear()}${String(directories.length + 1).padStart(3, '0')}`;

      setDirectories(prev => ([
        ...prev,
        {
          ...newDirectory,
          id: newId,
          status: 'draft',
          createdAt: new Date().toISOString().split('T')[0]
        }
      ]));

      setNewDirectory({
        id: '',
        name: '',
        rules: [],
        categories: []
      });

      setShowNewForm(false);
    }
  };

  const handlePublish = (id: string) => {
    setDirectories(directories.map(dir =>
      dir.id === id ? { ...dir, status: 'published' } : dir
    ));
  };

  const confirmDelete = () => {
    if (selectedDirectory) {
      setDirectories(directories.filter(dir => dir.id !== selectedDirectory.id));
      setShowDeleteConfirm(false);
      setSelectedDirectory(null);
    }
  };

  const handleDeleteClick = (directory: Directory) => {
    setSelectedDirectory(directory);
    setShowDeleteConfirm(true);
  };

  const filteredDirectories = directories.filter(directory => {
    const matchesQuery = searchQuery === '' ||
                         directory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         directory.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = searchStatus === 'all' || directory.status === searchStatus;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">目录管理</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          onClick={() => setShowNewForm(true)}
        >
          <Plus className="h-5 w-5" />
          <span>新增目录</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="目录名称或代码"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchStatus('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Directories Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目录代码</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目录名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规则数量</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类数量</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格上限</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDirectories.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的目录数据
                </td>
              </tr>
            ) : (
              filteredDirectories.map((directory) => (
                <tr key={directory.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {directory.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{directory.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {directory.rules.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {directory.categories.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      directory.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {directory.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {directory.priceLimit ? `¥${directory.priceLimit.toFixed(2)}` : '未设置'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {directory.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedDirectory(directory);
                          setShowDetail(true);
                        }}
                        title="查看详情"
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                      {directory.status === 'draft' ? (
                        <>
                          <button
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handlePublish(directory.id)}
                            title="发布目录"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="编辑目录"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(directory)}
                            title="删除目录"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500 text-sm">已发布目录不可编辑</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Directory Modal */}
      {showNewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">新增目录</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewForm(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">基本信息</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">目录名称</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="请输入目录名称"
                        value={newDirectory.name}
                        onChange={(e) => setNewDirectory(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">价格上限（元）</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="请输入价格上限"
                        value={newDirectory.priceLimit || ''}
                        onChange={(e) => setNewDirectory(prev => ({
                          ...prev,
                          priceLimit: e.target.value ? parseFloat(e.target.value) : undefined
                        }))}
                        min="0"
                        step="0.01"
                      />
                      <p className="text-xs text-gray-500 mt-1">设置该目录下产品的最高价格限制</p>
                    </div>
                  </div>
                </div>

                {/* Rules Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">目录规则</h4>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="请输入规则内容"
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                      />
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={handleAddRule}
                      >
                        添加规则
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2">已添加规则：</h5>
                      {newDirectory.rules.length === 0 ? (
                        <p className="text-gray-500 text-sm">暂无规则</p>
                      ) : (
                        <ul className="space-y-1">
                          {newDirectory.rules.map((rule, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="text-gray-600 mr-2">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">辅助器具分类</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">一级分类名称</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="请输入一级分类名称"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">二级分类</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="请输入二级分类名称"
                          value={newSubcategory}
                          onChange={(e) => setNewSubcategory(e.target.value)}
                        />
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
                          onClick={handleAddSubcategory}
                        >
                          添加二级分类
                        </button>
                      </div>

                      {newCategory.subcategories.length > 0 && (
                        <div className="mt-2 bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-700 mb-1">当前一级分类下的二级分类：</p>
                          <div className="flex flex-wrap gap-1">
                            {newCategory.subcategories.map((sub) => (
                              <span key={sub.id} className="bg-white px-2 py-1 rounded text-sm border">
                                {sub.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="bg-purple-600 text-white px-4 py-2 rounded-md"
                        onClick={handleAddCategory}
                      >
                        添加一级分类
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2">已添加分类：</h5>
                      {newDirectory.categories.length === 0 ? (
                        <p className="text-gray-500 text-sm">暂无分类</p>
                      ) : (
                        <div className="space-y-2">
                          {newDirectory.categories.map((category, index) => (
                            <div key={index} className="bg-white p-3 rounded border">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{category.name}</span>
                                <button
                                  className="text-gray-500 hover:text-gray-700"
                                  onClick={() => toggleCategoryExpand(index)}
                                >
                                  {expandedCategories[index] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </button>
                              </div>
                              {expandedCategories[index] && (
                                <div className="mt-2 pl-4">
                                  <p className="text-sm text-gray-600 mb-1">二级分类：</p>
                                  <div className="flex flex-wrap gap-1">
                                    {category.subcategories.map((sub: any) => (
                                      <span key={sub.id} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                        {sub.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    onClick={() => setShowNewForm(false)}
                  >
                    取消
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={handleCreateDirectory}
                  >
                    创建目录
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedDirectory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-red-600">确认删除目录</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="mb-4">您确定要删除目录 <strong>{selectedDirectory.name} ({selectedDirectory.id})</strong> 吗？</p>
              <p className="text-red-500 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                删除后将无法恢复，请谨慎操作！
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  取消
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={confirmDelete}
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Directory Detail Modal */}
      {showDetail && selectedDirectory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">目录详情</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedDirectory(null);
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
                      <p className="text-sm text-gray-500">目录代码</p>
                      <p className="font-medium">{selectedDirectory.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">目录名称</p>
                      <p className="font-medium">{selectedDirectory.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">状态</p>
                      <p className={`font-medium ${selectedDirectory.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedDirectory.status === 'published' ? '已发布' : '草稿'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">创建时间</p>
                      <p className="font-medium">{selectedDirectory.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">规则数量</p>
                      <p className="font-medium">{selectedDirectory.rules.length} 条</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">分类数量</p>
                      <p className="font-medium">{selectedDirectory.categories.length} 个</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">价格上限</p>
                      <p className="font-medium">{selectedDirectory.priceLimit ? `¥${selectedDirectory.priceLimit.toFixed(2)}` : '未设置'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">目录规则</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedDirectory.rules.length === 0 ? (
                      <p className="text-gray-500 text-sm">暂无规则</p>
                    ) : (
                      <ul className="space-y-2">
                        {selectedDirectory.rules.map((rule, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <span className="text-gray-600 mr-2">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <h4 className="font-semibold text-lg mb-4 mt-6">辅助器具分类</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedDirectory.categories.length === 0 ? (
                      <p className="text-gray-500 text-sm">暂无分类</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedDirectory.categories.map((category: any, index: number) => (
                          <div key={index} className="bg-white p-3 rounded border">
                            <div className="font-medium text-sm">{category.name}</div>
                            {category.subcategories && category.subcategories.length > 0 && (
                              <div className="mt-1">
                                <p className="text-xs text-gray-600 mb-1">二级分类：</p>
                                <div className="flex flex-wrap gap-1">
                                  {category.subcategories.map((sub: any) => (
                                    <span key={sub.id} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                      {sub.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedDirectory(null);
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