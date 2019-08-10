# 豆瓣看过的电影

## 使用

### 1. 设置 HTML 头部

```html
<head>
  <meta name="referrer" content="never">
</head>
```

### 2. 引入资源

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iMuFeng/bmdb@1.2.0/dist/Bmdb.min.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/iMuFeng/bmdb@1.2.0/dist/Bmdb.min.js" />
</head>
```

### 3. 初始化参数

| 参数名 | 必选 | 类型   | 默认值 | 说明         |
| ------ | ---- | ------ | ------ | ---------- |
| type   | 是   | string | movies | `movies` 或 `books` |
| selector | 是   | string | 无 | 外层选择器 |
| secret | 是   | string | 无 | API 密钥 |
| skeletonNum  | 否   | number | 5 | 骨架屏数量 |
| showCategories | 否 | boolean | false | 是否显示分类列表，仅 `movies` 有效 |
| categoryFilters | 否 | string[] | [] | 展示的分类名称，默认展示所有分类 |
| noMoreText |  否   | string | 无 | 所有数据加载完成提示语 |
| cache |  否   | boolean | true | 是否缓存第一页数据 |
| limit  | 否   | number | 30 | 每页条数 |

```javascript
<script>
new Bmdb({
  type: 'movies',
  selector: '.container',
  secret: '7bf4205a0a62d00409f3cd70b0736e1a11a9a6a60f7231567f056819787b8096',
  noMoreText: '没有更多数据了',
  limit: 30
})
</script>
```
