# UnTwin Backend REST API

### Routes
* POST: /api/register  (cookie is also sent)
```
body:
{
    "name":"coolkid",
    "email":"dk@gmail.com",
    "password":"12345678"
}

response:
{
    "success": true,
    "user": {
        "_id": "5fbe90214c08fc3e293a0e6a",
        "name": "coolkid",
        "email": "dk@gmail.com",
        "password": "$2b$10$RnhtQ184C11cWXVVcPe1UuwNoO10ch1dOs6dWWqKfAer3M0Op.FbK",
        "__v": 0
    }
}
```
* POST: /api/login
```
body:
{
    "email":"dk@gmail.com",
    "password":"12345678"
}

response:
{
    "isAuth": true,
    "id": "5fbe90214c08fc3e293a0e6a",
    "email": "dk@gmail.com"
}
```
* GET: /api/logout (body:none)
* GET: /api/profile (body:none)
