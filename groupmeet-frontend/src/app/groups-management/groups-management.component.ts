import { Component } from '@angular/core';

interface Group {
  name: string;
  members: string[];
}

@Component({
  selector: 'app-group-list',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent {
  groups: Group[] = [
    { name: 'Group 1', members: [] },
    { name: 'Group 2', members: [] }
  ];

  newGroupName: string = '';
  newMemberEmail: string = '';
  newMemberGroupName: string = '';
  activeGroup: string = '';
  
  createGroup() {
    if (this.newGroupName.trim()) {
      const newGroup: Group = { name: this.newGroupName, members: [] };
      this.groups.push(newGroup);
      this.newGroupName = '';
    }
  }

  addMember() {
    if (this.newMemberEmail.trim()) {
      for (var index in this.groups) {
       if(this.groups[index].name == this.newMemberGroupName){
          this.groups[index].members.push(this.newMemberEmail);
          this.groups[index].members = Object.assign([], this.groups[index].members);
       }
      }      
      this.newMemberEmail = '';
    }
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
