define({ "api": [
  {
    "type": "delete",
    "url": "/accounts/:id",
    "title": "Delete Account",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n  {\n    \"message\": \"Record Deleted Successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "DeleteAccountsId"
  },
  {
    "type": "delete",
    "url": "/accounts/:id/transactions/:transactionid",
    "title": "Delete Account Transaction",
    "group": "Accounts",
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "DeleteAccountsIdTransactionsTransactionid"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "List Accounts",
    "group": "Accounts",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.forecast",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "array.balance",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.balance_date",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "array.limit",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Account List",
          "content": "[\n  {\n    \"id\": 1,\n    \"userId\": 2,\n    \"name\": \"checking\",\n    \"forecast\": 365,\n    \"balance\": 0,\n    \"balance_date\" \"2016-08-20T18:20:36.373Z\",\n    \"limit\": 0,\n    \"createdAt\": \"2016-08-20T18:20:36.373Z\",\n    \"updatedAt\": \"2016-08-20T18:20:36.373Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "GetAccounts"
  },
  {
    "type": "get",
    "url": "/accounts/:id",
    "title": "Get Account",
    "group": "Accounts",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "forecast",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "balance",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "balance_date",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"userId\": 2,\n  \"name\": \"checking\",\n  \"forecast\": 365,\n  \"balance\": 0,\n  \"balance_date\" \"2016-08-20T18:20:36.373Z\",\n  \"limit\": 0,\n  \"createdAt\": \"2016-08-20T18:20:36.373Z\",\n  \"updatedAt\": \"2016-08-20T18:20:36.373Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}s",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "GetAccountsId"
  },
  {
    "type": "get",
    "url": "/accounts/:id/forecast",
    "title": "View Forecast",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Account ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "GET /accounts/2837/forecast HTTP/1.1",
          "content": "GET /accounts/2837/forecast HTTP/1.1",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "date",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "transactions_total",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "balance",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "transactions",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "transactions.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "transactions.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "transactions.num_transactions_total",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "transactions.num_transactions_current",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "transactions.amount",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "GetAccountsIdForecast"
  },
  {
    "type": "get",
    "url": "/accounts/:id/transactions",
    "title": "List Account Transactions",
    "group": "Accounts",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.accountId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "array.amount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.every_num",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.every_type",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.num_tansactions",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.start",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Account List",
          "content": "[\n  {\n    \"id\": 1,\n    \"accountId\": 2,\n    \"name\": \"Pay Check\",\n    \"amount\": 2838.28,\n    \"every_num\": 2,\n    \"every_type\": \"weeks\",\n    \"num_tansactions\": 0,\n    \"start\": \"2016-08-20T18:20:36.373Z\",\n    \"createdAt\": \"2016-08-20T18:20:36.373Z\",\n    \"updatedAt\": \"2016-08-20T18:20:36.373Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "GetAccountsIdTransactions"
  },
  {
    "type": "get",
    "url": "/accounts/:id/transactions/:transactionid",
    "title": "Get Account Transaction",
    "group": "Accounts",
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "GetAccountsIdTransactionsTransactionid"
  },
  {
    "type": "post",
    "url": "/accounts",
    "title": "Create Account",
    "group": "Accounts",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Request Data": [
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Integer",
            "optional": false,
            "field": "forecast",
            "defaultValue": "365",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Float",
            "optional": false,
            "field": "balance",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "DateTime",
            "optional": false,
            "field": "balance_date",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Float",
            "optional": false,
            "field": "limit",
            "defaultValue": "0",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Data Example",
          "content": "{\n  \"name\" \"Checking\",\n  \"forecast\" \"60\",\n  \"balance\" \"100.28\",\n  \"balance_date\" \"2016-08-20T18:20:36.373Z\",\n  \"limit\" \"0\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n    \"id\"\n    \"message\": \"Record Created Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Field Validation Error": [
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Field Validation Error",
            "type": "Array",
            "optional": false,
            "field": "fields",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.message",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.type",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.path",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.value",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Field Validation Error Example",
          "content": "{\n  \"error\": \"Field Validation Error\",\n  \"code\": \"FC00010\",\n  \"fields\":\n  [\n    {\n      \"message\": \"email must be unique\",\n      \"type\": \"unique violation\",\n      \"path\": \"email\",\n      \"value\": \"email@localhost\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "PostAccounts"
  },
  {
    "type": "post",
    "url": "/accounts/:id/transactions",
    "title": "Create Account Transaction",
    "group": "Accounts",
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "PostAccountsIdTransactions"
  },
  {
    "type": "put",
    "url": "/accounts/:id",
    "title": "Update Account",
    "group": "Accounts",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Request Data": [
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Integer",
            "optional": false,
            "field": "forecast",
            "defaultValue": "365",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Float",
            "optional": false,
            "field": "balance",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "DateTime",
            "optional": false,
            "field": "balance_date",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Float",
            "optional": false,
            "field": "limit",
            "defaultValue": "0",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Data Example",
          "content": "{\n  \"name\" \"Checking\",\n  \"forecast\" \"60\",\n  \"balance\" \"100.28\",\n  \"balance_date\" \"2016-08-20T18:20:36.373Z\",\n  \"limit\" \"0\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n    \"id\"\n    \"message\": \"Record Updated Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Array",
            "optional": false,
            "field": "fields",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "String",
            "description": "<p>} fields.message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.type",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.path",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.value",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Field Validation Error Example",
          "content": "HTTP/1.1 400 Bad Request\n {\n   \"error\": \"Field Validation Error\",\n   \"code\": \"FC00010\",\n   \"fields\":\n   [\n     {\n       \"message\": \"name must be unique\",\n       \"type\": \"unique violation\",\n       \"path\": \"name\",\n       \"value\": \"Checking\"\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "Record Not Found Example",
          "content": "HTTP/1.1 404 Not Found\n {\n    \"error\": \"Record Not Found\",\n    \"code\": \"FC00007\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "PutAccountsId"
  },
  {
    "type": "put",
    "url": "/accounts/:id/transactions/:transactionid",
    "title": "Update Account Transaction",
    "group": "Accounts",
    "version": "0.0.0",
    "filename": "./src/app/routes/accounts.js",
    "groupTitle": "Accounts",
    "name": "PutAccountsIdTransactionsTransactionid"
  },
  {
    "type": "delete",
    "url": "/auth",
    "title": "Log Out",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"success\",\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Response Data": [
          {
            "group": "Response Data",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message stating if the log out attempt was successful</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "DeleteAuth"
  },
  {
    "type": "delete",
    "url": "/auth/tokens/:id",
    "title": "Delete Token",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Token Deleted\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "DeleteAuthTokensId"
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Get Auth Status",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "token_id",
            "description": "<p>Internal ID of the Token</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "expires",
            "description": "<p>Date and Time that the token will expire</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the associated user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client_token",
            "description": "<p>Token value for the Client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the associated user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Flag for whether or not the user is an admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"token_id\": 3,\n  \"expires\": \"2016-08-21T01:53:05.525Z\",\n  \"userId\": 1,\n  \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n  \"name\": \"admin@localhost\",\n  \"admin\": true\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Access Denied": [
          {
            "group": "Access Denied",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Access Denied",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"error\": \"Access Denied\",\n   \"code\": \"FC00006\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "GetAuth"
  },
  {
    "type": "get",
    "url": "/auth/tokens",
    "title": "List Current Tokens",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "array",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.client_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.ip",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.agent",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.expires",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n   {\n       \"id\": 1,\n       \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n       \"auth_token\": \"96f58ac1c6f326ac0dc98e792f0b8301\",\n       \"ip\": \"127.0.0.1\",\n       \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n       \"expires\": \"2016-08-20T02:36:29.052Z\",\n       \"createdAt\": \"2016-08-19T02:36:29.059Z\",\n       \"updatedAt\": \"2016-08-19T02:36:29.059Z\",\n       \"userId\": 1\n   },\n   {\n       \"id\": 2,\n       \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n       \"auth_token\": \"9b28729f8175068488e9a16143dcdac3\",\n       \"ip\": \"127.0.0.1\",\n       \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n       \"expires\": \"2016-08-20T02:46:41.311Z\",\n       \"createdAt\": \"2016-08-19T02:46:41.313Z\",\n       \"updatedAt\": \"2016-08-19T02:46:41.313Z\",\n       \"userId\": 1\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "GetAuthTokens"
  },
  {
    "type": "get",
    "url": "/auth/tokens/:id",
    "title": "Get Token",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "agent",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "expires",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n  \"auth_token\": \"96f58ac1c6f326ac0dc98e792f0b8301\",\n  \"ip\": \"127.0.0.1\",\n  \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n  \"expires\": \"2016-08-20T02:36:29.052Z\",\n  \"createdAt\": \"2016-08-19T02:36:29.059Z\",\n  \"updatedAt\": \"2016-08-19T02:36:29.059Z\",\n  \"userId\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Token Not Found": [
          {
            "group": "Token Not Found",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Token Not Found",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "GetAuthTokensId"
  },
  {
    "type": "get",
    "url": "/auth/user",
    "title": "Get User Information",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User Updated Successfully\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "GetAuthUser"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Log In",
    "group": "Authentication",
    "permission": [
      {
        "name": "any"
      }
    ],
    "parameter": {
      "fields": {
        "Post Data": [
          {
            "group": "Post Data",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username to attempt a log in with</p>"
          },
          {
            "group": "Post Data",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password to attempt a log in with</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post Data",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message stating if the log in attempt was successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client_token",
            "description": "<p>Client token to be used to access the API</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Auth token to be used to access the API</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "expires",
            "description": "<p>Date and time the token will expire</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"success\",\n  \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n  \"auth_token\": \"936b05f45b6e9d34d1c249297dba0793\",\n  \"expires\": \"2016-08-21T02:10:33.132Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Login Failed": [
          {
            "group": "Login Failed",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Login Failed",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Failed",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Login Failed\",\n   \"code\": \"FC00008\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PostAuth"
  },
  {
    "type": "post",
    "url": "/auth/changepw",
    "title": "Change Password",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "current",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newpassword",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Password Changed\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PostAuthChangepw"
  },
  {
    "type": "post",
    "url": "/auth/forgot",
    "title": "Request a password reset",
    "group": "Authentication",
    "permission": [
      {
        "name": "any"
      }
    ],
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PostAuthForgot"
  },
  {
    "type": "post",
    "url": "/auth/newuser",
    "title": "Create Account",
    "group": "Authentication",
    "permission": [
      {
        "name": "any"
      }
    ],
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PostAuthNewuser"
  },
  {
    "type": "post",
    "url": "/auth/verify/:verification",
    "title": "Verify User Account",
    "group": "Authentication",
    "permission": [
      {
        "name": "any"
      }
    ],
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PostAuthVerifyVerification"
  },
  {
    "type": "put",
    "url": "/auth/user",
    "title": "Update User Information",
    "group": "Authentication",
    "permission": [
      {
        "name": "user",
        "title": "User Access Required",
        "description": "<p>Access is restricted to an standard authorized user</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User Updated Successfully\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PutAuthUser"
  },
  {
    "type": "get",
    "url": "/permissions",
    "title": "Get Permissions",
    "group": "Permissions",
    "version": "0.0.0",
    "filename": "./src/app/routes/permissions.js",
    "groupTitle": "Permissions",
    "name": "GetPermissions"
  },
  {
    "type": "get",
    "url": "/permissions/:id",
    "title": "Get Permissions",
    "group": "Permissions",
    "version": "0.0.0",
    "filename": "./src/app/routes/permissions.js",
    "groupTitle": "Permissions",
    "name": "GetPermissionsId"
  },
  {
    "type": "post",
    "url": "/permissions",
    "title": "Create Permissions",
    "group": "Permissions",
    "version": "0.0.0",
    "filename": "./src/app/routes/permissions.js",
    "groupTitle": "Permissions",
    "name": "PostPermissions"
  },
  {
    "type": "put",
    "url": "/permissions/:id",
    "title": "Delete Permissions",
    "group": "Permissions",
    "version": "0.0.0",
    "filename": "./src/app/routes/permissions.js",
    "groupTitle": "Permissions",
    "name": "PutPermissionsId"
  },
  {
    "type": "delete",
    "url": "/tokens/:id",
    "title": "Delete Token",
    "group": "Tokens",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Token Deleted\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/tokens.js",
    "groupTitle": "Tokens",
    "name": "DeleteTokensId"
  },
  {
    "type": "get",
    "url": "/tokens",
    "title": "List All Tokens",
    "version": "0.0.1",
    "group": "Tokens",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>Array of Tokens</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.client_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.ip",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.agent",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.expires",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "array.user",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.user.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.user.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.user.username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.user.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "array.user.admin",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.user.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.user.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 4,\n    \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n    \"auth_token\": \"936b05f45b6e9d34d1c249297dba0793\",\n    \"ip\": \"127.0.0.1\",\n    \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n    \"expires\": \"2016-08-21T02:10:33.132Z\",\n    \"createdAt\": \"2016-08-20T02:10:33.134Z\",\n    \"updatedAt\": \"2016-08-20T02:10:33.134Z\",\n    \"userId\": 1,\n    \"user\":\n    {\n      \"id\": 1,\n      \"name\": \"Admin\",\n      \"username\": \"admin\",\n      \"password\": \"RqrvnsJN9qy7RZg9roxra5gsJ/AmE0wlJqvkZOkHF5WslGYv7m1o6+Omv9+78OfVI7z70jw4lb5f29kXtA2MpA==\",\n      \"email\": \"admin@localhost\",\n      \"admin\": true,\n      \"createdAt\": \"2016-08-19T02:35:06.298Z\",\n      \"updatedAt\": \"2016-08-19T02:35:06.298Z\"\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/tokens.js",
    "groupTitle": "Tokens",
    "name": "GetTokens"
  },
  {
    "type": "get",
    "url": "/tokens/:id",
    "title": "Get Token",
    "group": "Tokens",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "agent",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "expires",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.admin",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "user.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "user.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n  {\n    \"id\": 4,\n    \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n    \"auth_token\": \"936b05f45b6e9d34d1c249297dba0793\",\n    \"ip\": \"127.0.0.1\",\n    \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n    \"expires\": \"2016-08-21T02:10:33.132Z\",\n    \"createdAt\": \"2016-08-20T02:10:33.134Z\",\n    \"updatedAt\": \"2016-08-20T02:10:33.134Z\",\n    \"userId\": 1,\n    \"user\":\n    {\n      \"id\": 1,\n      \"name\": \"Admin\",\n      \"username\": \"admin\",\n      \"password\": \"RqrvnsJN9qy7RZg9roxra5gsJ/AmE0wlJqvkZOkHF5WslGYv7m1o6+Omv9+78OfVI7z70jw4lb5f29kXtA2MpA==\",\n      \"email\": \"admin@localhost\",\n      \"admin\": true,\n      \"createdAt\": \"2016-08-19T02:35:06.298Z\",\n      \"updatedAt\": \"2016-08-19T02:35:06.298Z\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Token Not Found": [
          {
            "group": "Token Not Found",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Token Not Found",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/routes/tokens.js",
    "groupTitle": "Tokens",
    "name": "GetTokensId"
  },
  {
    "type": "post",
    "url": "/tokens",
    "title": "Create Tokens",
    "group": "Tokens",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "version": "0.0.0",
    "filename": "./src/app/routes/tokens.js",
    "groupTitle": "Tokens",
    "name": "PostTokens"
  },
  {
    "type": "put",
    "url": "/tokens/:id",
    "title": "Update Token",
    "group": "Tokens",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "version": "0.0.0",
    "filename": "./src/app/routes/tokens.js",
    "groupTitle": "Tokens",
    "name": "PutTokensId"
  },
  {
    "type": "delete",
    "url": "/transactions/:id",
    "title": "Delete Transaction",
    "version": "0.0.1",
    "group": "Transactions",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n  {\n    \"message\": \"Record Deleted Successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/transactions.js",
    "groupTitle": "Transactions",
    "name": "DeleteTransactionsId"
  },
  {
    "type": "get",
    "url": "/tansactions/:id",
    "title": "Get Transactions",
    "group": "Transactions",
    "version": "0.0.0",
    "filename": "./src/app/routes/transactions.js",
    "groupTitle": "Transactions",
    "name": "GetTansactionsId"
  },
  {
    "type": "get",
    "url": "/transactions",
    "title": "Get Accounts",
    "group": "Transactions",
    "version": "0.0.0",
    "filename": "./src/app/routes/transactions.js",
    "groupTitle": "Transactions",
    "name": "GetTransactions"
  },
  {
    "type": "post",
    "url": "/tansactions",
    "title": "Create Transactions",
    "group": "Transactions",
    "version": "0.0.0",
    "filename": "./src/app/routes/transactions.js",
    "groupTitle": "Transactions",
    "name": "PostTansactions"
  },
  {
    "type": "put",
    "url": "/tansactions/:id",
    "title": "Delete Transactions",
    "group": "Transactions",
    "version": "0.0.0",
    "filename": "./src/app/routes/transactions.js",
    "groupTitle": "Transactions",
    "name": "PutTansactionsId"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "0.0.1",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n  {\n    \"message\": \"Record Deleted Successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "DeleteUsersId"
  },
  {
    "type": "delete",
    "url": "/users/:id/tokens/:tokenid",
    "title": "Delete User Token",
    "version": "0.0.1",
    "group": "Users",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n  {\n    \"message\": \"Record Deleted Successfully\",\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "DeleteUsersIdTokensTokenid"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "List Users",
    "version": "0.0.1",
    "group": "Users",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>Array of Users</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.name",
            "description": "<p>Name of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.username",
            "description": "<p>Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "array.admin",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "array.changepw",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "array.disabled",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.verification",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"name\": \"Admin\",\n    \"username\": \"admin\",\n    \"email\": \"admin@localhost\",\n    \"admin\": true,\n    \"changepw\": false,\n    \"disabled\": false,\n    \"verification\": \"\",\n    \"createdAt\": \"2016-08-19T02:35:06.298Z\",\n    \"updatedAt\": \"2016-08-19T02:35:06.298Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "0.0.1",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "changepw",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "disabled",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "verification",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"id\": 1,\n   \"name\": \"Admin\",\n   \"username\": \"admin\",\n   \"email\": \"admin@localhost\",\n   \"admin\": true,\n   \"changepw\": false,\n   \"disabled\": false,\n   \"verification\": \"\",\n   \"createdAt\": \"2016-08-19T02:35:06.298Z\",\n   \"updatedAt\": \"2016-08-19T02:35:06.298Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersId"
  },
  {
    "type": "get",
    "url": "/users/:id/tokens",
    "title": "List User Tokens",
    "version": "0.0.1",
    "group": "Users",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>Array of Tokens</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "array.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.client_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.ip",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.agent",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.expires",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "array.updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 4,\n    \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n    \"ip\": \"127.0.0.1\",\n    \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n    \"expires\": \"2016-08-21T02:10:33.132Z\",\n    \"createdAt\": \"2016-08-20T02:10:33.134Z\",\n    \"updatedAt\": \"2016-08-20T02:10:33.134Z\",\n    \"userId\": 1\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersIdTokens"
  },
  {
    "type": "get",
    "url": "/users/:id/tokens/:tokenid",
    "title": "Get User Token",
    "version": "0.0.1",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "agent",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "expires",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n  {\n    \"id\": 4,\n    \"client_token\": \"jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=\",\n    \"ip\": \"127.0.0.1\",\n    \"agent\": \"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0\",\n    \"expires\": \"2016-08-21T02:10:33.132Z\",\n    \"createdAt\": \"2016-08-20T02:10:33.134Z\",\n    \"updatedAt\": \"2016-08-20T02:10:33.134Z\",\n    \"userId\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersIdTokensTokenid"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "version": "0.0.1",
    "group": "Users",
    "permission": [
      {
        "name": "admin",
        "title": "Admin Access Required",
        "description": "<p>Access is restricted to an authorized user with admin rights</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Request Data": [
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          },
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User</p>"
          },
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "defaultValue": "false",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Boolean",
            "optional": false,
            "field": "changepw",
            "defaultValue": "false",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "Boolean",
            "optional": false,
            "field": "disabled",
            "defaultValue": "false",
            "description": ""
          },
          {
            "group": "Request Data",
            "type": "String",
            "optional": false,
            "field": "verification",
            "defaultValue": "[none]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Data Example",
          "content": "{\n  \"name\" \"User\",\n  \"username\" \"user\",\n  \"email\" \"user@localhost\",\n  \"password\" \"super_password\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n    \"message\": \"Record Created Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Field Validation Error": [
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Field Validation Error",
            "type": "Array",
            "optional": false,
            "field": "fields",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.message",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.type",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.path",
            "description": ""
          },
          {
            "group": "Field Validation Error",
            "type": "String",
            "optional": false,
            "field": "fields.value",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Field Validation Error Example",
          "content": "{\n  \"error\": \"Field Validation Error\",\n  \"code\": \"FC00010\",\n  \"fields\":\n  [\n    {\n      \"message\": \"email must be unique\",\n      \"type\": \"unique violation\",\n      \"path\": \"email\",\n      \"value\": \"email@localhost\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "PostUsers"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update User",
    "version": "0.0.1",
    "group": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error Message</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Error Code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Array",
            "optional": false,
            "field": "fields",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.type",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.path",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fields.value",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Field Validation Error",
          "content": "{\n  \"error\": \"Field Validation Error\",\n  \"code\": \"FC00010\",\n  \"fields\":\n  [\n    {\n      \"message\": \"email must be unique\",\n      \"type\": \"unique violation\",\n      \"path\": \"email\",\n      \"value\": \"email@localhost\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Record Not Found",
          "content": "{\n   \"error\": \"Record Not Found\",\n   \"code\": \"FC00007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/app/routes/users.js",
    "groupTitle": "Users",
    "name": "PutUsersId"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./src/public/apidoc/main.js",
    "group": "_home_scott_git_financecaster_new_src_public_apidoc_main_js",
    "groupTitle": "_home_scott_git_financecaster_new_src_public_apidoc_main_js",
    "name": ""
  }
] });
