# Yu Zhou 的个人学术主页

参考 [al-folio](https://github.com/alshedivat/al-folio) 的学术主页结构，以原生 HTML、CSS、JavaScript 实现。不是 al-folio / Jekyll 的安装副本，无需 Ruby、Node 依赖或构建步骤，可直接部署到 GitHub Pages。

## 已有内容

- 左侧：照片、机构、位置、Email、Google Scholar、LinkedIn、GitHub。已移除照片下方的研究介绍和简历入口。
- 右侧：About Me、研究兴趣、教育经历、News、Publications。
- News 支持论文接收、项目获奖等类型，自动按日期倒序排列。
- 论文按年份倒序排列，展示标题、作者和会议 / 期刊名称；有多种类型的论文时才显示分类筛选。
- 论文标题支持直接跳转 DOI、arXiv 或其他论文页，也支持摘要展开和 BibTeX 复制。
- 纯白浅色主题与中性灰黑深色主题。默认跟随操作系统配色，右上角可选择 System / Light / Dark，并记住选择。
- 图标使用系统彩色 emoji：🎉 论文接收、🏆 获奖、🎓 教育、📖 论文、📝 引用等。导师姓名在简介和教育经历中均可点击。
- 适配电脑和手机；无外部字体、CDN 或跟踪服务依赖。

已填写真实资料：Heriot-Watt 计算机博士（2026 至今，导师 Oliver Lemon）、Imperial 硕士（2025–2026）和两段本科经历（2021–2025）。研究方向为 NLP、机器人安全和多智能体，所在地为 Edinburgh，邮箱为 `yz2069@hw.ac.uk`。

News 按最新在前显示：2026 年 8 月的论文接收、2026 年 3 月的黑客松获奖。论文填写了完整标题、四位作者、Findings of EMNLP 2026、PDF、代码仓库和 BibTeX。左侧头像已使用你提供的图片，保存在 `assets/profile.jpg`；以后替换这个文件即可更换头像。

公开信息核对来源：

- [ACL Anthology 论文记录](https://aclanthology.org/2026.findings-emnlp.415/)：标题、作者顺序、出版月份（2026 年 10 月）和引用信息。
- [0xClaw 项目 News](https://github.com/0xclaw-ai/0xClaw#-news)：论文**接收**月份为 2026 年 8 月，与出版月份不同。
- [用户指定的获奖公告](https://x.com/mingthemerxiles/status/2035732424408125800)：Z.ai 赛道第一名为 0xClaw，页面显示 2026 年 3 月 22 日。动态使用公告月份；项目 README 的获奖月份写成了 4 月，此处优先采用原始公告。

## 本地预览

在终端运行：

```bash
cd /Users/yz225/Downloads/homepage
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8000/>。终端需保持运行，按 `Ctrl+C` 停止；如果提示端口已被占用，可先打开现有预览，或将命令中的端口改成 `8001`。

修改文件后刷新网页即可。这个地址仅在运行服务器的电脑上访问，不是公开网址。

## 后续如何更新内容

主要编辑 `data.js`，其中每个字段都有中文注释：

| 内容 | 字段 / 操作 |
| --- | --- |
| 姓名、职位、学校 | `profile.name`、`position`、`institution` |
| 导师链接 | `profile.supervisor.name`、`profile.supervisor.url`；简介和教育详情中出现同名文字时自动添加链接 |
| 部门、位置 | `profile.department`、`location` |
| 照片 | 放入 `assets/profile.jpg`，设置 `profile.photo: "./assets/profile.jpg"` |
| 邮箱 | `profile.links.email`，只填邮箱地址 |
| Google Scholar / LinkedIn / GitHub | `profile.links.scholar`、`linkedin`、`github`，填完整 URL |
| About Me | `profile.bio` 数组，一项对应一段 |
| 研究兴趣 | `profile.interests` |
| 教育经历 | `education`，按希望展示的顺序填写 |
| 动态 / 获奖 | `news`，日期用 `YYYY-MM` 或 `YYYY-MM-DD`，链接可填 `url` |
| 论文 | `publications`，填写 `title`、`authors`、`venue`、`year`、`url` 等 |
| 更新日期 | `updated` |

论文的 `id` 需要唯一；`type` 为 `conference`、`journal` 或 `preprint`。在作者项设置 `self: true` 会下划线突出你的名字；`equal: true` 表示共同贡献。

每篇论文的 `url` 是**点击标题后的跳转地址**；`pdf`、`code` 可选，填入后会自动出现对应按钮。没有的字段保留 `null`，不要填写虚构链接。

当前 `template` 已设为 `false`，模板提示和未填写的个人链接均隐藏。已有的示例论文和示例新闻已删除。可同步更新两个 HTML 文件中的 `description`。英文页面也支持直接填中文；若改为中文为主，请把 HTML 的 `lang="en"` 改为 `lang="zh-CN"`。

## 从零发布到 yuzhou0801.github.io

### 1. 确定账号与网址

你的 GitHub 用户名为 `yuzhou0801`，因此仓库应命名为 **`yuzhou0801.github.io`**，部署后的网址为 **`https://yuzhou0801.github.io/`**。

- 这个地址尚未由本任务发布；下面是你之后的操作步骤。
- 显示昵称不等于用户名；在 `yuzhou0801` 账号下创建名叫 `yuzhou.github.io` 的仓库，并不能获得 `yuzhou.github.io` 这个地址。
- 无需购买域名，也无需配置 DNS。只有未来使用自己购买的独立域名时才涉及 DNS。

参见 [GitHub Pages 官方快速入门](https://docs.github.com/en/pages/quickstart)。

### 2. 创建仓库

仓库 [yuzhou0801/yuzhou0801.github.io](https://github.com/yuzhou0801/yuzhou0801.github.io) 已创建。2026 年 10 月 29 日核对时是公开空仓库，可以直接执行下一节的首次推送命令。

登录 GitHub，打开右上角 **+ → New repository**：

1. Owner 选择 `yuzhou0801`。
2. Repository name 填 `yuzhou0801.github.io`。
3. 选择 **Public**。GitHub Free 支持公开仓库的 Pages。
4. 如果使用下面的终端上传方式，暂时不要勾选 README、.gitignore 或 License，让远端仓库保持空白。
5. 点击 **Create repository**。

如果这个同名仓库已经存在，应在已有仓库中更新，先保留原有文件和历史，不要重复初始化或强制覆盖。

### 3. 上传本项目

方式 A：使用 GitHub 网页上传。

1. 在新仓库中点击 **uploading an existing file**，或 **Add file → Upload files**。
2. 上传本目录的文件和 `assets` 文件夹，**不要把外层 `homepage` 文件夹整个作为一层上传**。`index.html` 必须直接位于仓库根目录。
3. 确认至少包含 `index.html`、`publication.html`、`styles.css`、`data.js`、`app.js`、`theme.js` 和 `assets/favicon.svg`，然后提交到 `main`。
4. `.nojekyll` 是隐藏文件。如果上传时没带上，可用 **Add file → Create new file** 新建 `.nojekyll`，内容可以写 `Static site` 后提交。这会关闭默认的 Jekyll 处理。

方式 B：使用终端 Git。当前远端为空、本地目录尚未初始化 Git；下面已填入你的实际账号。

本机已有 GitHub CLI。先完成浏览器登录，选择 `yuzhou0801` 账号，等待命令结束后再执行推送部分：

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
```

首次推送（姓名和邮箱只设置在当前仓库中）：

```bash
cd /Users/yz225/Downloads/homepage
git init -b main
git config user.name "Yu Zhou"
git config user.email "yz2069@hw.ac.uk"
git add index.html publication.html styles.css data.js app.js theme.js assets .nojekyll .gitignore README.md
git commit -m "Create academic homepage"
git remote add origin https://github.com/yuzhou0801/yuzhou0801.github.io.git
git push -u origin main
```

如果 Git 要求身份信息，按提示设置自己的提交姓名和邮箱；如果需要 GitHub 认证，使用 GitHub Desktop、GitHub CLI 的浏览器登录，或你已配置的 Git 凭据。不要把账号密码或访问令牌写进网站文件。

### 4. 打开 GitHub Pages

进入仓库 **Settings → Pages → Build and deployment**：

- **Source**：`Deploy from a branch`
- **Branch**：`main`
- **Folder**：`/ (root)`
- 点击 **Save**。

本模板不需要安装 al-folio、不需要配置 `_config.yml`，也不需要额外编写构建工作流。GitHub 会负责 Pages 部署。

参见 [配置 GitHub Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

### 5. 等待并验证

1. 到仓库 **Actions** 查看 Pages 的部署任务，等待绿色成功状态。
2. 回到 **Settings → Pages**，点击 **Visit site**。
3. 打开 `https://yuzhou0801.github.io/`，检查照片、导航、论文链接和手机效果。
4. 官方说明发布可能需要最多约 10 分钟。如果暂时 404，先核对仓库命名、`main` + `/ (root)` 设置，以及根目录是否有 `index.html`，再查看 Actions 的错误信息。
5. `github.io` 地址支持 HTTPS。若 Pages 设置提供 **Enforce HTTPS**，保持启用。

### 6. 后续更新

修改 `data.js` 或照片等文件后，提交到 `main` 即可自动重新部署。网页编辑可以直接提交；终端方式示例：

```bash
cd /Users/yz225/Downloads/homepage
git add index.html publication.html styles.css data.js app.js theme.js assets .nojekyll .gitignore README.md
git commit -m "Update academic profile"
git push
```

修改布局时也把对应的 HTML、CSS 或 JavaScript 文件加入提交。通常不必重新配置 Pages。

## 文件结构

```text
homepage/
├── index.html          # 首页结构
├── publication.html    # 尚未填写论文 URL 时的本地详情页
├── data.js             # 个人资料、教育、News 和 Publications
├── app.js              # 渲染、筛选、摘要、引用和主题选择
├── theme.js            # 提前应用主题，避免刷新闪烁
├── styles.css          # 纯白 / 深色主题及响应式布局
├── assets/             # 图标，以及未来的照片、论文 PDF
├── .nojekyll           # 告诉 GitHub Pages 直接托管静态文件
├── .gitignore
└── README.md
```

官方参考：[创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[GitHub Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)。
