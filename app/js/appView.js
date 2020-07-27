let apiUtil = window.apiUtil,
    noteId = "-1";
window.appView = {};

window.appView.populateCurrentMailDetails = function (mailData) {
    let rootElement = document.getElementById("mailInfo");
    let _template = '<ul>' +
    '<li class="hasChild">' +
        '<ul>' +
            '<li><strong>Message Id</strong><span id="MSGID" style="color:green"></span></li>' +
            '<li><strong>Subject</strong><span id="SUBJECT"></span></li>' +
            '<li><strong>Summary</strong><span id="SM"></span></li>' +
            '<li><strong>From</strong><span id="FROM"></span></li>' +
            '<li><strong>To</strong><span id="TO"></span></li>' +
            '<li><strong>CC</strong><span id="CC"></span></li>' +
            '<li><strong>BCC</strong><span id="BCC"></span></li>' +
            '<li>' +
                '<div class="mailbtnwrap">' +
                    '<div class="mailbtn" id="reply">' +
                    '<u>Reply</u>' +
                    '</div>' +
                    '<div class="mailbtn" id="replyAll">' +
                    '<u>Reply All</u>' +
                    '</div>' +
                    '<div class="mailbtn" id="forward">' +
                    '<u>Forward</u>' +
                    '</div>' +
                '</div>' +
            '</li>' +
        '</ul>' +
    '</li>' +
    '</ul>';
    if ($.isEmptyObject(mailData)) {
        _template = '<div class="centerDiv">Open a mail to get view details</div>';
        rootElement.innerHTML = _template;
        return;
    }
    rootElement.innerHTML = _template;
    Object.keys(mailData).forEach(function (key) {
        $("#" + key).text(mailData[key] || "-");
    });
    $(rootElement).find(".mailbtn").click(function (event) {
        switch (event.currentTarget.id) {
            case "reply": apiUtil.reply(mailData.MSGID);
                break;
            case "replyAll": apiUtil.replyAll(mailData.MSGID);
                break;
            case "forward": apiUtil.forwardMail(mailData.MSGID);
                break;
        }
    });
};

window.appView.populateCurrentComposeDetails = (composeData) => {
    let rootElement = document.getElementById("composeInfo"),
        _template;
    if ($.isEmptyObject(composeData)) {
        _template = '<div class="centerDiv">Save the draft to view details</div>';
        rootElement.innerHTML = _template;
        return;
    }
    _template = '<ul>' +
    '<li class="hasChild">' +
        '<ul>' +
            '<li><strong>Subject</strong><span id="subject"></span></li>' +
            '<li><strong>Content</strong><span id="content"></span></li>' +
            '<li><strong>Email IDs</strong><span id="emailIds"></span></li>' +
        '</ul>' +
    '</li></ul>';
    rootElement.innerHTML = _template;
    $("#subject").text(composeData.subject || "-");
    $("#content").text(composeData.comtent || "-");
    $("#emailIds").text(composeData.emailIds.length ? composeData.emailIds.join("\n") : "-");
};

window.appView.populateSavedDraftDetails = (draftData) => {
    let rootElement = document.getElementById("composeInfo");
    let _template = '<ul>' +
    '<li class="hasChild">' +
        '<ul>' +
            '<li><strong>Draft Id</strong><span id="DraftId" style="color:green"></span></li>' +
            '<li><strong>TO</strong><span id="to"></span></li>' +
            '<li><strong>BCC</strong><span id="bcc"></span></li>' +
            '<li><strong>CC</strong><span id="cc"></span></li>' +
            '<li><strong>CmpId</strong><span id="cmpId"></span></li>' +
            '<li><strong>Content</strong><span id="content"></span></li>' +
            '<li><strong>Subject</strong><span id="subject"></span></li>' +
        '</ul>' +
    '</li></ul>';
    if ($.isEmptyObject(draftData)) {
        _template = '<div class="centerDiv">Save the draft to view details</div>';
        rootElement.innerHTML = _template;
        return;
    }
    rootElement.innerHTML = _template;
    $("#DraftId").text(draftData.draftId || "-");
    let {draftObj} = draftData;
    if (draftObj) {
        Object.keys(draftObj).forEach(function (key) {
            $("#" + key).text(draftObj[key] || "-");
        });
    }
};

