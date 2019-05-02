import { CoreModule } from './core.module';

describe('CoreModule', () => {
  let coreModule: CoreModule;

  beforeEach(() => {
    coreModule = new CoreModule();
  });

  it('deverá criar uma instância.', () => {
    expect(coreModule).toBeTruthy();
  });
});
