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
  // groups: Group[] = [
  //   { name: 'Group 1', members: [] },
  //   { name: 'Group 2', members: [] }
  // ];

  public groups: Group[] = [];
  
  constructor(private httpClient: HttpClient){ }

  ngOnInit() {
    this.getGroups().subscribe(data => this.groups = data);
}

  getGroups(): Observable<Group[]>{
    return this.httpClient.get<Group[]>("http://localhost:3000/groups");
  }

  newGroupName: string = '';
  newMemberEmail: string = '';
  newMemberGroupName: string = '';
  activeGroup: string = '';
  // createGroup() {
  //   if (this.newGroupName.trim()) {
  //     const newGroup: Group = { name: this.newGroupName, members: [] };
  //     this.groups.push(newGroup);
  //     this.newGroupName = '';
  //   }
  // }

  // addMember() {
  //   if (this.newMemberEmail.trim()) {
  //     for (var index in this.groups) {
  //      if(this.groups[index].name == this.newMemberGroupName){
  //         this.groups[index].members.push(this.newMemberEmail);
  //         this.groups[index].members = Object.assign([], this.groups[index].members);
  //      }
  //     }      
  //     this.newMemberEmail = '';
  //   }
  // }
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
