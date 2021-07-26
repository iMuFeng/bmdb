# 豆瓣看过的电影

## 使用

`2.x` 使用 `React` 重构，`jQuery` 旧版本点击这里 [@1.8.1](https://github.com/iMuFeng/bmdb/tree/1.8.1)

### 1. 设置 HTML 头部

```html
<head>
  <meta name="referrer" content="same-origin">
</head>
```

### 2. 引入资源

```html
<head>
  <script src="https://cdn.jsdelivr.net/combine/npm/react@17.0.2/umd/react.production.min.js,npm/react-dom@17.0.2/umd/react-dom.production.min.js,gh/iMuFeng/bmdb@3.4.0/dist/bmdb.js""></script>
</head>
```

### 3. 初始化参数

| 参数名 | 必选 | 类型   | 默认值 | 说明         |
| ------ | ---- | ------ | ------ | ---------- |
| type   |  ✅  | string | 无 | `movie` 或 `book` |
| selector | ✅   | string | 无 | 外层选择器 |
| secret | ✅   | string | 无 | API 密钥 |
| categories | 否 | string[] | 无 | 展示的分类名称，默认展示所有分类 |
| noMoreDataTips |  否   | string | `You've reached the end of the list.` | 所有数据加载完成提示语 |
| themeMode |  否   | string | `auto` | `light`, `dark` 或 `auto` |
| customTheme | 否 | { light: [Theme](https://github.com/iMuFeng/bmdb/blob/master/src/theme.ts#L21), dark: [Theme](https://github.com/iMuFeng/bmdb/blob/master/src/theme.ts#L21) } | 无 | 自定义主题 |

```html
<div class="container"></div>

<script>
new Bmdb({
  type: 'movie',
  selector: '.container',
  secret: '7bf4205a0a62d00409f3cd70b0736e1a11a9a6a60f7231567f056819787b8096',
  noMoreDataTips: '没有更多数据了'
})
</script>
```
