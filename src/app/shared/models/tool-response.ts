import {SimplifiedUserDto} from './simplified-user-dto';

export class ToolResponse {
  id: number;

  name: string;

  toolCategory: string;

  userId: number;

  description: string;

  geoCordX: number;

  geoCordY: number;

  price: number;

  available: boolean;

  assistedTransportation: string;

  images: string[];

  formattedAddress: string;

  pickUpTimeWorkDay: string;

  pickUpTimeWeekend: string;

  simplifiedUserDTO: SimplifiedUserDto;

  availableDays: number[];

  owner: boolean;

  mapMarkerId: number;
}
