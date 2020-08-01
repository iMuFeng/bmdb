# 豆瓣看过的电影

## 使用

`2.0+` 使用 `React` 重构，`jQuery` 旧版本点击这里 [1.8.1](https://github.com/iMuFeng/bmdb/tree/1.8.1)

### 1. 设置 HTML 头部

```html
<head>
  <meta name="referrer" content="same-origin">
</head>
```

### 2. 引入资源

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iMuFeng/bmdb@2.0.0/dist/bmdb.css">
  <script src="https://cdn.jsdelivr.net/gh/iMuFeng/bmdb@2.0.0/dist/bmdb.js" />
</head>
```

### 3. 初始化参数

| 参数名 | 必选 | 类型   | 默认值 | 说明         |
| ------ | ---- | ------ | ------ | ---------- |
| type   |  ✅  | string | 无 | `movie` 或 `book` |
| selector | ✅   | string | 无 | 外层选择器 |
| secret | ✅   | string | 无 | API 密钥 |
| darkMode |  否   | boolean | false | 是否开启[深色模式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme) |
| categories | 否 | string[] | 无 | 展示的分类名称，默认展示所有分类 |
| endOfContentTips |  否   | string | 无 | 所有数据加载完成提示语 |

```html
<div class="container"></div>

<script>
new Bmdb({
  type: 'movie',
  selector: '.container',
  secret: '7bf4205a0a62d00409f3cd70b0736e1a11a9a6a60f7231567f056819787b8096',
  endOfContentTips: '没有更多数据了'
})
</script>
```
