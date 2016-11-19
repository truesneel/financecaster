# FinanceCaster
FinanceCaster is a finance tracking application.  It allows you to add accounts and the various transactions that regularly happen, such as pay checks or bills.  Once entered, you will be able to forecast your account balances and track how your account will look in the future.  Additionally, if you want to share accounts, with say your significant other, you can send a sharing request for any of your accounts and give varrying levels of access to them.

Want a better experience?  Once installed and running, visit your instance on your Andriod Chrome browser, goto the browser menu an select "Add to Home screen".  You will now have application shortcut on your phone for quick and easy access to your accounts!

## Running
As described below you can configure the initial password however the default username and password once setup will be `admin`.
### Docker
The easiest way is to run FinanceCaster from the docker container.
```
docker run --name financecaster --rm -it -p 9001:9001 sneel/financecaster
```
Then point your browser at http://localhost:9001 to get started.  It's helpful to mount a volume at /data which contains the configuration file and default sqlite database.

### Locally
#### Requirements
* NodeJS
* NPM
#### Installation
Clone the git repo and running the following:

```
$ npm install
```
#### Starting
Once all modules are installed, start Financecaster by running the following:
```
$ npm start
```
The default configuration will start listening on port 9001.  Launch a browser and points it at http://localhost:9001!

Grunt has also been configured so once npm and bower modules are installed you can also run `grunt` to start the application

## Configuration

### General Settings
#### Config Path
**Default:** ./config.ini
**ENV:** FC_CONFIG
**Config:** N/A
#### Encryption Salt
**Default:** 0123456789abcdefghij
**ENV:** FC_SALT
**Config:**
```
salt = 0123456789abcdefghij
```
### Web Server Settings
#### Frontend URL
**Default:** http://localhost:9001
**ENV:** FC_URL
**Config:**
```
[web]
url = http://localhost:9001
```
#### Listen Address
**DEFAULT:** 0.0.0.0
**ENV:** FC_ADDRESS
**Config:**
```
[web]
listen = 0.0.0.0
```
#### Listen Port
**DEFAULT:** 9001
**ENV:** FC_PORT
**Config:**
```
[web]
port = 9001
```
### Database Settings
#### DB Type
**Default:** sqlite
**ENV:** FC_DB_DIALECT
**Config:**
```
[database]
dialect = sqlite
```
#### SQLITE Path
**Default:** financecaster.sqlite
**ENV:** FC_DB_SQLITE_PATH
**Config:**
```
[database]
storage = financecaster.sqlite
```

#### Logging
**Default:** 0
**ENV:** FC_DB_LOGGING
**Config:**
```
[database]
logging = 0
```

#### Schema Sync
**Default:** 0
**ENV:** FC_DB_FORCE_SYNC
**Config:** N/A

### User Settings
#### Admin Password
**Default:** admin
**ENV:** FC_ADMIN_PASS
**Config:** N/A

#### Allow New Users
**Default:** 1
**ENV:** FC_USER_ALLOW_NEW
**Config:**
```
[users]
allow_new = 1
```

#### Require Verification
**Default:** 1
**ENV:** FC_USER_VERIFICATION
**Config:**
```
[users]
verification = 1
```

#### Unverified Cleanup
**Default:** 1
**ENV:** FC_UNVERIFIED_USER_AGE
**Config:**
```
[users]
unverified_stale_age = 2
```

### Mail Settings
#### Host
**Default:** *UNSET*
**ENV:** FC_MAIL_HOST
**Config:**
```
[mail]
host = smtp.gmail.com
```

#### Port
**Default:** 465
**ENV:** FC_MAIL_PORT
**Config:**
```
[mail]
port = 465
```

#### From Address
**Default:** *UNSET*
**ENV:** FC_MAIL_FROM
**Config:**
```
[mail]
from = no-reply@financecaster.com
```

#### User Name
**Default:** *UNSET*
**ENV:** FC_MAIL_USER
**Config:**
```
[mail]
user = financecaster
```

#### Password
**Default:** *UNSET*
**ENV:** FC_MAIL_PASSWORD
**Config:**
```
[mail]
password = my_secret_password
```

#### Secure
**Default:** 1
**ENV:** FC_MAIL_SECURE
**Config:**
```
[mail]
secure = 1
```
## API Docs
When the app is running you can view docs by visiting `/apidoc` relative to the root of the application.

Alternatively, you can view the Markdown version below:
[See API Docs](apidoc.md)
