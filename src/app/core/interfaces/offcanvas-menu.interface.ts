export interface MenuState {
  notification: boolean;
  units: boolean;
  theme: boolean;
  icons: boolean;
  language: boolean;
  about: boolean;
  [key: string]: boolean;
}
