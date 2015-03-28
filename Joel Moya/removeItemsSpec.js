/**
As a single user I would remove all Items from a Project 
	Given I create a project
	Then I create a new item 
*/

/*
	Remove all items from account
	Items in a project
	Items without a project
*/

var frisby = require ('frisby');
// GlobalConfiguration
frisby. globalSetup({
	request:{
		headers:{
			'Authorization':'am9vb2VsckBnbWFpbC5jb206UEBzc3cwcmQ='
		},
		inspectOnFailure : true,
	}
});
	// Json to create Project
	var jsonProject = {
		Content:"Project1"
	};
		
	frisby.create('When I create a project')
		.post('https://todo.ly/api/projects.json',jsonProject,{json: true})
		.afterJSON(function(jsonProjectResp){

			// Json to create Items
			for(var i=0; i<10;i++){
				var jsonItem = 	{
					"Content":'Item'+i,
					"ProjectId":jsonProjectResp.Id
				}
				frisby.create('And I create a note that project')
					.post('http://todo.ly/API/Items.json',jsonItem,{json: true})
					.afterJSON(function(jsonItemResp){    								
				})
				.toss();
			}
			frisby.create ('Getting all Items')
				.get('https://todo.ly/api/items.json')
				.afterJSON(function(jsonItems){					
					if(json.length == 0){
						console.log ('There is no items in the account at the moment');
					}
					else{					
						for(var i=0; i<jsonItems.length;i++){
							var tempId = json[i].Id;
							frisby.create('Deleting All Items')
								.delete('https://todo.ly/api/items/'+tempId+'.json')
								.afterJSON(function(jsonDelete){
									expect(jsonDelete.Deleted).toBe(true)
								})
							.toss();
						}
					}
			})
			.toss();
			
		})
	.toss();