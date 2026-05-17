export interface Profile {
  id: number;
  gender: 'MALE' | 'FEMALE';
  faceType: string;
  birthYear: number;
  hobby: string;
  dateStyle: string;
  selfAppeal?: string;
}

export interface ProfileRegisterPayload {
  gender: 'MALE' | 'FEMALE';
  faceType: string;
  birthYear: number;
  hobby: string;
  dateStyle: string;
  selfAppeal?: string;
  contact: string;
}

export interface CardOpenResponse {
  contact: string;
}
