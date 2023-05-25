## user path
##### register
path = post ```/user/register```

body input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | email      |  mail | string   | N/A  | yes
 | password      |  text | string   | N/A  | yes

json output
```
{
    "message": "Registration succeed",
    "data": {
        "username": "josi",
        "email": "josi@gmail.com"
    }
}
```


##### login
path = post ```/user/login```

body input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | username      |  text | string   | N/A  | yes
 | email      |  mail | string   | N/A  | yes
  | password      |  text | string   | N/A  | yes

json output
```
{
    "message": "Login success",
    "data": {
        "username": "josi",
        "full_name": null,
        "phone_number": null,
        "email": "josi@gmail.com",
        "birthday": null,
        "photo_profile": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2kiLCJmdWxsX25hbWUiOm51bGwsInBob25lX251bWJlciI6bnVsbCwiZW1haWwiOiJqb3NpQGdtYWlsLmNvbSIsImJpcnRoZGF5IjpudWxsLCJwaG90b19wcm9maWxlIjpudWxsLCJpYXQiOjE2ODUwMjE2MjMsImV4cCI6MTY4NTA1NzYyM30.4ZxWqzfQkXVsd6kfNCdTgt4nKcOymk7zX6MsLT3J9U0"
}
```

##### keep-login
path = patch ```/user/keep-login```

header input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | bearer-token      |  text | string   | get token from login | yes

json output
```
{
    "message": "Login success",
    "data": {
        "username": "josi",
        "full_name": null,
        "phone_number": null,
        "email": "josi@gmail.com",
        "birthday": null,
        "photo_profile": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2kiLCJmdWxsX25hbWUiOm51bGwsInBob25lX251bWJlciI6bnVsbCwiZW1haWwiOiJqb3NpQGdtYWlsLmNvbSIsImJpcnRoZGF5IjpudWxsLCJwaG90b19wcm9maWxlIjpudWxsLCJpYXQiOjE2ODUwMjI5NjksImV4cCI6MTY4NTA1ODk2OX0.OKNS2oRKPY2v7opiwUnogceP-NIWZYO0hfcpCIvgNbM"
}
```

##### get profile
path = get ```/user/profile```

header input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | bearer-token      |  text | string   | get token from login | yes

body input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | user_id      |  text | string   | N/A | yes

json output
```
{
    "message": "Login success",
    "data": {
        "username": "josi",
        "full_name": null,
        "phone_number": null,
        "email": "josi@gmail.com",
        "birthday": null,
        "photo_profile": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2kiLCJmdWxsX25hbWUiOm51bGwsInBob25lX251bWJlciI6bnVsbCwiZW1haWwiOiJqb3NpQGdtYWlsLmNvbSIsImJpcnRoZGF5IjpudWxsLCJwaG90b19wcm9maWxlIjpudWxsLCJpYXQiOjE2ODUwMjI5NjksImV4cCI6MTY4NTA1ODk2OX0.OKNS2oRKPY2v7opiwUnogceP-NIWZYO0hfcpCIvgNbM"
}
```

##### update profile
path = patch ```/user/profile```

header input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | bearer-token      |  text | string   | get token from login | yes

body input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | user_id      |  text | string   | N/A | yes
 | username      |  text | string   | N/A | yes
 | password      |  password | string   | N/A | yes
 | full_name      |  text | string   | N/A | yes
 | phone_number      |  text | number   | N/A | yes
 | email      |  mail | string   | N/A | yes
 | birthday      |  text | string   | N/A | yes
 | photo_profile      |  file | file   | N/A | yes
 | address      |  text | string   | N/A | yes
 | city      |  text | string   | N/A | yes
 | province      |  text | string   | N/A | yes
 | postal_code      |  text | string   | N/A | yes
 | country      |  text | string   | N/A | yes

json output
```
{
    "message": "Update Successful"
}
```

## article path
path = post ```/article/post```

header input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | bearer-token      |  text | string   | get token from login | yes

body input
 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | article_post      |  text | string   | N/A | yes
 | category      |  text | string   | N/A | yes
 | author      |  text | string   | N/A | yes
 | update_date      |  time | string   | N/A | yes
 | photo_article      |  file | string   | N/A | yes
 | article_name      |  text | string   | N/A | yes

json output
```
{
    "message": "Insert Successful"
}
```

path = get ```/article/:id```


parameter input
 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | id      |  text | string   | N/A | yes

json output
```
{
    "article_id": "4edcd35a-b6ed-46c2-9c10-1fb08d6e76a0",
    "article_name": "test",
    "article_post": "This is another article post ",
    "category": "Business",
    "author": "Jane Smith",
    "creation_date": "2023-05-09T05:30:00.000Z",
    "update_date": "2023-05-09T05:30:00.000Z",
    "photo_article": "https://storage.googleapis.com/lukaku_uploaded/asset-b0028d76-4645-43ff-90f1-60a424541a30"
}
```
