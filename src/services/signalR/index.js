// import {HubConnectionBuilder, LogLevel} from '@aspnet/signalr';
// // import React from 'react';
// const signalR = require('@microsoft/signalr');
// //
// // export const connectionSignalR = (endPoint, token) => {
// //   return new Promise(async (resolve, reject) => {
// //     const _hubConnection = new signalR.HubConnectionBuilder()
// //       .withUrl(
// //         `http://devapi-aepistle.azurewebsites.net/${endPoint}?access_token=${token}`,
// //       )
// //       .configureLogging(signalR.LogLevel.Trace)
// //       .withAutomaticReconnect()
// //       .build();
// //     await _hubConnection.start();
// //
// //     const start = async () => {
// //       console.log('connection starting - - -  > ');
// //       try {
// //         if(_hubConnection.state !== signalR.HubConnectionState.Connected) {
// //           await _hubConnection.start();
// //         }
// //         console.log('[Connection state]: ', _hubConnection.state);
// //         console.assert(
// //           '[Connected]: ',
// //           _hubConnection.state === signalR.HubConnectionState.Connected,
// //         );
// //         resolve(_hubConnection);
// //       } catch (error) {
// //         console.log('[Connection Error]: ', error);
// //         console.assert(
// //           '[Disconnected]: ',
// //           _hubConnection.state === signalR.HubConnectionState.Disconnected,
// //         );
// //         setTimeout(() => {
// //           console.log('starting connection again');
// //           start();
// //         }, 1000);
// //       }
// //
// //       _hubConnection.onclose(error => reject('Connection Error: ', error));
// //     };
// //     start();
// //   });
// // };

// //
// var connection_count = 0;
// export const connectionSignalR = async (endPoint, token) => {
//   try {
//     return new Promise((resolve, reject) => {
//       let _hubConnection = new HubConnectionBuilder()
//         .withUrl(
//           `http://devapi-aepistle.azurewebsites.net/${endPoint}?access_token=${token}`,
//         )
//         .configureLogging(LogLevel.None)
//         .build();
//       const startConnection = async () => {
//         await _hubConnection.start();
//         console.log('[SignalR Connection State]:', _hubConnection.state);
//         if (_hubConnection.state === 1) {
//           connection_count = 0;
//           resolve(_hubConnection);
//         } else {
//           console.log('[Error with connection signalR]:   ');
//           if (connection_count < 3) {
//             connection_count = connection_count + 1;
//             console.log('[Trying to connection again]:');
//             startConnection();
//           } else {
//             connection_count = 0;
//             reject('Error in connection');
//           }
//         }
//       };

//       startConnection();
//     });
//   } catch (error) {
//     console.log('[Connection Error]', error);
//   }
// };

// // var connection_count = 0;
// // export const connectionSignalR = async (
// //   endPoint,
// //   token,
// //   cbSuccess,
// //   cbFailure,
// // ) => {
// //   let _hubConnection = new HubConnectionBuilder()
// //     .withUrl(
// //       `http://devapi-aepistle.azurewebsites.net/${endPoint}?access_token=${token}`,
// //     )
// //     .configureLogging(LogLevel.Debug)
// //     .build();
// //   _hubConnection.start().done(() => {
// //     console.log('[SignalR Connection State]:', _hubConnection.state);
// //     if (_hubConnection.state) {
// //       connection_count = 0;
// //       cbSuccess(_hubConnection);
// //     } else {
// //       console.log('[Error with connection signalR]:   ');
// //       if (connection_count < 3) {
// //         connection_count = connection_count + 1;
// //         console.log('[Trying to connection again]:');
// //         connectionSignalR(endPoint, token, cbSuccess, cbFailure);
// //       } else {
// //         connection_count = 0;
// //         cbFailure();
// //       }
// //     }
// //   });
// // .catch(a => {
// //   console.log('[Error with connection signalR]:   ', a);
// //   if (connection_count < 3) {
// //     connection_count = connection_count + 1;
// //     console.log('[Trying to connection again]:');
// //     connectionSignalR(endPoint, token, cbSuccess, cbFailure);
// //   } else {
// //     connection_count = 0;
// //     cbFailure();
// //   }
// // });
// // };
