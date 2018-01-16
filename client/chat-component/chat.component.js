"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var globalVars = require("../service/global");
var router_1 = require("@angular/router");
var core_2 = require("@angular/core");
/// <reference path="../../typings/globals/jquery/index.d.ts/>
require("/socket.io/socket.io.js");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(router) {
        this.resFlag = false;
        this.newUser = false;
        this.exitedUser = false;
        this.newUserName = null;
        this.exitedUserName = null;
        this.sentMessageUsername = null;
        this.msgCount = 0;
        this.router = router;
        var reference = this;
        var temp;
        globalVars.socket.on("broadcastToAll_chatMessage", function (resObj) {
            reference.msgCount++;
            if (reference.sentMessageUsername !== resObj.name) {
                resObj.name = resObj.name + ": ";
                temp = $("#messages").length;
                console.log("ul length : ", temp);
                console.log(reference.msgCount);
                $("#messages").append($("<li data-index=" + reference.msgCount + ">"));
                $("li[data-index=" + reference.msgCount + "]").append($("<div class='left-msg' data-index=" + reference.msgCount + ">"));
                $("div[data-index=" + reference.msgCount + "]").append($("<span class='name'>").text(resObj.name));
                $("div[data-index=" + reference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                $("#messages").append($("<br>"));
            }
            else if (reference.sentMessageUsername === resObj.name) {
                $("#messages").append($("<li data-index=" + reference.msgCount + ">"));
                $("li[data-index=" + reference.msgCount + "]").append($("<div class='right-msg' data-index=" + reference.msgCount + ">"));
                $("div[data-index=" + reference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                $("#messages").append($("<br>"));
                reference.sentMessageUsername = null;
            }
        });
        globalVars.socket.on("updateSocketList", function (list) {
            reference.clientsNameList = list;
        });
        globalVars.socket.on("addUserToSocketList", function (username) {
            reference.exitedUser = false;
            reference.newUser = true;
            reference.newUserName = username;
        });
        globalVars.socket.on("removeUserFromSocketList", function (username) {
            reference.newUser = false;
            reference.exitedUser = true;
            reference.exitedUserName = username;
        });
    }
    ChatComponent.prototype.sendMessage = function (data) {
        this.resFlag = true;
        var reference = this;
        globalVars.socket.emit("chatMessageToSocketServer", data.value, function (respMsg, username) {
            reference.sentMessageUsername = username;
            reference.response = respMsg;
        });
        $("#message-boxID").val(" ");
    };
    ChatComponent.prototype.upload = function () {
        this.router.navigate(["upload"]);
    };
    ChatComponent.prototype.sendMessageOnEnter = function ($event, messagebox) {
        if ($event.which === 13) {
            this.sendMessage(messagebox);
        }
    };
    ChatComponent.prototype.update = function () {
        this.resFlag = false;
        this.newUser = false;
        this.exitedUser = false;
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "chat-page",
            templateUrl: "./chat.component.html"
        }),
        __param(0, core_2.Inject(router_1.Router))
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
