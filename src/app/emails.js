var format = require('string-template');
var emails = {};

emails.get = function (key, vars) {
  if (! emails[key] ) {
    return;
  }

  return {
    'html': format(emails[key].html, vars),
    'text': format(emails[key].text, vars),
    'subject': format(emails[key].subject, vars)
  };
};

emails.VERIFICATION = {
  'html': '<h1>Welcome, {name}, to FinanceCaster</h1><div><a href="{url}">Go here to verify your account</a></div>',
  'text': 'Welcome, {name}, to FinanceCaster\n\nGo to the following link to verify your account\n\n{url}',
  'subject': 'Verify Your FinanceCaster Account'
};

emails.PASSWORD_RESET = {
  'html': '<h1>Hello, {name}!</h1><p>A password reset was requested. Please see your new temporary password below</p><p>{password}</p><p>Visit {url} to login.</p>',
  'text': 'Hello, {name}!\n\nA password reset was requested. Please see your new temporary password below\n\n{password}\n\nVisit {url} to login.',
  'subject': 'Password Reset for FinanceCaster'
};

emails.ACCOUNT_SHARE = {
  'html': '<h1>Hello from FinanceCaster!</h1><p>An account has been shared with you from {name}</p><p>Visit {url} to begin using this account.</p>',
  'text': 'Hello!\n\nAn account has been shared with you from {name}\n\nVisit {url} to begin using this account.',
  'subject': 'Account Sharing Request from FinanceCaster'
};

module.exports = emails;
