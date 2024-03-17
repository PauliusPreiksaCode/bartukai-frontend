import * as yup from 'yup';

export const createRoomTemplateValidation = yup.object({
  name: yup.string()
    .required('Reikalingas pavadinimas')
    .min(2, 'Pavadinimas privalo būti bent dviejų simbolių ilgio'),
  type: yup.string()
    .required('Reikalingas tipas'),
  floor: yup.number()
    .required('Reikalingas aukštas')
    .positive('Aukštas privalo būti teigiamas skaičius')
    .integer('Aukštas privalo būti teigiamas'),
  accommodates: yup.number()
    .required('Reikalingas talpinamas žmonių skaičius')
    .positive('Talpinamas žmonių skaičius privalo būti teigiamas')
    .integer('Reikalingas talpinamas žmonių skaičius'),
  description: yup.string()
    .required('Reikalingas aprašymas')
});