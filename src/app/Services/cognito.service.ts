import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk';

export interface IUser {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  code: string;
  name: string;
  username: string;
}

export interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
    AWS.config.update({
      region: environment.region,
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        given_name: user.name,
        email: user.email,
      },
      autoSignIn: {
        enabled: true,
      },
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.username, user.code);
  }

  // public addUserToGroup(user: IUser): Promise<any> {
  //   const params = {
  //     GroupName: environment.cognito.authUsersGroup,
  //     UserPoolId: environment.cognito.userPoolId,
  //     Username: user.username,
  //   };
  //   return this.cognitoIdp.adminAddUserToGroup(params).promise();
  // }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.username, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public async isAuthenticated(): Promise<boolean> {
    return (await Auth.currentUserInfo()) ? true : false;
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public getJwtTokens(): Promise<string | void> {
    return Auth.currentSession()
      .then((session) => {
        return session.getAccessToken().getJwtToken();
      })
      .catch((e) => {
        console.error('Error getting tokens..');
        console.error(e);
      });
  }

  public getUserCredentials(): Promise<any> {
    return Auth.currentUserCredentials()
      .then((credentials) => {
        return credentials;
      })
      .catch((err) => {
        console.error('Error getting user credentials..');
        console.error(err);
      });
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public resendVerification(user: IUser): Promise<any> {
    return Auth.resendSignUp(user.username);
  }
}
