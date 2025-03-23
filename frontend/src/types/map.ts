export interface GoogleGeoCodingResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address?: string;  
    place_id?: string;         
  }[];
  status: 'OK' | 'ZERO_RESULTS';
}
