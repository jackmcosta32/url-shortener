import { BaseMocker } from './base.mocker';

export class CreateUrlDtoMocker extends BaseMocker {
  protected get model() {
    return {
      uri: this.factory.internet.url(),
    };
  }
}
