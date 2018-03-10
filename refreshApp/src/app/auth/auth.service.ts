//you can inject services into services...like routing via an Injectable
import { Injectable } from '@angular/core';
import  { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    //1
    private user: User;

    constructor(private router: Router) {

    }


    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString();
        };
        this.authSuccessfully();
    }

    login(authData: AuthData) {

        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString();
        };
        this.authSuccessfully()
        
    }

    logout(){
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login'])
        
        
    }

    // This getUser method gets access to the private user @1. It's private so it's not accessable to the outside.
    //since we return an object and therefore a reference type, other parts of the app could actually change the object
    //and therefore change the object in the service. So in order to prevent this, return a NEW object and use the 
    //spread operator to spread the properties(email. id) to the new object (i.e. - > ...this.user ).
    
    //This will break the reference and return a brand new user that has the saem properites but a different object. 
    getUser() {
        //bad -> return this.user
        return {...this.user};
    }
    
    isAuth() {
        return this.user != null;
    }

    private authSuccessfully(){
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }
}