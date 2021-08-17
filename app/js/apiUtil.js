var apiCore = {
    /**
     * Get Mail details using message ID
     */
    getMailDetails: function (messageId) {
        return AppSDK.get(["mailInfo",messageId]);
    },

    /**
     * Get currently opened compose details
     */

    getComposeDetails: function () {
        return AppSDK.dispatch("compose", {mailData:{}});
    },

    /**
     * Compose mail with subject, to, cc, bcc and content prepopulated
     */
    composeNewMail: function (composeObj) {
        return AppSDK.dispatch("compose",{mailData: composeObj});
    },

    /**
     * Insert content to compose window if already present, else creates new window
     */
    insertMailContent: function (content) {
        return AppSDK.dispatch("compose", {
            mode: "insert",
            mailData: content
        });
    },

    /**
     * Get contact details by zuid
     */
    getContactbyZuid: function (zuid) {
        AppSDK.get(["contactInfo", {zuid}]).then(contactObj=>{
            console.log(contactObj);
            window.appView.populateContactDetails(contactObj);
        });
    },
    
    /**
     * Get contact details by email address
     */
    getContactbyEmailId: function (eid) {
        AppSDK.get(["contactInfo", {eid}]).then(contactObj=>{
            console.log(contactObj);
            window.appView.populateContactDetails(contactObj);
        });
    },

    /**
     * Download attachment from mail and upload to url using callbackApiXhr
     */
    downloadAttachment: function (attachObj, callbackApiXhr) {
        return AppSDK.dispatch("downloadAttachment", {
            attachInfo:attachObj,
            callbackApiXhr
            });
    },

    /**
     * Reply to a mail
     */
    reply: function (messageId) {
        AppSDK.dispatch("mailActions", {
            msgId: messageId,
            mode: "reply"
        });
    },

    /**
     * reply all to a mail
     */
    replyAll: function (messageId) {
        AppSDK.dispatch("mailActions", {
            msgId: messageId,
            mode: "replyall",
            });
    },

    /**
     * Forward a mail
     */
    forwardMail: function (messageId) {
        AppSDK.dispatch("mailActions", {
            msgId: messageId,
            mode: "fwdi"
            });
    },
    setMailRelationalData: function (messageId, data) {
        data.msgId = messageId
        return AppSDK.dispatch("associateApp", data);
    },

    /**
     * Get app data for an email
     */
    fetchMailRelationalData: function (messageId) {
        return AppSDK.dispatch("integData", {
            msgId: messageId
        });
    },

    /**
     * Send request to other service
     */
    executeURL: function (xhrObj) {
        return AppSDK.dispatch("invokeUrl",{ xhrObj});
    },
    
    /**
     * Store data specific to the app
     */
    setAppData: function (appData) {
        return AppSDK.dispatch("data", {
            operation: "set",
            data:appData
        });
    },

    /**
     * Fetch data stored specific to the app
     */
    fetchAppDetail: function (dataList) {
        return AppSDK.dispatch("data", {
            operation: "get",
            params:dataList
        });
    },

    /**
     * Delete the dara stored specific to the app
     */
    deleteAppData: function (dataList) {
        return AppSDK.dispatch("data", {
            operation: "delete",
            data:dataList
        });
    }
};

window.apiUtil = apiCore;