window.appView.populateContactDetails = function (contactObj) {
    let rootElement = document.getElementById("contactInfo"),
        _template;
    if (!contactObj) {
        $(".search_input").val("");
        rootElement.innerHTML = "";
        return;
    }
    _template = '<li class="hasChild">' +
    '<ul>' +
    (contactObj.photo ? '<li style="text-align: center;">' +
    '<img src=' + contactObj.photo + ' class="contactImg" />' +
    '</li>' : '') +
       '<li><strong>First Name</strong><span id="fn" style="color:green"></span></li>' +
       '<li><strong>Middle Name</strong><span id="fn_mn_ln"></span></li>' +
       '<li><strong>Last Name</strong><span id="fn_ln"></span></li>' +
       '<li><strong>Zuid</strong><span id="zid"></span></li>' +
       '<li><strong>Email address</strong><span id="eid"></span></li>' +
    '</ul>' +
 '</li>';
    if ($.isEmptyObject(contactObj)) {
        _template = '<div class="centerDiv">No data found</div>';
        rootElement.innerHTML = _template;
        return;
    }
    rootElement.innerHTML = _template;

    Object.keys(contactObj).forEach(function (key) {
        $("#" + key).text(contactObj[key] || "-");
    });
};

window.appView.populateRelationalData = function (msgId) {
    let rootElement = document.getElementById("relationInfoCont"),
        _template;
    if (!msgId) {
        _template = '<div class="centerDiv">Open an email for relational mapping</div>';
        rootElement.innerHTML = _template;
        return;
    }
    apiUtil.fetchMailRelationalData(msgId).then(function (rdataObj) {
        _template = '<div>' +
        '<ul>' +
            '<li class="hasChild">' +
                '<ul>' +
                '<li>' +
                    '<strong>Relational data for preview mail</strong>' +
                    '<span id="rdata" style="color:green"></span>' +
                '</li>' +
                '</ul>' +
            '</li>' +
        '</ul>' +
        '<textarea class="composeBox" id="relationData"></textarea>' +
        '<ul><li><strong><u>Note</u> : Only Json Object is allowed</strong></li></ul>' +
        '<span class="PluginButton" id="setMailData">Set Relational Data for preview mail</span>' +
        '</div>';
        rootElement.innerHTML = _template;
        $("#rdata").text(rdataObj ? JSON.stringify(rdataObj) : "No data found");
        $("#setMailData").click(function () {
            let rData = $("#relationData").val();
            try {
                rData = JSON.parse(rData);
            } catch (e) {
                return;
            }
            apiUtil.setMailRelationalData(msgId, rData).then(function () {
                window.appView.populateRelationalData(msgId);
            });
        });
    });
};

window.appView.populateAppData = function () {
    apiUtil.fetchAppDetail(["noteId"]).then(function (appdata) {
        console.log(appdata);
        let normalisedData = $.isArray(appdata.data) && !appdata.data.length ? "No app data found" : appdata.data[0].paramValue;
        noteId = normalisedData;
        $("#appData").text(normalisedData);
    });
};

window.appView.populateNotebooks = function () {
    let xhrObj = {
        url: "https://notebook.zoho.com/api/v1/notebooks",
        type: "GET",
        serviceName: "Notebook"
    };
    apiUtil.executeURL(xhrObj).then(function (result) {
        let normResp = JSON.parse(result.response);
        if (normResp.code === 200) {
            if (normResp.notebooks.length) {
                normResp.notebooks.forEach(function (notebook) {
                    let optionEle = document.createElement("option");
                    optionEle.innerText = notebook.name;
                    optionEle.setAttribute("id", notebook.notebook_id);
                    $("#notebooklist").append(optionEle);
                });
                return;
            }
            $("#notelist").html('<div class="centerDiv">No notebook found.<a href="//notebook.zoho.com" target="_blank">Click here to create</a></div>');
            $("#setAppdata").remove();
            $("#deleteAppdata").remove();
        }
    }, function () {
        $("#notelist").html('<div class="centerDiv">Unable to authenticate connector.<br><a href="//mail.zoho.com/zm/#settings/all/integrations-settings/DeveloperSpace/connectors" target="_blank">Click here to create</a></div>');
        $("#setAppdata").remove();
        $("#deleteAppdata").remove();
    });
};
window.appView.populateAttachmentDetails = function (mailData) {
    let rootElement = document.getElementById("attachmentCont");
    rootElement.innerHTML = "";
    if (mailData.type === "attachment") {
        mailData.NEWATTR = mailData.data;
    }
    if (!$.isEmptyObject(mailData.NEWATTR)) {

        mailData.NEWATTR.forEach(function (attachmentData, index) {

            let attachEle = document.createElement("div"),
                btnWrapper = document.createElement("div"),
                fileEle = document.createElement("div"),
                attachData = {
                    groupId: attachmentData.groupId,
                    entityId: attachmentData.entityId,
                    entityType: attachmentData.entityType,
                    attachId: attachmentData.attachId
                };

            fileEle.innerText = attachmentData.name;
            btnWrapper.innerHTML = "<div>" +
            "<span class='PluginButton' id='compose'>Add to Compose</span>" +
            (noteId !== "1" && ["gif", "png", "jpeg", "jpg", "bmp", "tiff", "tif"].includes(attachmentData.fmt) ? "<span class='PluginButton' id='insert'>Add to Notebook</span>" : "" ) +
            "</div>";
            attachEle.append(fileEle);
            attachEle.append(btnWrapper);
            $(btnWrapper).find("#compose").click(function () {
                apiUtil.downloadAttachment(attachData).then(function (file) {
                    apiUtil.composeNewMail({
                        ATTACHMENT: new File([file], attachmentData.name)
                    });
                });
            });
            if ($(btnWrapper).find("#insert")[0]) {
                $(btnWrapper).find("#insert").click(function () {
                    var callbackApiXhr = {
                        url: "https://notebook.zoho.com/api/v1/cards/image",
                        type: "POST",
                        headers: {},
                        attachPayload: {
                            JSONString: {
                                "notebook_id": noteId,
                                "notecard_name": attachmentData.fn
                            }
                        },
                        payload: {},
                        serviceName: "Notebook",
                        params: {},
                        file: {
                            fileName: attachmentData.fn,
                            fileParamName: "attachment"
                        }};
                    apiUtil.downloadAttachment(attachData, callbackApiXhr).then(function (params) {
                        $(btnWrapper).find("#insert").text("Uploaded");
                        $(btnWrapper).find("#insert").css("pointer-events", "none");
                    });
                });
            }
            rootElement.appendChild(attachEle);
        });
        return;
    }
    rootElement.innerHTML = "<div class='centerDiv'>No attachement found</div>";
};

