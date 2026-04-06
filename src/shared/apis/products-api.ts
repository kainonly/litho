import { Injectable } from '@angular/core';

import { Api } from './index';
import { Product } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class ProductsApi extends Api<Product> {
    override collection = 'products';
}
