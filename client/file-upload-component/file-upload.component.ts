import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }    from "@angular/router";
import * as globalVars from "../service/global";
import {Inject} from "@angular/core";

import "/socket.io/socket.io.js";

@Component({
  moduleId: module.id,
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
  //styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  constructor() { }

  ngOnInit() {
  }

  private upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('files', fileBrowser.files[0]);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/Data/UploadFiles', true);
      xhr.onload = function () {
        if (this['status'] === 200) {
            const responseText = this['responseText'];
            const files = JSON.parse(responseText);
            //todo: emit event
        } else {
          //todo: error handling
        }
      };
      xhr.send(formData);
    }
  }


  

}