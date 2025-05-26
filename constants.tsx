export const BookingStatusConstants = {
    RESERVED:'RESERVED',
    RESERVEDBYSA:"RESERVED by SA",
    SERVICESTARTED:"SERVICE STARTED",
    CANCELLED:"CANCELLED",
    SERVICEPROVIDED:"SERVICE PROVIDED",
    BOOKINGFINISHED:"BOOKING FINISHED"
}


export const locationsMap: Record<string, string> = {
  "Ukraine, Kyiv": "loc-001",
  "Germany, Berlin": "loc-002",
  "France, Paris": "loc-003",
  "Italy, Rome": "loc-004",
  "Japan, Tokyo": "loc-005",
  "Canada, Toronto": "loc-006",
  "UK, London": "loc-007",
  "USA, Los Angeles": "loc-008",
  "USA, New York": "loc-009",
  "Australia, Sydney": "loc-010",
  "India, Mumbai": "loc-011",
  "Spain, Barcelona": "loc-012",
  "UAE, Dubai": "loc-013",
};

export const BASE_URL = "https://backend-carrent.onrender.com"
export const BASE_URL_LOCAL = "http://localhost:5000"
export const BASE_URL_REPORTS = "https://q2zkluiomb.execute-api.ap-northeast-2.amazonaws.com/dev"

