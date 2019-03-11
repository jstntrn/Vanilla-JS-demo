function fetchIssues () {
    // retrieving issues from Local Storage
    var issues = JSON.parse(localStorage.getItem('issues'));

    //retrieving the element within the document with the id of issuesList
    var issuesList = document.getElementById('issuesList');

    //we are accessing the HTML items within the issuesList element, and assigning them to an empty string
    issuesList.innerHTML = '';

    //now we are looping through the issues and assigning each item to a variable
    //variables inserted into the HTML, which is inserted in the 'issuesList' div
    for (let i = 0; i < issues.length; i++){
        var id = issues[i].id;
        var name = issues[i].name;
        var severity = issues[i].severity;
        var number = issues[i].number;
        var message = issues[i].message;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+ '<h6>Message ID: ' + id + '</h6>' + '<p><span class="label label-info">' + status 
        + '</span></p>' + '<h3>' + message + '</h3>'+
        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p> '+
        '<p><span class="glyphicon glyphicon-user"></span> ' + name + '</p> '+
        '<span class="glyphicon glyphicon-phone"></span> ' + number + '</p>'+
        //here we are calling the setStatusClosed function in the onclick of this button
        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a>' +
        //here we are calling the delete issue function to the onclick of this button
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+'</div>';

    }
}

//this is attaching the sendText function to the submit event on the form.  When "Send Text" button is clicked, 
//it triggers a submit event, because button type is 'submit', triggers the built in functionality of a form
document.getElementById('issueInputForm').addEventListener('submit', sendText)

function sendText(e) {

    //input values from the form controls are retrieved and stored in local variables

    //Status set to Open

    //and messageID is generated using chance.guid()
    
    //the new values are added to the issue object
    let messageID = chance.guid()
    let firstName = document.getElementById('firstName').value
    let phoneNumber = document.getElementById('phoneNumber').value
    let issueSeverity = document.getElementById('issueSeverityInput').value
    let messageBody = document.getElementById('messageBody').value
    let issueStatus = 'Open'

    let issue = {
        id: messageID,
        name: firstName,
        number: phoneNumber,
        severity: issueSeverity,
        message: messageBody,
        status: issueStatus

    }

    //this inserts the new issue object into the issues object in local storage.  If there aren't any issues in local storage, 
    //add the new on to an empty array.  If there are items there, push the new item onto the end of the existing array.
    if (localStorage.getItem('issues') === null){
        var issues = []
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    }

    //this empties the form after submitting
    document.getElementById('issueInputForm').reset()

    //this regenerates the list output, making the new issue visible
    fetchIssues()

    //this prevents the default submission of the form from taking place
    e.preventDefault()
}

//SET STATUS CLOSED
//the id of the current item is passed in as a parameter. To retrieve the corresponding item from Local Storage, 
//we need to get all of the issues in JSON form.  Then we can loop through the issues and find the right item to close. 
function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = "Closed";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }

//DELETE ISSUE

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }