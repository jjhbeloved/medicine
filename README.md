# 长护险辅助器具采购平台

这是一个基于 React + TypeScript + Tailwind CSS 的长护险辅助器具采购平台，使用开源模块重写。

## 功能特性

- **用户类型切换**：支持经办机构和生产/代理企业两种用户类型
- **仪表板**：显示统计数据、最近活动和通知
- **产品管理**：查看和管理挂网产品，支持搜索和分页
- **目录管理**：管理产品目录（开发中）
- **资质审核**：审核企业资质（开发中）
- **公示公布**：产品公示功能（开发中）
- **申投诉管理**：处理投诉和申诉（开发中）

## 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Tailwind CSS** - CSS 框架
- **Lucide React** - 图标库
- **Vite** - 构建工具

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 `http://localhost:5173`

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx       # 页面头部
│   ├── Sidebar.tsx      # 侧边栏导航
│   ├── Dashboard.tsx    # 仪表板
│   ├── ProductManagement.tsx  # 产品管理
│   └── ...              # 其他组件
├── App.tsx             # 主应用组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 主要组件

- **Header**: 显示平台标题、用户类型切换和通知
- **Sidebar**: 侧边栏导航，根据用户类型显示不同菜单
- **Dashboard**: 统计数据展示和活动通知
- **ProductManagement**: 产品列表、搜索、详情查看

## 开发说明

此项目基于开源的 `src` 目录下的工程重写，去除了 Figma 相关的依赖，使用纯 React 实现。可以直接用 npm 安装和运行。