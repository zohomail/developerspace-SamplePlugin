/**
 * Initialise App to get events from Mail
 * Return @param {*} initObj contains the Night Mode, language and font details
 */
ZMSDK.app.init().then(function (initObj) {
    console.log(initObj);
    ZMSDK.app.listenDrop(true);
    window.appView.populateNotebooks();
    window.appView.populateAppData();
});

let populateMailDetails = function (mailInfo) {
    window.appView.populateCurrentMailDetails(mailInfo);
    window.appView.populateAttachmentDetails(mailInfo);
    if (mailInfo.FROM) {
        $(".search_input").val(mailInfo.FROM);
        $("#contactBtn").click();
    }
    window.appView.populateRelationalData(mailInfo.MSGID);
};

/**
 * Subscribe to Events you need using ZMSDK.app.on()
*/
ZMSDK.app.on("mail_preview", function (mailObj) {
    window.apiUtil.getMailDetails(mailObj.MSGID).then( function (mailInfo) {
        console.log(mailInfo);
        populateMailDetails(mailInfo);
    });
});

/**
 * Event to get dragged mail content
 */
ZMSDK.app.on("drop", function (dropInfo) {
    console.log(dropInfo);
    let data = dropInfo.data && dropInfo.data[0];
    if (dropInfo.type === "mail") {
        populateMailDetails(data);
        return;
    }
    window.appView.populateAttachmentDetails(dropInfo);
    if (!$("#attachmentInfo").find(".cs_accTitle").hasClass("active")) {
        $("#attachmentInfo").find(".cs_accTitle").click();
    }
});

/**
 * Event to detect preview mail close
 */
ZMSDK.app.on("mail_close", function () {
    window.appView.populateCurrentMailDetails({});
    window.appView.populateContactDetails();
    window.appView.populateRelationalData();
});

/**
 * Get the Night Mode and Font settings of the inbox, inside your application.
 */
ZMSDK.app.on("mail_setting", function (mailSettingsData) {
    console.log(mailSettingsData);
});

$(document).ready(function () {
    window.appView.bindAppEvents();
    window.appView.bindApiEvents();
});