/**
As a single user I would like to add new deliver date to created note so that to have note with scheduled note
	Given I don't have any project created in my account
	When I create a project
	And I create a note that project
	Then I set deliver date for note
*/
var frisby = require ('frisby');
// GlobalConfiguration
frisby. globalSetup({
	request:{
		headers:{
			'Authorization':'am9vb2VsckBnbWFpbC5jb206UEBzc3cwcmQ='
		},
		//json : true,
		inspectOnFailure : true,
		//proxy :'http://172.20.240.5:8080'
	}
});



frisby.create('Given I dont have any project created in my account')
	.get('https://todo.ly/api/projects.json') //resource  or service
	.expectStatus(200)
	.afterJSON(function(json){
		var totalProject = json.length;
		var totalDeleted = 0;
		if(totalProject>0){
			for(j = 0;j < json.length;j++ ){
				console.log("Este es el Id"+json[j].Id);
				frisby.create('Delete project')
					.delete('https://todo.ly/api/projects/' + json[j].Id + '.json',{json: true})
					.expectJSON({
						Deleted: true
					})
					.afterJSON(function (data){
						totalDeleted++;
						if (totalDeleted == totalProject){
							//Create a new project
							createProject("PROJECT"+ parseInt(Math.random() * 100000));							
						}					
					})
				.toss();
			}
		}
		else{
			createProject("PROJECT"+ parseInt(Math.random() * 1000));
		}

	})
.toss();

var createProject = function(nameProject){
	// Json to create Project
	var jsonProject = {
		Content:nameProject
	};
		
	frisby.create('When I create a project')
		.post('https://todo.ly/api/projects.json',jsonProject,{json: true})
		.afterJSON(function(jsonProjectResp){
			var jsonItem = 	{
				"Content":'Item1',
				"ProjectId":jsonProjectResp.Id
			}
			// Json to create Items
			console.log('>>>>'+jsonProjectResp.Id)
			frisby.create('And I create a note that project')
				.post('http://todo.ly/API/Items.json',jsonItem,{json: true})
				.afterJSON(function(jsonItemResp){
					 var jsonDate = {
						"DueDate":"3/4/2015 00:00",
						"DueTimeSpecified":true
					}
					
					frisby.create('Then I set deliver date for note')
						.put('http://todo.ly/API/Items/'+jsonItemResp.Id+'.json', jsonDate,{json: true})
						.afterJSON(function(jsonDateResp){
							var givenDate = '5 Mar 12:00 AM';
							expect(jsonDateResp.DueDate).toContain(givenDate);
						})
					.toss();
				})
				.toss();
		})
	.toss();
}