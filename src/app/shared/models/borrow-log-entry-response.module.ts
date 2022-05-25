export class BorrowLogEntryResponse {
  ownerId: number;
  toolName: string;
  toolId: number;
  ownerName: string;
  ownerLastName: string;
  borrowedAtDate: string;
  returnedAtDate: string;
  toolPrice: number;
  pricePaid: number;
  toolPlace: string;
  ownerGeoCordX: number;
  ownerGeoCordY: number;
}
