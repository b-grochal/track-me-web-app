import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BasicUser } from '../../models/basic-user.model';
import { BasicUserService } from '../../services/basic-user.service';

@Component({
  selector: 'app-basic-user-details',
  templateUrl: './basic-user-details.component.html',
  styleUrls: ['./basic-user-details.component.css']
})
export class BasicUserDetailsComponent implements OnInit {

  basicUser: BasicUser;
  isLoading = false;

  constructor(private route: ActivatedRoute,
    private basicUserService: BasicUserService,
    private location: Location,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getBasicUser();
  }

  getBasicUser(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.basicUserService.getBasicUser(id).subscribe(
      (basicUser: BasicUser) => {
        this.basicUser = basicUser;
        this.isLoading = false;
      },
      (error: string) => {
        this.notificationService.showErrorNotification(error, 'Error');
        this.isLoading = false;
      });

  }

  public onBack(): void {
    this.location.back();
  }

}
