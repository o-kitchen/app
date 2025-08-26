# Bundle优化执行计划

## 影响文件范围
src/components/providers/mantine-theme-provider.tsx L4-9 ~-15
src/app/[locale]/ClientLayout.tsx L15-21 ~-5  
src/hooks/use-feed.ts L2-3 ~-2
next.config.mjs L1-20 ~+25
src/lib/dynamic-imports.ts L1-50 ~+50 (new)

## 执行步骤

### Step 1: 配置Bundle分析器
- Target: next.config.mjs L1-20
- Action: 添加@next/bundle-analyzer配置
- Checkpoint: 构建分析报告生成
- Rollback: git restore next.config.mjs

### Step 2: 优化Mantine导入
- Target: src/components/providers/mantine-theme-provider.tsx L4-9  
- Action: 按需导入替换全量导入
- Checkpoint: TypeScript编译无错误
- Rollback: git restore src/components/providers/mantine-theme-provider.tsx

### Step 3: 扩展动态导入
- Target: src/lib/dynamic-imports.ts (new)
- Action: 创建统一动态导入管理
- Checkpoint: 动态组件正常加载
- Rollback: rm src/lib/dynamic-imports.ts

### Step 4: Lens协议优化
- Target: src/hooks/use-feed.ts L2-3
- Action: 懒加载hooks，减少初始bundle
- Checkpoint: Feed功能正常
- Rollback: git restore src/hooks/

## Remeber.plan
1. strategy|按需导入+动态加载|减少初始bundle50%|重点优化mantine+lens
2. checkpoint|每步独立可回滚|避免功能破坏|原子化操作确保稳定性
3. verification|构建分析对比|量化优化效果|bundle-analyzer生成报告对比

## 接受标准
- 编译警告: 0
- 林检违规: 0  
- Bundle大小: 减少30%+
- 功能完整性: 100%
- 类型检查: pass