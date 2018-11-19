import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyObjectPipe } from './pipe/empty-object.pipe';
import { JsonParsePipe } from './pipe/json-parse.pipe';

@NgModule({
	imports: [ CommonModule ],
	exports: [ EmptyObjectPipe, JsonParsePipe ],
	declarations: [ EmptyObjectPipe, JsonParsePipe ]
})
export class NgxBitPipeModule {}
