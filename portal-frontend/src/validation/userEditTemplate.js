import * as yup from 'yup';

export const userEditTemplate = yup.object({
  FirstName: yup.string().required('Reikalingas vardas'),
  LastName: yup.string().required('Reikalinga pavardė'),
  City: yup.string().required('Reikalingas miestas'),
  PhoneNumber: yup.string().required('Reikalingas telefono numeris'),
});
