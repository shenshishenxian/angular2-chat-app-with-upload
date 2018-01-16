import { NgModule }      from "@angular/core";
import {RouterModule}	from "@angular/router";
import { CommonModule } from "@angular/common";
import { FileUploadComponent }  from "./file-upload.component";

@NgModule({
    imports:      [ CommonModule, RouterModule],
    declarations: [ FileUploadComponent ],
    exports: 	  [ FileUploadComponent ]
})

export class FileUploadModule {}
