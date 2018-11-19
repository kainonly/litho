import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { ConfigService } from './config.service';
import { BitService } from './bit.service';
import { EventsService } from './events.service';
import { HttpService } from './http.service';

import { AddService } from './common/add.service';
import { GetService } from './common/get.service';
import { ListsService } from './common/lists.service';
import { OriginListsService } from './common/origin-lists.service';
import { EditService } from './common/edit.service';
import { DeleteService } from './common/delete.service';
import { StatusService } from './common/status.service';
import { SwalService } from './common/swal.service';

@NgModule({
	imports: [ HttpClientModule ],
	providers: [
		ConfigService,
		LocalStorage,
		BitService,
		HttpService,
		EventsService,
		AddService,
		DeleteService,
		EditService,
		GetService,
		ListsService,
		OriginListsService,
		StatusService,
		SwalService
	]
})
export class NgxBitModule {}
