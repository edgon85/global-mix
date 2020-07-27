export enum Departamento {
  quetzaltenango = 'Quetzaltenango',
  alta_verapaz = 'Alta Verapaz',
  baja_verapaz = 'Baja Verapaz',
  chimaltenango = 'Chimaltenango',
  chiquimula = 'Chiquimula',
  el_progreso = 'El Progreso',
  escuintla = 'Escuintla',
  guatemala = 'Guatemala',
  huehuetenango = 'Huehuetenango',
  izabal = 'Izabal',
  jalapa = 'Jalapa',
  jutiapa = 'Jutiapa',
  peten = 'Petén',
  quichc = 'Quiché',
  Retalhuleu = 'Retalhuleu',
  Sacatepequez = 'Sacatepéquez',
  san_marcos = 'San Marcos',
  santa_rosa = 'Santa Rosa',
  solola = 'Sololá',
  suchitepequez = 'Suchitepéquez',
  totonicapan = 'Totonicapán',
  zacapa = 'Zacapa',
}

export interface UserData {
  categoria: string;
  subcaegoria: string;
  nombre: string;
  telefono: string;
  departamento: string;
  metros3: number;
  emailCotizacion: string;
  email?: string;
  data?: string;
}
