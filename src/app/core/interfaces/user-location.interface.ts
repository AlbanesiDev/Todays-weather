export interface UserLocationInterface  {
  ip:            string;
  country_code2: string;
  country_code3: string;
  country_name:  string;
  state_prov:    string;
  state_code:    string;
  district:      string;
  city:          string;
  zipcode:       string;
  latitude:      string;
  longitude:     string;
  languages:     string;
  time_zone:     TimeZone;
}

export interface TimeZone {
  name:              string;
  offset:            number;
  offset_with_dst:   number;
  current_time:      string;
  current_time_unix: number;
  is_dst:            boolean;
  dst_savings:       number;
}
