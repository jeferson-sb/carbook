interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  is_admin?: boolean;
}

export class User implements AggregateRoot<string> {
  private _id: string;

  private _name: string;

  private _email: string;

  private _password: string;

  private _driver_license: string;

  private _is_admin: boolean;

  constructor({
    id,
    name,
    email,
    password,
    driver_license,
    is_admin,
  }: UserData) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._driver_license = driver_license;
    this._is_admin = is_admin;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get driver_license(): string {
    return this._driver_license;
  }

  snapshot(): UserData {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
      driver_license: this._driver_license,
      is_admin: this._is_admin,
    };
  }
}
