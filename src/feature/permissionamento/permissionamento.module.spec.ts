import { PermissionamentoModule } from './permissionamento.module';

describe('PermissionamentoModule', () => {
  let permissionamentoModule: PermissionamentoModule;

  beforeEach(() => {
    permissionamentoModule = new PermissionamentoModule();
  });

  it('should create an instance', () => {
    expect(permissionamentoModule).toBeTruthy();
  });
});
