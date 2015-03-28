/**
As a single user I would like to try to create a wrong account so that to see an error message 
	When I try to create an wrong account 
	Then I receive and error message 
*/

var frisby = require ('frisby');
// GlobalConfiguration
frisby. globalSetup({
	request:{
		/*headers:{
			'Authorization':'am9vb2VsckBnbWFpbC5jb206UEBzc3cwcmQ='
			proxy: 'http://172.20.240.5:8080/'
		},*/
		inspectOnFailure : true,
	}
});

frisby .create('When I try to create an wrong account ')
	.post('https://todo.ly/api/user.json',{'Email': 'Joel','Password': 'Control123','FullName': 'Test User'},{json:true})
		.expectJSON({
			ErrorCode: 307,
			ErrorMessage: 'Invalid Email Address'
		})
.toss();