import AppController from './AppController';

describe('AppController', function () {

  // Instantiate mocks
  var MockToastService: ng.material.IToastService;

  beforeEach(function () {
    MockToastService = jasmine.createSpyObj('$mdToast', ['showSimple']);
  });

  // Instantiate controller
  var $ctrl: AppController;

  beforeEach(function () {
    $ctrl = new AppController(MockToastService);
  });

  describe('submit', function () {
    it('should show a simple toast', function () {
      $ctrl.submit();
      expect(MockToastService.showSimple).toHaveBeenCalled();
    });
  });
});
