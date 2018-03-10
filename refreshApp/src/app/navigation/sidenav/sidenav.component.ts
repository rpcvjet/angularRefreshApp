import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav= new EventEmitter<void>()
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    })
  }

  onClose(){
    this.closeSidenav.emit();
}

onLogout(){
  this.onClose();  
  this.authService.logout();
}
  
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

//1. inject the authservice
//2. create variable from authservice stating if user
//is authenticated or not
//3. create a subscription from rxjs
//4 subscribe to the authservice
//5. destoy it so no memeory leaks.