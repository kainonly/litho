import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable()
export class AddService {
	private action = '/add';

	constructor(private http: HttpService) {}

	customAction(name: string) {
		this.action = name;
	}

	factory(model: string, data: any): Observable<any> {
		return this.http.req(model + this.action, data);
	}
}
