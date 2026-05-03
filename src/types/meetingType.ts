export interface Profile {
  id: number;
  gender: '남' | '여';
  faceType: string;
  birthYear: number;
  hobby: string;
  desiredDate: string;
  selfAppeal?: string;
  remainPickCount: number;
}

export interface ProfileRegisterPayload {
  gender: '남' | '여';
  faceType: string;
  birthYear: number;
  hobby: string;
  desiredDate: string;
  selfAppeal?: string;
  contact: string;
  remainPickCount: number;
}

export interface CardOpenResponse {
  contact: string;
  remainOpenCount: number;
}
