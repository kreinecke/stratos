import { Component } from '@angular/core';

import { TableCellCustom } from '../../../list.types';
import { ListCfRoute } from '../cf-routes-data-source-base';
import { APIResource } from '../../../../../../../../store/src/types/api.types';

@Component({
  selector: 'app-table-cell-tcp-route',
  templateUrl: './table-cell-tcproute.component.html',
  styleUrls: ['./table-cell-tcproute.component.scss']
})
export class TableCellTCPRouteComponent extends TableCellCustom<APIResource<ListCfRoute>> { }
