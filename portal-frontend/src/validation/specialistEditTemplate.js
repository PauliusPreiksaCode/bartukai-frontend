import * as yup from 'yup';

export const specialistEditTemplate = yup.object({
  FirstName: yup.string().required('Reikalingas vardas'),
  LastName: yup.string().required('Reikalinga pavardė'),
  City: yup.string().required('Reikalingas miestas'),
  PhoneNumber: yup.string().required('Reikalingas telefono numeris'),
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
