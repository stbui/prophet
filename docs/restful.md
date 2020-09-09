# 前端接口规范

### 映射 RESTful 接口

| 类型     | 方法   | url 示例                   | 说明                 |
| :------- | :----- | :------------------------- | :------------------- |
| GET_LIST | GET    | http://127.0.0.1/users     | 获取 users 列表      |
| GET_ONE  | GET    | http://127.0.0.1/users/:id | 获取一个单独的 users |
| CREATE   | POST   | http://127.0.0.1/users     | 创建一个新的 users   |
| UPDATE   | PUT    | http://127.0.0.1/users/:id | 更新 users           |
| DELETE   | DELETE | http://127.0.0.1/users/:id | 删除 users           |

### request

#### 分页

http://127.0.0.1/users?page=1&perPage=10

#### 排序

http://127.0.0.1/users?sort={field: 'id', order: 'ASC'}

#### 筛选

http://127.0.0.1/users?fitler={"name":"stbui"}

### response

GET http://127.0.0.1/users

```json
{
    "code": "0",
    "message": "操作成功",
    "total": 100,
    "result": [
        {
            "id": 1 // 必要字段
        },
        {
            "id": 2 // 必要字段
        }
    ]
}
```

GET http://127.0.0.1/users/:id

```json
{
    "code": "0",
    "message": "操作成功",
    "result": {
        "id": 1
    }
}
```

POST http://127.0.0.1/users

```json
{
    "code": "0",
    "message": "操作成功",
    "result": {
        "id": 1
    }
}
```

PUT http://127.0.0.1/users/:id

```json
{
    "code": "0",
    "message": "操作成功",
    "result": {
        "id": 1
    }
}
```

DELETE http://127.0.0.1/users/:id

```json
{
    "code": "0",
    "message": "操作成功",
    "result": {
        "id": 1
    }
}
```

### code

```json
{
    "code": "500",
    "message": "系统异常",
    "result": null
}
```

```json
{
    "code": "502",
    "message": "系统异常",
    "result": null
}
```

```json
{
    "code": "404",
    "message": "请求不存在",
    "result": null
}
```
