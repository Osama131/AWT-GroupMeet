import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Group } from './group';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog'



@Component({
  selector: 'app-group-list',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent {

  public groups: Group[] = [];
  public groups2: Group[] = [];
  dialog: any;
  @ViewChild('groupMembersDialog') infoDialog = {} as TemplateRef<any>;
  @ViewChild('addMemberDialog') memberDialog = {} as TemplateRef<any>;

  constructor(private httpClient: HttpClient, private dialogRef:MatDialog){ }

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

  deleteGroupReq(name:string) {
    return this.httpClient.delete<any>("http://localhost:3001/groups/" + name);
  }

  deleteGroupMember(info:any) {
    return this.httpClient.patch<any>("http://localhost:3001/groups/delete_member", info);
  }

  getSingleGroup(name:string){
    console.log("Name", name);
    return this.httpClient.get<Group[]>("http://localhost:3001/groups/" + name);
  }

  newGroupName: string = '';
  newMemberEmail: string = '';
  newMemberGroupName: string = '';
  activeGroup: string = '';
  deletG: String = '';

  // Create a new group
  createGroup(){
    this.newGroupName = this.newGroupName.trim();
    let newGroup = {   "name" : this.newGroupName,     "members": []
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


  // Delete a group
  deleteGroup(group:string)
  {
    this.deleteGroupReq(group)
    .subscribe({
      next: (res) => {
        alert("Group Deleted Successfully");
      },
      error: () => {
        alert("Error while deleteing the group !!!")
      }
    })
    window.location.reload();

  }

  // Get members of a group
  getGroupMembers(group: string): string[] {
    for (var index in this.groups) {
      if(this.groups[index].name == group){
        return this.groups[index].members;
      }
     }
     return [''];
  }

  // Member dialog
  openGroupMembersDialog(group: any): void {
    this.dialog = this.dialogRef.open(this.infoDialog, {
      data: group, height: '200px', width: '400px'
    });
  }

  // Add a new member
  openAddMemberDialog(groupName: string) {
    let newMail = {members:''}
    this.dialog = this.dialogRef.open(this.memberDialog,
      { data: newMail, height: '350px', width: '350px' });

    this.dialog.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result.members != ''){
      let newMailUpated = {"members":[newMail.members.trim()]};

    this.UpdateGroup(newMailUpated, groupName).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: () => {
        alert("Error while adding the Member !!!")
      }
    });
  }
    });
  }
  onCancelAddDialog() {
    this.dialog.close();
  }

  removeMember(groupName:string,member:string)
  {
    let info = {"name": groupName.trim(), "members":member.trim()};

    this.deleteGroupMember(info)
    .subscribe({
      next: (res) => {
        alert("Member Deleted Successfully");
      },
      error: () => {
        alert("Error while deleteing the Member !!!")
      }
    })
    window.location.reload();
  }
}
