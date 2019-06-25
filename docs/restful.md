## restFul

### 映射 RESTful 服务器接口

| 类型     | 方法   | url 示例                   | 说明                 |
| :------- | :----- | :------------------------- | :------------------- |
| GET_LIST | GET    | http://127.0.0.1/users     | 获取 users 列表      |
| GET_ONE  | GET    | http://127.0.0.1/users/:id | 获取一个单独的 users |
| CREATE   | POST   | http://127.0.0.1/users     | 创建一个新的 users   |
| UPDATE   | PUT    | http://127.0.0.1/users/:id | 更新 users           |
| DELETE   | DELETE | http://127.0.0.1/users/:id | 删除 users           |

### request

GET http://127.0.0.1/users
GET http://127.0.0.1/users/:id

可选参数

```
http://127.0.0.1/users/1?page=1&perPage=10

```

```json
{
  "page": "1",
  "perPage": "10"
}
```

POST http://127.0.0.1/users

PUT http://127.0.0.1/users/:id
DELETE http://127.0.0.1/users/:id

### response

GET http://127.0.0.1/users

```json
{
  "code": "0",
  "message": "操作成功",
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
  "result": null
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
