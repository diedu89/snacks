var request = require('supertest')
		, app = require('../app');



describe('homepage', function(){
	it("Show description of project", function(done){
		request(app).get('/')
			.expect(200)
			.expect(/This is a snacks API/, done)
	})
})

