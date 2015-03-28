/**
As a single user I would like to verify date of  new created Item 
	Given I create a project
	Then I create a new item 
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

var newproject = 
{
	Content: 'ProjectJoel',
	Icon: 4
};

frisby.create('	Given I create a project')
	.post('https://todo.ly/api/projects.json',newproject,{json: true})
	.expectStatus(200)
	.expectJSON({
		Content: 'ProjectJoel',
		Icon: 4
	})
	.afterJSON(function(json){
	frisby.create('Then I create a new item ')
		.post('https://todo.ly/api/items.json',{'Content': 'newItem1','ProjectId': json.Id},{json: true})
		.expectJSON({
			'ProjectId': json.ProjectId
		})
	.afterJSON(function(data){
			var now = new Date();
			var date1 = now.getTime().toString();
			var currentDate = date1.substring(0, 7);
			expect(data.CreatedDate).toContain(currentDate)
			expect(data.LastUpdatedDate).toContain(currentDate)
			expect(data.CreatedDate).toBe(data.LastUpdatedDate)
	})
	.toss()	
})
.toss();