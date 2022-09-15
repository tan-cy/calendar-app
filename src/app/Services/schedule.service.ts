import { Injectable } from '@angular/core';
import { EventToSchedule } from '../Constants/ScheduleEvents';
import { CognitoService } from './cognito.service';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  tokens?: string | void;
  id?: string | void;
  docClient?: AWS.DynamoDB.DocumentClient;

  constructor(private cognitoService: CognitoService) {
    this.init();
  }

  private async init(): Promise<void> {
    this.tokens = await this.cognitoService.getJwtTokens();
    if (this.tokens) {
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: environment.cognito.identityPoolId,
        Logins: {
          'cognito-idp.us-east-2.amazonaws.com/us-east-2_AuHYUpLm0':
            this.tokens,
        },
      });

      this.id = await this.cognitoService.getCredentials();
      console.log('Cognito Identity ID ' + this.id);

      // Instantiate aws sdk service objects now that the credentials have been updated
      this.docClient = new AWS.DynamoDB.DocumentClient({
        region: AWS.config.region,
      });
    }
  }

  private packageData(eventToSchedule: EventToSchedule): PutItemInput {
    return {
      TableName: environment.dynamoDb.tableName,
      Item: {
        'cognito-user-id': { S: this.id ? this.id : '' },
        datetime: { N: `${eventToSchedule.id}` },
        title: { S: eventToSchedule.title },
        date: { S: eventToSchedule.date },
        time: { S: eventToSchedule.time },
        location: { S: eventToSchedule.location },
        description: { S: eventToSchedule.description },
        timezoneOffset: { N: `${eventToSchedule.timezoneOffset}` },
      },
    };
  }
  public async submitEvent(eventToSchedule: EventToSchedule): Promise<boolean> {
    var params = this.packageData(eventToSchedule);
    if (this.docClient) {
      this.docClient.put(params, (err, data) => {
        if (err) {
          console.error(err);
          return false;
        } else {
          console.log(data);
          return true;
        }
      });
    }
    return false;
  }
}
