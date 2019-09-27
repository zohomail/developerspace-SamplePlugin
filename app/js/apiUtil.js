var apiCore = {
    /**
     * Get Mail details using message ID
     */
    getMailDetails: function (messageId) {
        return ZMSDK.mail.getMailDetails(messageId, ["SUBJECT", "SM", "NEWATTR", "CONTENT"]);
    },

    /**
     * Compose mail with subject, to, cc, bcc and content prepopulated
     */
    composeNewMail: function (composeObj) {
        ZMSDK.mail.composeNewMail(composeObj);
    },

    /**
     * Insert content to compose window if already present, else creates new window
     */
    insertMailContent: function (content) {
        ZMSDK.mail.insertMailContent(content);
    },

    /**
     * Get contact details by zuid
     */
    getContactbyZuid: function (zuid) {
        ZMSDK.contact.getContactDetails({zuid}).then(function (contactObj) {
            console.log(contactObj);
            window.appView.populateContactDetails(contactObj);
        });
    },
    
    /**
     * Get contact details by email address
     */
    getContactbyEmailId: function (eid) {
        ZMSDK.contact.getContactDetails({eid}).then(function (contactObj) {
            console.log(contactObj);
            window.appView.populateContactDetails(contactObj);
        });
    },

    /**
     * Download attachment from mail and upload to url using callbackApiXhr
     */
    downloadAttachment: function (attachObj, callbackApiXhr) {
        return ZMSDK.mail.downloadAttachment(attachObj, callbackApiXhr);
    },

    /**
     * Reply to a mail
     */
    reply: function (messageId) {
        ZMSDK.mail.replyToMail(messageId);
    },

    /**
     * reply all to a mail
     */
    replyAll: function (messageId) {
        ZMSDK.mail.replyToMail(messageId, true);
    },

    /**
     * Forward a mail
     */
    forwardMail: function (messageId) {
        ZMSDK.mail.forwardMail(messageId);
    },
    setMailRelationalData: function (messageId, data) {
        return ZMSDK.mail.setRelationData(messageId, data);
    },

    /**
     * Get app data for an email
     */
    fetchMailRelationalData: function (messageId) {
        return ZMSDK.mail.getRelationData(messageId);
    },

    /**
     * Send request to other service
     */
    executeURL: function (xhrObj) {
        return ZMSDK.app.invokeUrl({ xhrObj});
    },
    
    /**
     * Store data specific to the app
     */
    setAppData: function (appData) {
        return ZMSDK.app.data.set(appData);
    },

    /**
     * Fetch data stored specific to the app
     */
    fetchAppDetail: function (dataList) {
        return ZMSDK.app.data.get(dataList);
    },

    /**
     * Delete the dara stored specific to the app
     */
    deleteAppData: function (dataList) {
        return ZMSDK.app.data.delete(dataList);
    }
};

window.apiUtil = apiCore;