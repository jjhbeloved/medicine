// 经办机构模块的类型定义
export interface Category {
  id: string;
  code: string;
  name: string;
  level1Category: string;
  level2Category: string;
  genericName: string;
  material: string;
  status: 'active' | 'inactive';
  description: string;
  createdAt: string;
}

export interface Directory {
  id: string;
  name: string;
  status: 'published' | 'draft';
  createdAt: string;
  rules: string[];
  categories: any[];
  priceLimit?: number; // 价格上限（元）
}

export const CATEGORIES = {
  '生活护理类': {
    name: '生活护理类',
    items: [
      { name: '成人纸尿裤', code: 'SHHL001' },
      { name: '尿垫', code: 'SHHL002' },
      { name: '护理垫', code: 'SHHL003' },
      { name: '防褥疮气垫床', code: 'SHHL004' }
    ]
  },
  '康复训练类': {
    name: '康复训练类',
    items: [
      { name: '轮椅（手动）', code: 'KFXL001' },
      { name: '轮椅（电动）', code: 'KFXL002' },
      { name: '轮椅（智能型）', code: 'KFXL003' },
      { name: '助行器', code: 'KFXL004' },
      { name: '坐便椅', code: 'KFXL005' },
      { name: '移位机（小型）', code: 'KFXL006' }
    ]
  },
  '医疗护理类': {
    name: '医疗护理类',
    items: [
      { name: '体温计', code: 'YLHL001' },
      { name: '血压计', code: 'YLHL002' },
      { name: '输液泵', code: 'YLHL003' },
      { name: '导尿管', code: 'YLHL004' },
      { name: '吸氧管', code: 'YLHL005' },
      { name: '血糖试纸', code: 'YLHL006' },
      { name: '医用纱布', code: 'YLHL007' },
      { name: '消毒用品', code: 'YLHL008' }
    ]
  },
  '智慧监测类': {
    name: '智慧监测类',
    items: [
      { name: '防跌倒系统', code: 'ZHJC001' },
      { name: 'AI智能手环', code: 'ZHJC002' },
      { name: '康复机器人', code: 'ZHJC003' },
      { name: '智能监测纸尿裤', code: 'ZHJC004' }
    ]
  }
};