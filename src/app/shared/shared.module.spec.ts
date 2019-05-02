import { SharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: SharedModule;

  beforeEach(() => {
    sharedModule = new SharedModule();
  });

  it('deverá criar uma instância.', () => {
    expect(sharedModule).toBeTruthy();
  });
});
