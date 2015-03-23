// Smoke testing

var frisby = require ('frisby');

	frisby.globalSetup({
		request:{
				headers:{
					'Authorization' :'Basic dGVzdC1yZ0B0ZXN0MDA4Lm5ldDpCIWdzaDB2M2w='
				},
				//proxy: 'http://172.20.240.5:8080'
			}
		});

console.log('Adding a new user');
frisby.create('Adding user')
	.post('https://todo.ly/api/user.json',{"Email" : "test-rg@test008.net" , "FullName" : "RG Test" , "Password" : "B!gsh0v3l"},{json: true})
	.expectJSONTypes({Id : Number})
	.inspectJSON()
	.afterJSON(function(json){
		var usr = json.Email;
		console.log('Getting user: '+usr);
		frisby.create('Getting user created previously')
		.get('https://todo.ly/api/user.json')
		.inspectJSON()
		.afterJSON(function(jsonData){
			console.log('Updating user: '+jsonData.FullName);
			frisby.create('Updating user')
			.put('https://todo.ly/api/user/0.json',{"FullName" : "FullName Updated"},{json: true})
			.inspectJSON()
			.afterJSON(function(dataUser){
				console.log('Deleting user');
				frisby.create('Delete user')
					.delete('https://todo.ly/api/user/0.json')
					.inspectJSON()
					.afterJSON(function(deletedUser){
					console.log(deletedUser.Email);
						frisby.create('Deleting user')
							.delete('https://todo.ly/api/user/0.json')
							.expectJSON({ErrorCode : 105})
							.expectJSON({ErrorMessage: "Account doesn't exist"})
							.inspectJSON()
						.toss();
					})
				.toss();
			})
			.toss();
			})
		.toss();
	})
.toss();