import {IIdentity} from '@essential-projects/iam_contracts';

import {
  ExternalTask,
  IExternalTaskApi,
  IExternalTaskApiAccessor,
} from '@process-engine/external_task_api_contracts';

export class ExternalTaskApiClientService implements IExternalTaskApi {

  private readonly _externalApiAccessor: IExternalTaskApiAccessor = undefined;

  constructor(externalApiAccessor: IExternalTaskApiAccessor) {
    this._externalApiAccessor = externalApiAccessor;
  }

  public async fetchAndLockExternalTasks<TPayloadType>(identity: IIdentity,
                                                       workerId: string,
                                                       topicName: string,
                                                       maxTasks: number,
                                                       longPollingTimeout: number,
                                                       lockDuration: number,
                                                      ): Promise<Array<ExternalTask<TPayloadType>>> {
    return this
      ._externalApiAccessor
      .fetchAndLockExternalTasks<TPayloadType>(identity, workerId, topicName, maxTasks, longPollingTimeout, lockDuration);
  }

  public async extendLock(identity: IIdentity, workerId: string, externalTaskId: string, additionalDuration: number): Promise<void> {
    return this._externalApiAccessor.extendLock(identity, workerId, externalTaskId, additionalDuration);
  }

  public async handleBpmnError(identity: IIdentity, workerId: string, externalTaskId: string, errorCode: string): Promise<void> {
    return this._externalApiAccessor.handleBpmnError(identity, workerId, externalTaskId, errorCode);
  }

  public async handleServiceError(identity: IIdentity,
                                  workerId: string,
                                  externalTaskId: string,
                                  errorMessage: string,
                                  errorDetails: string): Promise<void> {
    return this._externalApiAccessor.handleServiceError(identity, workerId, externalTaskId, errorMessage, errorDetails);
  }

  public async finishExternalTask<TResultType>(identity: IIdentity, workerId: string, externalTaskId: string, payload: TResultType): Promise<void> {
    return this._externalApiAccessor.finishExternalTask<TResultType>(identity, workerId, externalTaskId, payload);
  }
}