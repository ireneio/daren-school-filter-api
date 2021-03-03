export namespace SqlSchema {
  interface User {
    id: number,
    email: string,
    password: string,
    created_on: string,
    last_updated: string,
    last_login: string,
    access_token: string
  }
  export interface UserInput extends User {

  }
  export interface Institution {
    id: number | bigint,
    name: string,
    level: string,
    region: string,
    city: string,
    programs: Array<any>,
    url: string,
    memo: string,
    rank_qs: number,
    rank_usn: number,
    rank_local: number,
    suggest_major: Array<any>,
    created_at: number,
    last_updated: number,
  }
}
