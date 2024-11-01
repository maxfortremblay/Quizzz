const io = require('socket.io-client');
const WebSocketService = require('../public/js/WebSocketService');

jest.mock('socket.io-client');

describe('WebSocketService', () => {
  let socket;
  let webSocketService;

  beforeEach(() => {
    socket = {
      emit: jest.fn(),
      on: jest.fn()
    };
    io.mockReturnValue(socket);
    webSocketService = new WebSocketService();
  });

  test('should emit events', () => {
    const event = 'test-event';
    const data = { key: 'value' };

    webSocketService.emit(event, data);

    expect(socket.emit).toHaveBeenCalledWith(event, data);
  });

  test('should listen to events', () => {
    const event = 'test-event';
    const callback = jest.fn();

    webSocketService.on(event, callback);

    expect(socket.on).toHaveBeenCalledWith(event, callback);
  });
});
describe('WebSocketService', () => {
  let socket;
  let webSocketService;

  beforeEach(() => {
    socket = {