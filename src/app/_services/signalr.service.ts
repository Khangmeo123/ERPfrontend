import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private connection: any;
  private proxy: any;
  private signalRServerEndPoint: string = 'https://example.com/api';
  constructor() { }
  public initializeSignalRConnection(): void {
    const signalR = require('@aspnet/signalr');
    this.connection = new signalR.HubConnectionBuilder().withUrl('/chat').build();
    this.proxy = this.connection.createHubProxy('NotificationHub');
    this.connection.on('send', data => {
      console.log(data);
    });
    this.proxy.on('messageReceived', (serverMessage) => this.onMessageReceived(serverMessage));
    this.connection.start()
      .then(() => {
        console.log('Connected to Notification Hub');
        this.broadcastMessage();
      });
  }
  private onMessageReceived(serverMessage: string) {
    console.log('New message received from Server: ' + serverMessage);
  }
  private broadcastMessage(): void {
    this.proxy.invoke('NotificationService', 'text message')
      .catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });
  }
}
