export default class AppController {
  /*@ngInject*/
  constructor(private $mdToast: angular.material.IToastService) {
    console.log('AppController');
  }

  submit() {
    this.$mdToast.showSimple(`Submit: name = ${this.name}, radio = ${this.radio}`);
  }

  form: ng.IFormController;
  name: string = 'Foobar';
  radio: string = 'Bar';
}
