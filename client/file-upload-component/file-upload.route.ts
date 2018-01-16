import {Router, RouterConfig, Routes} from "@angular/router";

import {FileUploadComponent} from "./file-upload.component";

import * as myGlobal from "../service/global";

export const fileUploadRoutes: Routes = [
    { path: 'upload', component: FileUploadComponent }
];