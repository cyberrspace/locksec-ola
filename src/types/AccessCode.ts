// types/accesscode.ts

export interface AccessCode {
  _id: string;
  userId: string;
  code: string;
  victorType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numOfPeople: number;
  withVehicle: boolean;
  plateNum?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
