import * as yup from 'yup';

export const specialistRegisterTemplate = yup.object({
  UserName: yup.string().required('Reikalingas naudotojo vardas'),
  Password: yup
    .string()
    .required('Reikalingas slaptažodis')
    .min(8, 'Būtina bent 8 simboliai')
    .matches(/[A-Z]/, 'Būtina didžioji raidė')
    .matches(/\d/, 'Būtinas skaičius')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Būtinas specialus simbolis'),
  FirstName: yup.string().required('Reikalingas vardas'),
  LastName: yup.string().required('Reikalinga pavardė'),
  City: yup.string().required('Reikalingas miestas'),
  PhoneNumber: yup.string().required('Reikalingas telefono numeris'),
  Email: yup.string().required('Reikalingas elektroninis paštas').email('Netinkamas el. pašto adresas'),
  PhotoFile: yup
    .mixed()
    .test('fileType', 'Galimi tipai: PNG, JPG, arba JPEG', (value) =>
      !value || ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type)
    )
    .test('fileSize', 'Maksimalus failo dydis: 2MB', (value) =>
      !value || value.size <= 2000000
    )
    .test(
      'imageDimensions',
      'Nuotraukos matmenys turi būti 1:1 ir neviršyti 2000x2000 pikselių',
      async (value) => {
        if (!value) return true;

        try {
          const imageBitmap = await createImageBitmap(value);

          const isSquare = imageBitmap.width === imageBitmap.height;
          const isWithinLimits =
          imageBitmap.width <= 2000 && imageBitmap.height <= 2000;

          return isSquare && isWithinLimits;
        } catch (error) {
          return false;
        }
      }
    ),
  Description: yup.string().required('Reikalingas aprašymas'),
  Education: yup.string().required('Reikalingas išsimokslinimas'),
  Experience: yup.string().required('Reikalinga patirtis'),
});
