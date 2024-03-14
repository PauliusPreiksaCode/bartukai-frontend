import * as yup from 'yup';

export const clientRegisterTemplate = yup.object({
  UserName: yup
    .string()
    .required('Reikalingas vartotojo vardas'),
  Password: yup
    .string()
    .required('Reikalingas slaptažodis')
    .min(8, 'Būtina bent 8 simboliai')
    .matches(/[A-Z]/, 'Būtina didžioji raidė')
    .matches(/[0-9]/, 'Būtinas skaičius')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Būtinas specialus simbolis'),
  FirstName: yup
    .string()
    .required('Reikalingas vardas'),
  LastName: yup
    .string()
    .required('Reikalinga pavardė'),
  City: yup
    .string()
    .required('Reikalingas miestas'),
  PhoneNumber: yup
    .string()
    .required('Reikalingas telefono numeris'),
  Email: yup
    .string()
    .required('Reikalingas elektroninis paštas')
    .email('Netinkamas el. pašto adresas'),
});