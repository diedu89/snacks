/*angular.module('snacks',[''])
	.controller("AppController", function($http){
    this.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
    console.log("test");
	})
	*/
	angular.module('snacksApp', ['bw.paging'])
  .controller('AppController', function($http) {
    var ctrl = this;
    ctrl.data = {
    	count: 0,
    	rows: []
    };

    ctrl.page = 1;
    ctrl.search = "";
    ctrl.loading = true;

    ctrl.searchSnack = function(search){
    	ctrl.search = search || "";
    	//ctrl.search = encodeURI(ctrl.search);
    	ctrl.page = 1;
    	ctrl.getSnacks();
    }

    ctrl.changePage = function(page){
    	ctrl.page = page;
    	ctrl.getSnacks();;
    }

    ctrl.getSnacks = function(){
    	var url = "/products?perPage=5&page=" + ctrl.page + ((ctrl.search.length > 0) ? "&search=" + encodeURI(ctrl.search) : "");
    	ctrl.loading = true;
    	$http.get(url)
    	.then(function(response){
    		ctrl.data = response.data;
    		ctrl.loading = false;
    	})
    }

    ctrl.getSnacks();
  });