abstract class RoomCleaning {
  cleanRoom(): void {
    this.enterRoom();
    this.collectTrash();
    this.specificCleaning();
    this.disinfectSurfaces();
    this.exitRoom();

    console.log('All is clean now\n');
  }

  private enterRoom(): void {
    console.log('Entering the room...');
  }

  private collectTrash(): void {
    console.log('Collecting trash...');
  }

  private disinfectSurfaces(): void {
    console.log('Desinfecting Surfaces...');
  }

  private exitRoom(): void {
    console.log('Exiting the room, marking it as clean.');
  }

  protected abstract specificCleaning(): void;
}

export class HotelRoomCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Making beds and restocking bathroom supplies.');
  }
}

export class ConferenceRoomCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Cleaning tables and  organizing chairs');
  }
}

export class OfficeCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Cleaning desks and organizing documents.');
  }
}

function main(): void {
  console.log('Cleaning a hotel room:');
  const hotelRoom = new HotelRoomCleaning();
  hotelRoom.cleanRoom();

  console.log('Cleaning a conference room');
  const conferenceRoom = new ConferenceRoomCleaning();
  conferenceRoom.cleanRoom();

  console.log('Cleaning an office:');
  const office = new OfficeCleaning();
  office.cleanRoom();
}

main();
