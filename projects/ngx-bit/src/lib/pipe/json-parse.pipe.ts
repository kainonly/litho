import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'JSONParse' })
export class JsonParsePipe implements PipeTransform {
	transform(value: string, locale?: any): any {
		try {
			return locale !== undefined ? JSON.parse(value)[locale] : JSON.parse(value);
		} catch (e) {
			return {};
		}
	}
}
