import { jest } from '@jest/globals';
import { ConferenceRoomCleaning, HotelRoomCleaning, OfficeCleaning } from './template-method';

describe('RoomCleaning Template Method Pattern', () => {
  const consoleSpy = jest.spyOn(console, 'log');

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  test('HotelRoomCleaning follows correct cleaning sequence', () => {
    const hotelRoom = new HotelRoomCleaning();
    hotelRoom.cleanRoom();

    expect(consoleSpy.mock.calls).toEqual([
      ['Entering the room...'],
      ['Collecting trash...'],
      ['Making beds and restocking bathroom supplies.'],
      ['Desinfecting Surfaces...'],
      ['Exiting the room, marking it as clean.'],
      ['All is clean now\n'],
    ]);
  });

  test('ConferenceRoomCleaning follows correct cleaning sequence', () => {
    const conferenceRoom = new ConferenceRoomCleaning();
    conferenceRoom.cleanRoom();

    expect(consoleSpy.mock.calls).toEqual([
      ['Entering the room...'],
      ['Collecting trash...'],
      ['Cleaning tables and  organizing chairs'],
      ['Desinfecting Surfaces...'],
      ['Exiting the room, marking it as clean.'],
      ['All is clean now\n'],
    ]);
  });

  test('OfficeCleaning follows correct cleaning sequence', () => {
    const office = new OfficeCleaning();
    office.cleanRoom();

    expect(consoleSpy.mock.calls).toEqual([
      ['Entering the room...'],
      ['Collecting trash...'],
      ['Cleaning desks and organizing documents.'],
      ['Desinfecting Surfaces...'],
      ['Exiting the room, marking it as clean.'],
      ['All is clean now\n'],
    ]);
  });
});
