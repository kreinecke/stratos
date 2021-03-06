import { inject, TestBed } from '@angular/core/testing';
import { ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { EntityServiceFactory } from '../../../../../core/src/core/entity-service-factory.service';
import { generateTestApplicationServiceProvider } from '../../../../../core/test-framework/application-service-helper';
import { generateTestEntityServiceProvider } from '../../../../../core/test-framework/entity-service.helper';
import { getInitialTestStoreState, createBasicStoreModule } from '../../../../../core/test-framework/store-test-helper';
import { GetApplication } from '../../../../../store/src/actions/application.actions';
import { applicationSchemaKey, entityFactory } from '../../../../../store/src/helpers/entity-factory';
import { endpointStoreNames } from '../../../../../store/src/types/endpoint.types';
import { CfAutoscalerTestingModule } from '../../../cf-autoscaler-testing.module';
import { CfAppAutoscalerEventsConfigService } from './cf-app-autoscaler-events-config.service';
import { CommonModule, DatePipe } from '@angular/common';
import { CoreModule } from '../../../../../core/src/core/core.module';
import { SharedModule } from '../../../../../core/src/shared/shared.module';
import {
  ApplicationEnvVarsHelper
} from '../../../../../core/src/features/applications/application/application-tabs-base/tabs/build-tab/application-env-vars.service';

describe('CfAppAutoscalerEventsConfigService', () => {
  const initialState = getInitialTestStoreState();

  const cfGuid = Object.keys(initialState.requestData[endpointStoreNames.type])[0];
  const appGuid = Object.keys(initialState.requestData.application)[0];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationEnvVarsHelper,
        DatePipe,
        CfAppAutoscalerEventsConfigService,
        EntityServiceFactory,
        generateTestEntityServiceProvider(
          appGuid,
          entityFactory(applicationSchemaKey),
          new GetApplication(appGuid, cfGuid)
        ),
        generateTestApplicationServiceProvider(appGuid, cfGuid),
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
      ],
      imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        createBasicStoreModule(),
        CfAutoscalerTestingModule
      ]
    });
  });

  it('should be created', inject([CfAppAutoscalerEventsConfigService], (service: CfAppAutoscalerEventsConfigService) => {
    expect(service).toBeTruthy();
  }));
});
