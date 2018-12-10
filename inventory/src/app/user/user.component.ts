import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  fetch(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    //  var issuesList = form.value.issuesList;
      var issuesList = document.getElementById('issuesList');
      issuesList.innerHTML = '';
      
      for (var i = 0; i < issues.length; i++) {
    //    var id = issues[i].id;
        var MobileName = issues[i].MobileName;
        var Specification = issues[i].description;
        var NumberOfDevices = issues[i].NumberOfDevices;
        var price = issues[i].price;
       // var status = issues[i].status;
        
        issuesList.innerHTML +=   '<div class="well">'+
                                  '<p><span class="label label-info">' + status + '</span></p>'+
                                  '<h3> Mobile Name: ' + MobileName + '</h3>'+
                                  '<h4> Description: ' + Specification + '</h4>'+
                                  '<p><span class="glyphicon glyphicon-phone"></span> ' + NumberOfDevices + ' '+
                                  '<span class="glyphicon glyphicon-usd"></span> ' + price + '</p>'
                                  '</div>'
      }
  
    }
  
   /* saveIssue(form: NgForm){
      
  
      var issueMobileName = form.value.issueMobileNameInput;
      var issueDescription = form.value.issueDesciption;
      var issueNumberOfDevices = form.value.issueMobilesInput;
      var issuePrice = form.value.issuePriceInput;
      var issuesList = document.getElementById('issuesList');
      issuesList.innerHTML = '';
      
     
      
      var issue = {
       
        MobileName: issueMobileName,
        description: issueDescription,
        NumberOfDevices: issueNumberOfDevices,
        price: issuePrice
      
      }
      
      if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
      } else {
        issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
      }
      
      
     // document.getElementById('issueInputForm').reset();
     
      this.fetchIssues();
  
    }*/
}