window.appView.bindAppEvents = function () {
    $("#composeArea").text("Hi, This is regarding the sales pitch we had discussed about previously.");
    $(".cs_accTitle").click(function (event) {
        let currentTab = $(event.currentTarget);
        if (!currentTab.hasClass("active")) {
            $(".active").next().slideUp();
            $(".active").removeClass("active");
            currentTab.addClass("active");
            $(".active").next().slideDown();
        } else {
            $(".active").next().slideUp();
            $(".active").removeClass("active");
        }
    });
};

window.appView.bindApiEvents = function () {

    $("#attachDeskTopCont input").change(function () {
        let file = $("#attachDeskTopCont input")[0].files;
        let type = file[0] && file[0].type;
        if (noteId !== "1" && type && ["gif", "png", "jpeg", "jpg", "bmp", "tiff", "tif"].includes(type.substr(type.indexOf("/") + 1,))) {
            let xhrObj = {
                url: 'https://notebook.zoho.com/api/v1/cards/image',
                type: 'POST',
                serviceName: 'Notebook',
                fileData: new Blob(file),
                file: {
                    fileName: file[0].name,
                    fileParamName: "attachment"
                },
                attachPayload: {
                    JSONString: {
                        notebook_id: noteId,
                        notecard_name: file[0].name
                    }
                }
            };
            $("#insertFromDesk").click(function () {
                apiUtil.executeURL(xhrObj);
            });
            $("#insertFromDesk").slideDown();
            return;
        }
        $("#insertFromDesk").slideUp();
    });
    $("#compose").click(function () {
        let composeObj = {
            SUBJECT: "Sales Pitch",
            TO: "charles@zylker.com",
            CC: "paula@zylker.com",
            BCC: "admin@zylker.com, aura@zylker.com",
            CONTENT: $("#composeArea").text()
        };
        apiUtil.composeNewMail(composeObj);
    });
    $("#insert").click(function () {
        apiUtil.insertMailContent($("#composeArea").text());
    });

    $("#contactBtn").click(function () {
        let queryValue = $(".search_input").val();
        if (/^[0-9]+$/.test(queryValue)) {
            apiUtil.getContactbyZuid(queryValue);
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(queryValue)) {
            apiUtil.getContactbyEmailId(queryValue);
        }
    });
    $("#setAppdata").click(function () {
        let selectedNoteBook = $("#notebooklist").find(":selected");
        noteId = selectedNoteBook.attr("id");
        apiUtil.setAppData({noteId: selectedNoteBook.attr("id")}).then(function () {
            window.appView.populateAppData();
        });
    });
    $("#deleteAppdata").click(function () {
        apiUtil.deleteAppData(["noteId"]).then(function () {
            window.appView.populateAppData();
        });
    });
};
