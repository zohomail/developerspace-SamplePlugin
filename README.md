# SAMPLE ZOHO MAIL PLUGIN

SamplePlugin will let you explore the Zoho Mail Developer Space APIs mentioned in https://www.zoho.com/mail/help/api/dev-api.html


# FEATURES DEMONSTRATED BY PLUGIN:

- Shows details of the previewed email
- Compose new email with given content or insert content into composing email
- Get contact details of sender of previewed email or search for contact with email
- View email relation data of open email and set relation data for an email. 
- Upload image attachments in an email to Zoho Notebook via connectors
- Upload attachments from Desktop to Zoho Notebook via connectors
- Drag and drop emails and attachments to Plugin


# PRE-REQUISITES

1) Install node.js
    https://nodejs.org/en/download/

2) Install Zoho Extension Toolkit
   https://www.npmjs.com/package/zoho-extension-toolkit


# STEPS TO RUN SAMPLE PLUGIN

1) Download the Sample app ZIP file and unzip the file.

2) Open your terminal. Go to the unzipped directory and run "npm install" command to install necessary packages.

3) Run the command "zet run" - This will run the SamplePlugin app in your machine's 5000 port.


# STEPS TO CONFIGURE SAMPLE PLUGIN IN ZOHO MAIL

1) Enable developer mode in Zoho Mail. Go to https://mail.zoho.com/zm/#settings/all/integrations-settings/DeveloperSpace/developextension and turn on the "Developer Mode" toggle.

2) The eWidget Panel will open. Click on the sample plugin named "Sample App"


# Connectors Configuration to upload image attachments in an email to Zoho Notebook

1) Zoho Notebook uses OAuth to allow access to the API. You can register a new Client Id/Secret at developer console.
   Help document - https://www.zoho.com/accounts/protocol/oauth-setup.html

2) Create connectors from https://mail.zoho.com/zm/#settings/all/integrations-settings/DeveloperSpace/connectors.
   Connectors help page - https://www.zoho.com/mail/help/dev-platform/connectors.html
   Authorization URL help page - https://www.zoho.com/accounts/protocol/oauth/web-apps/authorization.html
