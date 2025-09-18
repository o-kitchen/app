## 待办事项 / TODO Items

### 高优先级 / High Priority
- [ ] 完善用户身份认证流程
- [ ] **启用 Next.js 图片优化** - 移除 unoptimized: true，提升加载速度
- [ ] **移除 force-dynamic** - 重构为混合渲染策略，大幅提升性能
- [ ] **优化 Bundle 大小** - 分析并减少不必要的依赖导入
- [ ] 实现内容上传和存储功能
- [ ] 添加基础的社交互动（点赞、评论）

### 中优先级 / Medium Priority
- [ ] 改进用户界面设计
- [ ] 添加内容搜索和过滤功能
- [ ] 实现用户关注系统
- [ ] 优化移动端体验

### 低优先级 / Low Priority
- [ ] 添加更多主题选项
- [ ] 实现内容导出功能
- [ ] 添加高级编辑器功能
- [ ] 集成第三方服务

---

### 渲染速度优化 / Rendering Speed Optimization

#### 最高优先级 / Critical Priority
- [ ] **启用 Turbopack 增量编译** - 配置 `next dev --turbo` 提升开发体验
- [ ] **移除 force-dynamic** - 重构 Layout 以支持混合渲染策略
- [ ] **实施 SSR/SSG 混合策略** - 静态页面使用 SSG，动态内容使用 ISR
- [ ] **实施流式渲染** - 使用 Suspense 和 Streaming SSR 优化首屏加载
- [ ] **启用 Next.js 图片优化** - 移除 `unoptimized: true`，启用自动优化

#### 高优先级 / High Priority  
- [ ] **代码分割优化** - 实施路由级和组件级智能代码分割
- [ ] **Bundle 分析优化** - 使用 @next/bundle-analyzer 分析并优化包大小
- [ ] **字体优化** - 配置字体子集化和 preload 策略
- [ ] **图片懒加载策略** - 实施渐进式图片加载和 WebP/AVIF 转换
- [ ] **重构 UI 组件** - Radix —— >> Mantine  

### 缓存和数据加载优化 / Caching & Data Loading

#### 高优先级 / High Priority
- [ ] **TanStack Query 缓存优化** - 细化缓存策略，实施智能预加载
- [ ] **API 路由缓存策略** - 配置适当的 Cache-Control 头
- [ ] **静态资源 CDN 配置** - 优化静态资源缓存和压缩
- [ ] **IPFS/Arweave 资源缓存** - 实施去中心化存储资源的本地缓存
- [ ] **Service Worker 离线缓存** - 添加关键资源的离线支持

### Web3 特定性能优化 / Web3 Performance

#### 高优先级 / High Priority
- [ ] **钱包连接优化** - 延迟加载钱包相关组件，减少初始加载时间
- [ ] **智能合约调用批处理** - 实施事务批处理减少 RPC 调用
- [ ] **RPC 请求缓存** - 缓存常用的区块链查询结果
- [ ] **Lens Protocol API 优化** - 实施请求去重和智能缓存
- [ ] **Web3 组件懒加载** - 将所有 Web3 相关组件改为按需加载

### 组件和架构优化 / Component & Architecture

#### 中优先级 / Medium Priority
- [ ] **React Server Components 迁移** - 将适合的组件迁移到 RSC
- [ ] **动态导入策略优化** - 重构 ClientLayout 的动态导入逻辑
- [ ] **状态管理粒度优化** - 避免不必要的全局状态更新
- [ ] **Context 性能优化** - 分离高频更新和低频更新的 Context
- [ ] **memo 和 callback 优化** - 为性能敏感组件添加适当的 memo

### 监控和度量 / Monitoring & Metrics

#### 高优先级 / High Priority  
- [ ] **Web Vitals 监控集成** - 添加 CLS、LCP、FID 等指标监控
- [ ] **Lighthouse CI 配置** - 在 CI/CD 中集成性能测试
- [ ] **性能预算设置** - 设定 bundle 大小和性能指标阈值
- [ ] **用户体验指标追踪** - 添加加载时间、交互延迟等指标
- [ ] **实时性能监控** - 集成 Sentry Performance 或类似工具

### 高级优化策略 / Advanced Optimization

#### 中优先级 / Medium Priority
- [ ] **多线程处理** - 使用 Web Workers 处理复杂计算
- [ ] **虚拟滚动** - 为长列表实施虚拟化渲染
- [ ] **预加载策略** - 智能预加载用户可能访问的内容
- [ ] **压缩和混淆优化** - 优化生产环境的代码压缩策略
- [ ] **HTTP/2 推送优化** - 配置关键资源的服务器推送

## 技术债务 / Technical Debt

### 性能相关技术债务 / Performance-Related Debt
- [ ] **重构 force-dynamic 页面** - 将全局动态改为按需动态渲染
- [ ] **重构 UI 组件** - Radix —— >> Mantine  
- [ ] **减少客户端组件数量** - 将适合的组件迁移到服务端组件
- [ ] **实施 React Server Components** - 逐步迁移到 RSC 架构
- [ ] **优化状态管理粒度** - 避免不必要的全局状态重渲染

### 常规技术债务 / General Technical Debt
- [ ] 重构状态管理逻辑
- [ ] 优化组件性能
- [ ] 改进错误处理机制
- [ ] 增加单元测试覆盖率
- [ ] 优化打包大小

## 已知问题 / Known Issues

### 性能相关问题 / Performance Issues  
- [ ] **首屏加载较慢** - force-dynamic 导致的 SSR 性能问题
- [ ] **图片加载未优化** - 禁用了 Next.js 图片优化功能
- [ ] **Bundle 体积过大** - Radix UI 组件全量导入
- [ ] **Web3 组件阻塞渲染** - 钱包连接组件影响首屏显示
- [ ] **缺乏缓存策略** - API 请求和静态资源缺乏有效缓存

### 功能相关问题 / Functional Issues
- [ ] 大文件上传可能超时
- [ ] 某些钱包兼容性问题

---

**更新时间 / Last Updated**: 2025-08-26