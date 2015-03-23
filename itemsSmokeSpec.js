// Smoke testing
/*
	Given I have no projects in my account
	When I create at least 3 items
	Then I should be able to see all Items associated to no Project.
	
*/

var frisby = require ('frisby');

	frisby.globalSetup({
		request:{
				headers:{
					'Authorization' :'Basic cmV5bmFsZGl0b0BnbWFpbC5jb206QiFnc2gwdjNs'
				},
				//proxy: 'http://172.20.240.5:8080'
			}
		});

		
var createItem = function(num){
	for(var i = 0; i < num;i++){
		listNoProjItems();
	}
	
	};
	
var listNoProjItems	= function(){
	frisby.create('When I create at least 3 items')
		.post('https://todo.ly/api/items.json',{"Content" : "Testing-Items"+Math.random()*9},{json:true})
		//.inspectJSON()
		.afterJSON(function(json){
			frisby.create ('Then I should be able to see all Items associated to no Project.')
				.get('https://todo.ly/api/items.json')
				.inspectJSON()
				.expectJSON('*',{ProjectId : null})
				.toss();
			})
		.toss();
	};
		
		
frisby.create('Given I have no projects in my account')
	.get('https://todo.ly/api/projects.json')
	//.inspectJSON()
	.afterJSON(function(json){
		var lon=json.length;
			if(lon == 0 ){
				createItem(3);
			}
			else{
				for(var i=0;i<lon;i++){
					var myId = json[i].Id;
					frisby.create('Deleting all projs of account')
					.delete('https://todo.ly/api/projects/'+myId+'.json')
					//.inspectJSON()
					.toss();
				}
				createItem(3);
			}
	})
.toss();