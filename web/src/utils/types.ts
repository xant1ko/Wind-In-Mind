export type Speciality = {
  uid?: string
  name: string
  code: string
  created_date?: string
}

export type Organization = {
  uid?: string
  rosminzdrav_uid: string
  name: string
  shortname: string
  abbreviation: string
  created_date?: string

}

export type OpinionForm = {
  uid?: string
  items: string
  created_date?: string
}

export type Station = {
  name: string
  description: string
  is_archived: boolean
  uid?: string
  created_date?: string
  speciality_uids?: string[]
  specialities?: Speciality[]
}
