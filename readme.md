## user path
##### login
path = ```/user/login```

body input

> | name      |  type     | data type               | description  | required                                                         |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|--
> | email      |  mail | string   | N/A  | yes
> | password      |  text | string   | N/A  | yes

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

