import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../../../store/src/app-state';
import { EndpointModel } from '../../../../../../store/src/types/endpoint.types';
import { ITableColumn } from '../../../../shared/components/list/list-table/table.types';
import { BaseEndpointsDataSource } from '../../../../shared/components/list/list-types/endpoint/base-endpoints-data-source';
import {
  EndpointCardComponent,
} from '../../../../shared/components/list/list-types/endpoint/endpoint-card/endpoint-card.component';
import { endpointColumns } from '../../../../shared/components/list/list-types/endpoint/endpoints-list-config.service';
import { IListConfig, ListViewTypes } from '../../../../shared/components/list/list.component.types';
import { EntityMonitorFactory } from '../../../../shared/monitors/entity-monitor.factory.service';
import { InternalEventMonitorFactory } from '../../../../shared/monitors/internal-event-monitor.factory';
import { PaginationMonitorFactory } from '../../../../shared/monitors/pagination-monitor.factory';
import { KubernetesEndpointsDataSource } from './kubernetes-endpoints-data-source';

@Injectable()
export class KubernetesEndpointsListConfigService implements IListConfig<EndpointModel> {
  columns: ITableColumn<EndpointModel>[];
  isLocal = true;
  dataSource: BaseEndpointsDataSource;
  viewType = ListViewTypes.CARD_ONLY;
  cardComponent = EndpointCardComponent;
  text = {
    title: '',
    filter: 'Filter Endpoints',
    noEntries: 'There are no endpoints'
  };
  enableTextFilter = true;
  tableFixedRowHeight = true;


  constructor(
    private store: Store<AppState>,
    paginationMonitorFactory: PaginationMonitorFactory,
    entityMonitorFactory: EntityMonitorFactory,
    internalEventMonitorFactory: InternalEventMonitorFactory,
  ) {
    this.columns = endpointColumns.filter(column => {
      return column.columnId !== 'type';
    });
    this.dataSource = new KubernetesEndpointsDataSource(
      this.store,
      this,
      paginationMonitorFactory,
      entityMonitorFactory,
      internalEventMonitorFactory
    );
  }
  public getColumns = () => this.columns;
  public getGlobalActions = () => [];
  public getMultiActions = () => [];
  public getSingleActions = () => [];
  public getMultiFiltersConfigs = () => [];
  public getDataSource = () => this.dataSource;
}
