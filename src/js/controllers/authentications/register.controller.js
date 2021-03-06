angular
  .module('runchApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.register =  () => {
    User
      .register(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.saveUser();
        $state.go('dashboard');
      }, err => {
        console.log(err);
      });
  };
}
