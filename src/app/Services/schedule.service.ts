import { Injectable } from '@angular/core';
import { EventToSchedule } from '../Constants/ScheduleEvents';
import { CognitoService } from './cognito.service';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  tokens?: string | void;
  id?: string;
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

      // Instantiate aws sdk service objects now that the credentials have been updated
      await this.cognitoService.getUserCredentials().then((credentials) => {
        this.docClient = new AWS.DynamoDB.DocumentClient({
          region: AWS.config.region,
          credentials: credentials,
        });
        this.id = credentials.identityId;
      });
    }
  }

  private packageData(
    eventToSchedule: EventToSchedule
  ): AWS.DynamoDB.DocumentClient.PutItemInput {
    return {
      TableName: environment.dynamoDb.tableName,
      Item: {
        user: this.id,
        datetime: eventToSchedule.id,
        title: eventToSchedule.title,
        date: eventToSchedule.date,
        time: eventToSchedule.time,
        location: eventToSchedule.location,
        description: eventToSchedule.description,
        timezoneOffset: eventToSchedule.timezoneOffset,
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

  getSortKey() {
    var params = {
      TableName: environment.dynamoDb.tableName,
      IndexName: 'HashKey',
      KeyConditionExpression: 'HashKey = :hkey and user = :user',
      ExpressionAttributeValues: {
        ':hkey': 'key',
        ':user': this.id,
      },
    };
    if (this.docClient) {
      this.docClient.query(params, function (err, data) {
        if (err) {
          console.log(err);
        }
        return data;
      });
    }
  }

  private getParamsForDate(dateOfEvent: string) {
    const params = {
      TableName: environment.dynamoDb.tableName,
      IndexName: 'datetime',
      KeyConditionExpression: '#user = :user and #date = :date',
      ExpressionAttributeNames: {
        '#user': 'user',
        '#date': 'date',
      },
      ExpressionAttributeValues: {
        ':user': this.id,
        ':date': dateOfEvent,
        ':datetime': this.getSortKey(),
      },
    };

    return params;
  }

  public async getEvent(
    dateOfEvent: string
  ): Promise<boolean | AWS.DynamoDB.DocumentClient.GetItemOutput> {
    if (this.docClient) {
      const response = await this.docClient
        .query(this.getParamsForDate(dateOfEvent))
        .promise();

      return response;
    }

    return false;
  }
}
