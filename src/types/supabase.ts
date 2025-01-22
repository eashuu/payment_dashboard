export interface Database {
  public: {
    Tables: {
      Participants: {
        Row: {
          id: number
          ID_no: string | null
          Name: string | null
          Email: string
          DOB: string | null
          Degree: string | null
          Course: string | null
          Year: string | null
          Phone: string | null
          Gender: string | null
          College: string | null
          Event_1: string | null
          Event_2: string | null
          WorkShop: string | null
          Payment: string | null
          EW: string | null
          Pass: string | null
          Concert: string | null
          Accommodation: string | null
          AccommodationDays: string | null
          AccommodationCost: string | null
          Reference: string | null
          Transaction_ID: string | null
        }
        Insert: {
          id?: number
          ID_no?: string | null
          Name?: string | null
          Email: string
          DOB?: string | null
          Degree?: string | null
          Course?: string | null
          Year?: string | null
          Phone?: string | null
          Gender?: string | null
          College?: string | null
          Event_1?: string | null
          Event_2?: string | null
          WorkShop?: string | null
          Payment?: string | null
          EW?: string | null
          Pass?: string | null
          Concert?: string | null
          Accommodation?: string | null
          AccommodationDays?: string | null
          AccommodationCost?: string | null
          Reference?: string | null
          Transaction_ID?: string | null
        }
        Update: {
          id?: number
          ID_no?: string | null
          Name?: string | null
          Email?: string
          DOB?: string | null
          Degree?: string | null
          Course?: string | null
          Year?: string | null
          Phone?: string | null
          Gender?: string | null
          College?: string | null
          Event_1?: string | null
          Event_2?: string | null
          WorkShop?: string | null
          Payment?: string | null
          EW?: string | null
          Pass?: string | null
          Concert?: string | null
          Accommodation?: string | null
          AccommodationDays?: string | null
          AccommodationCost?: string | null
          Reference?: string | null
          Transaction_ID?: string | null
        }
      }
    }
  }
}
