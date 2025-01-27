## AI 春联生成器

> 🎯 本项目完全由字节跳动推出的全新 AI 编程工具：[Trae](https://www.trae.ai/) 完成开发。
>
> 📝 关于如何从 0 到 1 开发这个项目的详细介绍 [点击这里](https://mp.weixin.qq.com/s/6_NFU1X3w1QpdJHsfr7m3A) 查看。

利用 Claude API，实现只需输入关键词，即可快速生成上下联和横批，界面简洁且喜庆。

![Demo](Demo.gif)

## 功能特性

- 🤖 AI 驱动：利用 Claude API 模型生成对联
- 📝 实时生成：输入关键词，快速生成上下联和横批
- 🎨 优雅界面：简洁且喜庆的用户界面设计
- 📱 响应式设计：完美支持移动端 和桌面端
- ⚡️ 高性能：基于 Vite 构建，加载迅速，响应快速

## 技术栈

- React 18
- TypeScript
- Vite
- ESLint

## 环境配置

1. 获取 Claude API Key：
   - 访问 [Claude API 控制台](https://console.anthropic.com/)
   - 注册并登录账号
   - 在控制台中创建新的 API Key

2. 配置环境变量：
   - 将项目根目录下的 `.env.example` 文件复制并重命名为 `.env`
   - 在 `.env` 文件中将 `your_claude_api_key_here` 替换为你的实际 API Key
   ```plaintext
   VITE_CLAUDE_API_KEY=你的API密钥
   ```

## 项目启动

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 开源协议

MIT License