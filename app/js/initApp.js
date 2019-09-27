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


/**
 * Subscribe to Events you need using ZMSDK.app.on()
*/
ZMSDK.app.on("mail_preview", function (mailObj) {
    window.apiUtil.getMailDetails(mailObj.MSGID).then( function (mailInfo) {
        console.log(mailInfo);
        window.appView.populateCurrentMailDetails(mailInfo);
        window.appView.populateAttachmentDetails(mailInfo);
        if (mailInfo.FROM) {
            $(".search_input").val(mailInfo.FROM);
            $("#contactBtn").click();
        }
        window.appView.populateRelationalData(mailObj.MSGID);
    });
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
 * Event to get dragged mail content
 */
ZMSDK.app.on("drop", function (dropInfo) {
    console.log(dropInfo);
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