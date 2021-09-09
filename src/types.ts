export interface IUser {
  id: string
  name: string
  address: string
  dob: string
  description?: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface IUserList {
  cursor?: string
  users: IUser[]
}

export interface ICoords {
  lat: number
  lon: number
}
  
export interface IUserIdQueryArgs {
  id: string;
}

export interface IUserListQueryArgs {
  cursor?: string;
  limit?: number;
  filter?: string;
}

export interface IAddressQueryArgs {
  address: string;
}

export interface ICreateUserArgs {
  input: {
    name: string
    dob: string
    address: string
    description?: string
    imageUrl?: string
  }
}

export interface IUpdateUserArgs {
  input: {
    id: string
    name?: string
    dob?: string
    address?: string
    description?: string
    imageUrl?: string
  }
}