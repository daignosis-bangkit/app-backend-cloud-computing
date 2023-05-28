## user path
##### register
path = post ```/user/login```

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
path = post ```/user/register```

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

##### forgot-password
path = patch ```/user/forgot-password```

body input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | username      |  text | string   |  | yes

json output
```
{
    "messages": "Check your new password on xxxx@gmail.com",
    "success": true
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

## message path
path = get ```/message/:id```

header input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | bearer-token      |  text | string   | get token from login | yes

params input
 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | id      |  text | string   | session_id | yes

json output
```
{
    "data": [
        {
            "is_bot": 1,
            "message": "Prediksi kami menunjukkan bahwa Anda cenderung memiliki diabetes berdasarkan gejala yang diberikan, dengan tingkat akurasi sekitar 100%.",
            "date": "2023-05-21T11:28:34.000Z"
        },
}
```

## session path
path = get ```/sessions/:id```

header input

 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | bearer-token      |  text | string   | get token from login | yes

parameter input
 | name      |  type     | data type               | description  | required                                                         |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
 | id      |  text | string   | N/A | yes


json output
```
{
    "data": [
        {
            "session_id": "27126901-ceaf-4f86-974c-bab85f38baf4",
            "message": "Based on the symptoms provided, our machine learning model predicts that you might have drug reaction, with an accuracy rate of approximately 100%.",
            "is_bot": 1,
            "latest_chat_date": "2023-05-25T14:41:44.000Z"
        },
    ]
}
```

## Socket
##### Connection
Header:
- ```authorization```: ```Bearer <login token>```

##### Emit
###### Create Session
Event: ```create_session```

###### Listen
Event: ```created_session```

Example Output:
```
{
    "session_id": "b9c273a9-a549-4e73-8958-2fcf65d8e770"
}
```

###### Emit
Event: ```new_message```

Input message/event: 
```
{
    "message": "I have a persistent cough, accompanied by chest tightness and shortness of breath. It's difficult for me to take deep breaths or engage in physical activities",
    "session_id": "27126901-ceaf-4f86-974c-bab85f38baf4"
}
```

###### Listen
Event: ```new_message```

Output:
```
{
    "message": "Based on the symptoms provided, our machine learning model predicts that you might have drug reaction, with an accuracy rate of approximately 100%.",
    "date": "2023-05-25T14:41:44.466Z"
}
```

Event: ```error```

Output:
```
{
    "message": `Error to send message. Error: <error message>`,
}
```
