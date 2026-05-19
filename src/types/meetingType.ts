export interface Profile {
  id: number;
  kakaoId?: string;
  gender: 'MALE' | 'FEMALE';
  faceType: string;
  birthYear: number;
  hobby: string;
  dateStyle: string;
  createdAt?: string;
}

export interface ProfileRegisterPayload {
  gender: 'MALE' | 'FEMALE';
  faceType: string;
  birthYear: number;
  hobby: string;
  dateStyle: string;
  contact: string;
}

export interface CardOpenResponse {
  contact: string;
  alreadyViewed: boolean;
}

export interface OpenCountResponse {
  availableOpenCount: number;
  bonusOpenCount: number;
  cooldownRemainingSeconds: number;
}

export interface ProfileCountResponse {
  total: number;
  male: number;
  female: number;
}
