# FinanceCaster v0.0.1

API Documentation

- [Accounts](#accounts)
	- [Delete Account Permissions](#delete-account-permissions)
	- [Delete Account](#delete-account)
	- [Delete Account Transaction](#delete-account-transaction)
	- [List Account Permissions](#list-account-permissions)
	- [Get Account Permissions](#get-account-permissions)
	- [List Accounts](#list-accounts)
	- [Get Account](#get-account)
	- [View Forecast](#view-forecast)
	- [List Account Transactions](#list-account-transactions)
	- [Get Account Transaction](#get-account-transaction)
	- [Get Shared Account Details](#get-shared-account-details)
	- [Create Account Permission](#create-account-permission)
	- [Create Account](#create-account)
	- [Create Account Transaction](#create-account-transaction)
	- [Accept Shared Account](#accept-shared-account)
	- [Update Account Permissions](#update-account-permissions)
	- [Update Account](#update-account)
	- [Update Account Transaction](#update-account-transaction)
	
- [Authentication](#authentication)
	- [Log Out](#log-out)
	- [Delete Token](#delete-token)
	- [Get Auth Status](#get-auth-status)
	- [List Current Tokens](#list-current-tokens)
	- [Get Token](#get-token)
	- [Get User Information](#get-user-information)
	- [Log In](#log-in)
	- [Change Password](#change-password)
	- [Request a password reset](#request-a-password-reset)
	- [Create Account](#create-account)
	- [Verify User Account](#verify-user-account)
	- [Update User Information](#update-user-information)
	
- [Permissions](#permissions)
	- [Get Permissions](#get-permissions)
	- [Get Permissions](#get-permissions)
	- [Create Permissions](#create-permissions)
	- [Delete Permissions](#delete-permissions)
	
- [Tokens](#tokens)
	- [Delete Token](#delete-token)
	- [List All Tokens](#list-all-tokens)
	- [Get Token](#get-token)
	- [Create Tokens](#create-tokens)
	- [Update Token](#update-token)
	
- [Transactions](#transactions)
	- [Delete Transaction](#delete-transaction)
	- [Get Transactions](#get-transactions)
	- [Get Accounts](#get-accounts)
	- [Create Transactions](#create-transactions)
	- [Delete Transactions](#delete-transactions)
	
- [Users](#users)
	- [Delete User](#delete-user)
	- [Delete User Token](#delete-user-token)
	- [List Users](#list-users)
	- [Get User](#get-user)
	- [List User Tokens](#list-user-tokens)
	- [Get User Token](#get-user-token)
	- [Create User](#create-user)
	- [Update User](#update-user)
	


# Accounts

## Delete Account Permissions



	DELETE /:accountId/permissions/:id


## Delete Account



	DELETE /accounts/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
  {
    "message": "Record Deleted Successfully"
  }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Delete Account Transaction



	DELETE /accounts/:id/transactions/:transactionid


## List Account Permissions



	GET /:accountId/permissions


## Get Account Permissions



	GET /:accountId/permissions/:id


## List Accounts



	GET /accounts


### Success Response

Account List

```
[
  {
    "id": 1,
    "userId": 2,
    "name": "checking",
    "forecast": 365,
    "balance": 0,
    "balance_date" "2016-08-20T18:20:36.373Z",
    "limit": 0,
    "createdAt": "2016-08-20T18:20:36.373Z",
    "updatedAt": "2016-08-20T18:20:36.373Z"
  }
]
```
## Get Account



	GET /accounts/:id


### Success Response

Success-Response:

```
{
  "id": 1,
  "userId": 2,
  "name": "checking",
  "forecast": 365,
  "balance": 0,
  "balance_date" "2016-08-20T18:20:36.373Z",
  "limit": 0,
  "createdAt": "2016-08-20T18:20:36.373Z",
  "updatedAt": "2016-08-20T18:20:36.373Z"
}
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}s
```
## View Forecast



	GET /accounts/:id/forecast


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Integer			|  <p>Account ID</p>							|

## List Account Transactions



	GET /accounts/:id/transactions


### Success Response

Account List

```
[
  {
    "id": 1,
    "accountId": 2,
    "name": "Pay Check",
    "amount": 2838.28,
    "every_num": 2,
    "every_type": "weeks",
    "num_tansactions": 0,
    "start": "2016-08-20T18:20:36.373Z",
    "createdAt": "2016-08-20T18:20:36.373Z",
    "updatedAt": "2016-08-20T18:20:36.373Z"
  }
]
```
## Get Account Transaction



	GET /accounts/:id/transactions/:transactionid


## Get Shared Account Details



	GET /shared/:token


## Create Account Permission



	POST /:accountId/permissions


## Create Account



	POST /accounts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  							|
| forecast			| Integer			|  							|
| balance			| Float			|  							|
| balance_date			| DateTime			|  							|
| limit			| Float			|  							|

### Success Response

Success Example

```
{
    "id"
    "message": "Record Created Successfully"
}
```
### Error Response

Field Validation Error Example

```
{
  "error": "Field Validation Error",
  "code": "FC00010",
  "fields":
  [
    {
      "message": "email must be unique",
      "type": "unique violation",
      "path": "email",
      "value": "email@localhost"
    }
  ]
}
```
## Create Account Transaction



	POST /accounts/:id/transactions


## Accept Shared Account



	POST /shared/:token


## Update Account Permissions



	PUT /:accountId/permissions/:id


## Update Account



	PUT /accounts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  							|
| forecast			| Integer			|  							|
| balance			| Float			|  							|
| balance_date			| DateTime			|  							|
| limit			| Float			|  							|

### Success Response

Success Example

```
{
    "id"
    "message": "Record Updated Successfully"
}
```
### Error Response

Field Validation Error Example

```
HTTP/1.1 400 Bad Request
 {
   "error": "Field Validation Error",
   "code": "FC00010",
   "fields":
   [
     {
       "message": "name must be unique",
       "type": "unique violation",
       "path": "name",
       "value": "Checking"
     }
   ]
 }
```
Record Not Found Example

```
HTTP/1.1 404 Not Found
 {
    "error": "Record Not Found",
    "code": "FC00007"
 }
```
## Update Account Transaction



	PUT /accounts/:id/transactions/:transactionid


# Authentication

## Log Out



	DELETE /auth


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "success",
}
```
## Delete Token



	DELETE /auth/tokens/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "Token Deleted",
}
```
## Get Auth Status



	GET /auth


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "token_id": 3,
  "expires": "2016-08-21T01:53:05.525Z",
  "userId": 1,
  "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
  "name": "admin@localhost",
  "admin": true
 }
```
### Error Response

HTTP/1.1 403 Forbidden

```
HTTP/1.1 403 Forbidden
{
   "error": "Access Denied",
   "code": "FC00006"
}
```
## List Current Tokens



	GET /auth/tokens


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
[
   {
       "id": 1,
       "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
       "auth_token": "96f58ac1c6f326ac0dc98e792f0b8301",
       "ip": "127.0.0.1",
       "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
       "expires": "2016-08-20T02:36:29.052Z",
       "createdAt": "2016-08-19T02:36:29.059Z",
       "updatedAt": "2016-08-19T02:36:29.059Z",
       "userId": 1
   },
   {
       "id": 2,
       "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
       "auth_token": "9b28729f8175068488e9a16143dcdac3",
       "ip": "127.0.0.1",
       "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
       "expires": "2016-08-20T02:46:41.311Z",
       "createdAt": "2016-08-19T02:46:41.313Z",
       "updatedAt": "2016-08-19T02:46:41.313Z",
       "userId": 1
   }
 ]
```
## Get Token



	GET /auth/tokens/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "id": 1,
  "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
  "auth_token": "96f58ac1c6f326ac0dc98e792f0b8301",
  "ip": "127.0.0.1",
  "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
  "expires": "2016-08-20T02:36:29.052Z",
  "createdAt": "2016-08-19T02:36:29.059Z",
  "updatedAt": "2016-08-19T02:36:29.059Z",
  "userId": 1
}
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Get User Information



	GET /auth/user


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  							|
| email			| String			|  							|

### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "User Updated Successfully",
}
```
## Log In



	POST /auth


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>Username to attempt a log in with</p>							|
| password			| String			|  <p>Password to attempt a log in with</p>							|

### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "success",
  "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
  "auth_token": "936b05f45b6e9d34d1c249297dba0793",
  "expires": "2016-08-21T02:10:33.132Z"
}
```
### Error Response

Login Failed

```
HTTP/1.1 400 Bad Request
{
   "error": "Login Failed",
   "code": "FC00008"
}
```
## Change Password



	POST /auth/changepw


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| current			| String			|  							|
| newpassword			| String			|  							|

### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "Password Changed",
}
```
## Request a password reset



	POST /auth/forgot


## Create Account



	POST /auth/newuser


## Verify User Account



	POST /auth/verify/:verification


## Update User Information



	PUT /auth/user


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  							|
| email			| String			|  							|

### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "User Updated Successfully",
}
```
# Permissions

## Get Permissions



	GET /permissions


## Get Permissions



	GET /permissions/:id


## Create Permissions



	POST /permissions


## Delete Permissions



	PUT /permissions/:id


# Tokens

## Delete Token



	DELETE /tokens/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
{
  "message": "Token Deleted",
}
```
## List All Tokens



	GET /tokens


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
[
  {
    "id": 4,
    "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
    "auth_token": "936b05f45b6e9d34d1c249297dba0793",
    "ip": "127.0.0.1",
    "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
    "expires": "2016-08-21T02:10:33.132Z",
    "createdAt": "2016-08-20T02:10:33.134Z",
    "updatedAt": "2016-08-20T02:10:33.134Z",
    "userId": 1,
    "user":
    {
      "id": 1,
      "name": "Admin",
      "username": "admin",
      "password": "RqrvnsJN9qy7RZg9roxra5gsJ/AmE0wlJqvkZOkHF5WslGYv7m1o6+Omv9+78OfVI7z70jw4lb5f29kXtA2MpA==",
      "email": "admin@localhost",
      "admin": true,
      "createdAt": "2016-08-19T02:35:06.298Z",
      "updatedAt": "2016-08-19T02:35:06.298Z"
    }
  }
]
```
## Get Token



	GET /tokens/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
  {
    "id": 4,
    "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
    "auth_token": "936b05f45b6e9d34d1c249297dba0793",
    "ip": "127.0.0.1",
    "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
    "expires": "2016-08-21T02:10:33.132Z",
    "createdAt": "2016-08-20T02:10:33.134Z",
    "updatedAt": "2016-08-20T02:10:33.134Z",
    "userId": 1,
    "user":
    {
      "id": 1,
      "name": "Admin",
      "username": "admin",
      "password": "RqrvnsJN9qy7RZg9roxra5gsJ/AmE0wlJqvkZOkHF5WslGYv7m1o6+Omv9+78OfVI7z70jw4lb5f29kXtA2MpA==",
      "email": "admin@localhost",
      "admin": true,
      "createdAt": "2016-08-19T02:35:06.298Z",
      "updatedAt": "2016-08-19T02:35:06.298Z"
    }
  }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Create Tokens



	POST /tokens


## Update Token



	PUT /tokens/:id


# Transactions

## Delete Transaction



	DELETE /transactions/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
  {
    "message": "Record Deleted Successfully"
  }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Get Transactions



	GET /tansactions/:id


## Get Accounts



	GET /transactions


## Create Transactions



	POST /tansactions


## Delete Transactions



	PUT /tansactions/:id


# Users

## Delete User



	DELETE /users/:id


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
  {
    "message": "Record Deleted Successfully"
  }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Delete User Token



	DELETE /users/:id/tokens/:tokenid


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
  {
    "message": "Record Deleted Successfully",
  }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## List Users



	GET /users


### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "id": 1,
    "name": "Admin",
    "username": "admin",
    "email": "admin@localhost",
    "admin": true,
    "changepw": false,
    "disabled": false,
    "verification": "",
    "createdAt": "2016-08-19T02:35:06.298Z",
    "updatedAt": "2016-08-19T02:35:06.298Z"
  }
]
```
## Get User



	GET /users/:id


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
 {
   "id": 1,
   "name": "Admin",
   "username": "admin",
   "email": "admin@localhost",
   "admin": true,
   "changepw": false,
   "disabled": false,
   "verification": "",
   "createdAt": "2016-08-19T02:35:06.298Z",
   "updatedAt": "2016-08-19T02:35:06.298Z"
 }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## List User Tokens



	GET /users/:id/tokens


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
[
  {
    "id": 4,
    "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
    "ip": "127.0.0.1",
    "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
    "expires": "2016-08-21T02:10:33.132Z",
    "createdAt": "2016-08-20T02:10:33.134Z",
    "updatedAt": "2016-08-20T02:10:33.134Z",
    "userId": 1
  }
]
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Get User Token



	GET /users/:id/tokens/:tokenid


### Success Response

HTTP/1.1 200 OK

```
HTTP/1.1 200 OK
  {
    "id": 4,
    "client_token": "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
    "ip": "127.0.0.1",
    "agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
    "expires": "2016-08-21T02:10:33.132Z",
    "createdAt": "2016-08-20T02:10:33.134Z",
    "updatedAt": "2016-08-20T02:10:33.134Z",
    "userId": 1
  }
```
### Error Response

HTTP/1.1 404 Not Found

```
HTTP/1.1 404 Not Found
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```
## Create User



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>Name of the User</p>							|
| username			| String			|  <p>Username of the User</p>							|
| email			| String			|  							|
| password			| String			|  							|
| admin			| Boolean			|  							|
| changepw			| Boolean			|  							|
| disabled			| Boolean			|  							|
| verification			| String			|  							|

### Success Response

Success Example

```
{
    "message": "Record Created Successfully"
}
```
### Error Response

Field Validation Error Example

```
{
  "error": "Field Validation Error",
  "code": "FC00010",
  "fields":
  [
    {
      "message": "email must be unique",
      "type": "unique violation",
      "path": "email",
      "value": "email@localhost"
    }
  ]
}
```
## Update User



	PUT /users/:id


### Error Response

Field Validation Error

```
{
  "error": "Field Validation Error",
  "code": "FC00010",
  "fields":
  [
    {
      "message": "email must be unique",
      "type": "unique violation",
      "path": "email",
      "value": "email@localhost"
    }
  ]
}
```
Record Not Found

```
{
   "error": "Record Not Found",
   "code": "FC00007"
}
```

