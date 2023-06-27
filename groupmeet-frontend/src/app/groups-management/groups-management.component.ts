import { Component } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Group } from './group';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-group-list',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent {

  public groups: Group[] = [];
  public groups2: Group[] = [];
 
  
  constructor(private httpClient: HttpClient){ }

  ngOnInit() {
    this.getGroups().subscribe(data => this.groups = data);
}

  getGroups(): Observable<Group[]>{
    return this.httpClient.get<Group[]>("http://localhost:3001/groups");
  }

  postGroup(data: any) {
    return this.httpClient.post<any>("http://localhost:3001/groups/", data);
  }

  UpdateGroup(data: any, name:string) {
    return this.httpClient.patch<any>("http://localhost:3001/groups/" + name, data);
  }

  getSingleGroup(name:string){
    console.log("Name", name);
    return this.httpClient.get<Group[]>("http://localhost:3001/groups/" + name);
  }

  newGroupName: string = '';
  newMemberEmail: string = '';
  newMemberGroupName: string = '';
  activeGroup: string = '';
  
  createGroup(){
    this.newGroupName = this.newGroupName.trim();
    let newGroup = {   "name" : this.newGroupName,
          "             members": []
                      }
    this.postGroup(newGroup)
    .subscribe({
      next: (res) => {
        alert("Group Added Successfully");
      },
      error: () => {
        alert("Error while adding the group !!!")
      }
    })
    window.location.reload();
    }

  addMember() {
    this.newMemberEmail = this.newMemberEmail.trim()
    this.newMemberGroupName = this.newMemberGroupName.trim()

    let j = {"members":[this.newMemberEmail]};
  
    
    this.UpdateGroup(j, this.newMemberGroupName).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: () => {
        alert("Error while adding the Member !!!")
      }
    });
   
  }

  showGroupMembers(group: string) {
    this.activeGroup = group;
  }

  hideGroupMembers() {
    this.activeGroup = '';
  }

  getGroupMembers(group: string): string[] {
    for (var index in this.groups) {
      if(this.groups[index].name == group){
        return this.groups[index].members;
      }
     }
     return [''];
  }
}
