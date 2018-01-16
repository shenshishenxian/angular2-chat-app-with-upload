"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("/socket.io/socket.io.js");
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent() {
    }
    FileUploadComponent.prototype.ngOnInit = function () {
    };
    FileUploadComponent.prototype.upload = function () {
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('files', fileBrowser.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/Data/UploadFiles', true);
            xhr.onload = function () {
                if (this['status'] === 200) {
                    var responseText = this['responseText'];
                    var files = JSON.parse(responseText);
                    //todo: emit event
                }
                else {
                    //todo: error handling
                }
            };
            xhr.send(formData);
        }
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], FileUploadComponent.prototype, "fileInput");
    FileUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-file-upload',
            templateUrl: './file-upload.component.html'
            //styleUrls: ['./file-upload.component.css']
        })
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
