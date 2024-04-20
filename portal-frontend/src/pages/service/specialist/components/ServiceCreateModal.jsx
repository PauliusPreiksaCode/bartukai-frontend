import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getServiceCategories, getAvailableRooms, getAvailableEquipment } from '../../../../services/api';

export const ServiceCreateModal = ({ open, handleClose, onCreateService }) => {

  const [serviceTypeCode, setServiceTypeCode] = useState(2);

  const handleServiceDeliveryMethodChange = (method) => {
    if (method === 'Nuotoliniu būdu') {
      setServiceTypeCode(2);
    } else if (method === 'Savo patalpose') {
      setServiceTypeCode(1);
    } else if (method === 'VC patalpose') {
      setServiceTypeCode(0);
    }
  };

  const [timeReservations, setTimeReservations] = useState([{
    dateFrom: '',
    dateTo: ''
  }]);

  // Function to handle adding new time reservation
  const addTimeReservation = () => {
    setTimeReservations([...timeReservations, { dateFrom: '', dateTo: '' }]);
    setSelectedEquipment(prevEquipment => [...prevEquipment, []]); // Safely add an empty array for new reservation
  };


  // Function to handle removing a time reservation
  const removeTimeReservation = index => {
    const updatedReservations = timeReservations.filter((_, idx) => idx !== index);
    const updatedSelectedEquipment = selectedEquipment.filter((_, idx) => idx !== index);
    setTimeReservations(updatedReservations);
    setSelectedEquipment(updatedSelectedEquipment);
  };


  // Time Reservation Fields Component
  const TimeReservationFields = ({ index }) => {
    
    const [datePickerFromValue, setDatePickerFromValue] =  useState(null);
    const [datePickerToValue, setDatePickerToValue] =  useState(null);
    return (
      <>
        <Grid container spacing={2} alignItems="center" marginTop="20px">
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Pradžios data ir laikas:</Grid>
          <Grid item xs={8}>
            <DateTimePicker
              closeOnSelect={false}
              label="Pasirinkite datą nuo"
              value={timeReservations[index].dateFrom}
              disablePast={true}
              ampm={false}
              onChange={(newValue) => {
                setDatePickerFromValue(newValue);
              }}
              onClose={() =>{
                const updatedReservations = [...timeReservations];
                updatedReservations[index].dateFrom = datePickerFromValue;
                setTimeReservations(updatedReservations);
                if (serviceTypeCode === 0){
                  fetchAvailableRooms(index, datePickerFromValue, timeReservations[index].dateTo);
                  fetchAvailableEquipment(index, datePickerFromValue, timeReservations[index].dateTo);
                }
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </Grid>
  
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Pabaigos data ir laikas:</Grid>
          <Grid item xs={8}>
            <DateTimePicker
              closeOnSelect={false}
              label="Pasirinkite datą iki"
              value={timeReservations[index].dateTo}
              disablePast={true}
              ampm={false}
              onChange={(newValue) => {
                setDatePickerToValue(newValue);
              }}
              onClose={() => {
                const updatedReservations = [...timeReservations];
                updatedReservations[index].dateTo = datePickerToValue;
                setTimeReservations(updatedReservations);
                if (serviceTypeCode === 0){
                  fetchAvailableRooms(index, timeReservations[index].dateFrom, datePickerToValue);
                  fetchAvailableEquipment(index, timeReservations[index].dateFrom, datePickerToValue);
                }
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </Grid>

          {serviceTypeCode === 0 && (
            <>
              <Grid item xs={12}>
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
                  Patalpos pasirinkimas:
                </Grid>
                <FormControl fullWidth>
                  <InputLabel style={{marginTop:'20px'}}>Pasirinkite patalpą</InputLabel>
                  <Select
                    value={timeReservations[index].selectedRoom || ''}
                    onChange={(e) => handleRoomSelection(index, e.target.value)}
                    style={{marginTop:'20px'}}
                  >
                    {availableRooms[index]?.map(room => (
                      <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {availableRooms[index]?.find(room => room.id === timeReservations[index].selectedRoom)?.description &&
              <>
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
                Patalpos aprašymas:
                </Grid>
                <Grid item xs={8}>
                  {
                    availableRooms[index]?.find(room => room.id === timeReservations[index].selectedRoom)?.description
                  }
                </Grid>
              </>
              }
              <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
                Įrangos pasirinkimas:
              </Grid>
              {(selectedEquipment[index] || []).map((_, equipmentIndex) => (
                <EquipmentSelectionField
                  key={equipmentIndex}
                  reservationIndex={index}
                  equipmentIndex={equipmentIndex}
                />
              ))}
              <Button
                variant="contained"
                onClick={() => addEquipmentSelection(index)}
                style={{marginLeft: '15px', marginTop:'10px'}}
                disabled={
                  !timeReservations[index].dateFrom || 
                  !timeReservations[index].dateTo || 
                  (selectedEquipment[index] && selectedEquipment[index].length > 0 && selectedEquipment[index].slice(-1)[0] === null) ||
                  (selectedEquipment[index] && availableEquipment[index] && selectedEquipment[index]?.length === availableEquipment[index]?.length)
                }
              >
                Pridėti įrangą
              </Button>
            </>
          )}
  
          {index !== 0 && (
            <>
              { serviceTypeCode === 0 ?(
                <Button 
                  onClick={() => {removeTimeReservation(index); }} 
                  //style={{ backgroundColor: 'red', color: 'white', marginLeft: '-950px', marginTop:'-370px', marginBottom:'20px'}} + selectedEquipment[index].length * 5
                  style={{ backgroundColor: 'red', color: 'white', marginTop:'100px', marginLeft: '-150px'}}
                  variant="contained"
                >
              Pašalinti Rezervaciją
                </Button>
              ):(
                <Button 
                  onClick={() => removeTimeReservation(index)} 
                  style={{ backgroundColor: 'red', color: 'white', marginLeft: '-250px', marginTop:'-50px'}}
                  variant="contained"
                >
              Pašalinti
                </Button>
              )
              }
            </>
          )}
          {index < timeReservations.length - 1 && (
            <Grid item xs={12}>
              <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
            </Grid>
          )}
        </Grid>
      </>);
  };

  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getServiceCategories();
      setServiceCategories(categories);
    };

    fetchCategories();
  }, []);

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  
  const [availableRooms, setAvailableRooms] = useState({});
  
  const fetchAvailableRooms = async (index) => {
    const reservation = timeReservations[index];

    const formatDateTime = (date) => {
      const dateObj = new Date(date);
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
    
      let formattedDate = new Intl.DateTimeFormat('en-CA', options).format(dateObj);
      formattedDate = formattedDate.replace(/, /g, ' ');
      formattedDate = formattedDate.replace(/24:/g, '00:');

      
    
      return formattedDate;
    };
    
    let dateFrom = reservation.dateFrom;
    let dateTo = reservation.dateTo;
    if(dateFrom && dateTo){
      dateFrom = formatDateTime(new Date(dateFrom));
      dateTo = formatDateTime(new Date(dateTo));
      const rooms = await getAvailableRooms(dateFrom, dateTo);
      setAvailableRooms({ ...availableRooms, [index]: rooms });
    }
    
  };

  const handleRoomSelection = (index, roomId) => {
    const updatedReservations = timeReservations.map((reservation, idx) => {
      if (idx === index) {
        return { ...reservation, selectedRoom: roomId };
      }
      return reservation;
    });
    setTimeReservations(updatedReservations);
  };

  const [availableEquipment, setAvailableEquipment] = useState([]);
  const initialSelectedEquipment = timeReservations.map(() => []);
  const [selectedEquipment, setSelectedEquipment] = useState(initialSelectedEquipment);

  useEffect(() => {
    setSelectedEquipment(prevEquipment => {
      const newEquipment = [...prevEquipment];
      while(newEquipment.length < timeReservations.length) {
        newEquipment.push([]);
      }
      return newEquipment;
    });
  }, [timeReservations]);

  const fetchAvailableEquipment = async (index) => {
    const reservation = timeReservations[index];

    const formatDateTime = (date) => {
      const dateObj = new Date(date);
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
    
      let formattedDate = new Intl.DateTimeFormat('en-CA', options).format(dateObj);
      formattedDate = formattedDate.replace(/, /g, ' ');
      formattedDate = formattedDate.replace(/24:/g, '00:');

      return formattedDate;
    };
    
    let dateFrom = reservation.dateFrom;
    let dateTo = reservation.dateTo;
    if(dateFrom && dateTo){
      dateFrom = formatDateTime(new Date(dateFrom));
      dateTo = formatDateTime(new Date(dateTo));
      const equipmentList = await getAvailableEquipment(dateFrom, dateTo);
      setAvailableEquipment({ ...availableEquipment, [index]: equipmentList });
      
    }
    
  };

  const handleEquipmentSelection = (reservationIndex, equipmentIndex, equipmentId) => {
    setSelectedEquipment(prevEquipment => {
      // Create a new array to ensure the component re-renders
      return prevEquipment.map((equipment, idx) => {
        if (idx === reservationIndex) {
          const updatedEquipment = [...equipment];
          updatedEquipment[equipmentIndex] = equipmentId;
          return updatedEquipment;
        }
        return equipment;
      });
    });
  };

  const addEquipmentSelection = (reservationIndex) => {
    setSelectedEquipment(prevEquipment => prevEquipment.map((equipment, idx) => {
      if (idx === reservationIndex) {
        return equipment.concat(null); // Add null to signify a new unselected equipment
      }
      return equipment;
    }));
  };
  
  const removeEquipmentSelection = (reservationIndex, equipmentIndex) => {
    setSelectedEquipment(prevEquipment => prevEquipment.map((equipment, idx) => {
      if (idx === reservationIndex) {
        return equipment.filter((_, eqIdx) => eqIdx !== equipmentIndex);
      }
      return equipment;
    }));
  };

  const EquipmentSelectionField = ({ reservationIndex, equipmentIndex }) => {
    const currentEquipmentArray = availableEquipment[reservationIndex] || [];
    const selectedValue = (selectedEquipment[reservationIndex] || [])[equipmentIndex];
  
    // Ensure that the selected value is of the correct type
    const valueForSelect = selectedValue != null ? Number(selectedValue) : '';
  
    const timeReservationSelectedEquipment = (selectedEquipment[reservationIndex] || []);
  
    return (
      <Grid container spacing={2} alignItems="center" marginTop="15px" marginLeft="0px">
        <Grid item xs={8} >
          <FormControl fullWidth >
            <InputLabel>Pasirinkite įrangą</InputLabel>
            <Select
              key={`equipment-select-${reservationIndex}-${equipmentIndex}`} // Force update
              value={valueForSelect}
              onChange={(e) => handleEquipmentSelection(reservationIndex, equipmentIndex, e.target.value)}
              displayEmpty
            >
              {currentEquipmentArray.map((eq) => (
                <MenuItem 
                  key={eq.id} 
                  value={eq.id}
                  disabled={timeReservationSelectedEquipment.includes(eq.id) && selectedValue !== eq.id}
                >
                  {eq.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={() => removeEquipmentSelection(reservationIndex, equipmentIndex)}
            variant="contained"
            color="secondary"
          >
            Pašalinti pasirinkimą
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={handleClose} PaperProps={{
        style: {
          width: '1000px', // Fixed width
          maxWidth: 'none', // Override the default maxWidth
        },
      }}>
        <DialogTitle>Paslaugos informacija</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: '',
            link: '',
            addressDescription: '',
            address: '',
            serviceLocation: '',
            serviceCategories: [],
            timeReservations: [],
          }}

          onSubmit={async (values, { setSubmitting }) => {
            const formatDateTime = (date) => {
              const dateObj = new Date(date);
              const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              };
            
              let formattedDate = new Intl.DateTimeFormat('en-CA', options).format(dateObj);
              formattedDate = formattedDate.replace(/, /g, 'T');
              formattedDate = formattedDate.replace(/24:/g, '00:');
              
            
              return formattedDate;
            };

            values.serviceCategories = selectedCategories;
            // Map through time reservations, add equipment IDs, and rename selectedRoom to roomId
            values.timeReservations = timeReservations.map((reservation, index) => ({
              ...reservation,
              dateFrom: formatDateTime(reservation.dateFrom),
              dateTo: formatDateTime(reservation.dateTo),
              roomId: reservation.selectedRoom, // Add renamed roomId
              equipmentIds: selectedEquipment[index].filter(id => id != null), // Add equipment IDs
            })).map(({ selectedRoom, ...rest }) => rest);


            //values.timeReservations = timeReservationsWithEquipment;
            values.serviceLocation = serviceTypeCode;
            values.isAvailable = true;
            
            console.log('Form Values:', values);
            //await createService(values);
            onCreateService.mutateAsync(values); 
            setSubmitting(false);
            handleClose();
          }}

          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required('Reikalingas pavadinimas')
              .min(2, 'Pavadinimas turi susidaryti iš bent 2 simbolių'),
            description: Yup.string()
              .required('Reikalingas aprašymas'),
            price: Yup.number()
              .required('Reikalinga kaina')
              .positive('Kaina privalo būti teigiama'),
            link: serviceTypeCode === 2 ? Yup.string().required('Reikalinga nuoroda') : Yup.string().notRequired(),
            address: serviceTypeCode === 1 ? Yup.string().required('Reikalingas adresas') : Yup.string().notRequired(),
            addressDescription: serviceTypeCode === 1 ? Yup.string().required('Reikalinga papildomas aprašymas') : Yup.string().notRequired(),
          })}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Grid container rowSpacing={2} spacing={1}>
                
                  {/* Name Field */}
                  <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Pavadinimas:</Grid>
                  <Grid item xs={8}>
                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.name && touched.name}
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>

                  {/* Description Field */}
                  <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Aprašymas:</Grid>
                  <Grid item xs={8}>
                    <TextField
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.description && touched.description}
                      helperText={errors.description && touched.description && errors.description}
                    />
                  </Grid>

                  {/* Price Field */}
                  <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Kaina:</Grid>
                  <Grid item xs={8}>
                    <TextField
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.price && touched.price}
                      helperText={errors.price && touched.price && errors.price}
                    />
                  </Grid>

                  {/* Service Categories Dropdown */}
                  <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Kategorijos:</Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <InputLabel id="category-select-label">Pasirinkite kategorijas</InputLabel>
                      <Select
                        labelId="category-select-label"
                        id="category-select"
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        renderValue={(selected) => (
                          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((id) => (
                              <Chip key={id} label={serviceCategories.find(cat => cat.id === id)?.name || id} style={{ margin: 2 }} />
                            ))}
                          </div>
                        )}
                      >
                        {serviceCategories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Paslaugos tiekimo būdas:</Grid>

                  {/* Service Delivery Method Buttons */}
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant={serviceTypeCode === 2 ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => {handleServiceDeliveryMethodChange('Nuotoliniu būdu'); setTimeReservations([{
                        dateFrom: '',
                        dateTo: ''
                      }]); setSelectedEquipment([]); setAvailableRooms({});
                      }}
                    >
                    Nuotoliniu būdu
                    </Button>
                    <Button
                      variant={serviceTypeCode === 1 ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => {handleServiceDeliveryMethodChange('Savo patalpose'); setTimeReservations([{
                        dateFrom: '',
                        dateTo: ''
                      }]); setSelectedEquipment([]); setAvailableRooms({});
                      }}
                    >
                    Savo patalpose
                    </Button>
                    <Button
                      variant={serviceTypeCode === 0 ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => {handleServiceDeliveryMethodChange('VC patalpose'); setTimeReservations([{
                        dateFrom: '',
                        dateTo: ''
                      }]); setSelectedEquipment([]); setAvailableRooms({});
                      }}
                    >
                    VC patalpose
                    </Button>
                  </Grid>
                
                  {/* Nuotoliniu būdu form part */}

                  { serviceTypeCode === 2 &&
                  <>
                    <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Nuoroda:</Grid>
                    <Grid item xs={8}>
                      <TextField
                        name="link"
                        value={values.link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        fullWidth
                        error={errors.link && touched.link}
                        helperText={errors.link && touched.link && errors.link}
                      />
                    </Grid>
                    {/* Time Reservations Section */}
                    {timeReservations.map((_, index) => (
                      <TimeReservationFields key={index} index={index} />
                    ))}
                    <Button variant="contained" onClick={addTimeReservation} style={{marginTop: '50px'}}>Pridėti laiko rezervaciją</Button>
                  </>
                  }

                  {/* Savo patalpose form part */}
                  
                  { serviceTypeCode === 1 &&
                    <>
                      <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Adresas:</Grid>
                      <Grid item xs={8}>
                        <TextField
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={errors.address && touched.address}
                          helperText={errors.address && touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Adreso aprašymas:</Grid>
                      <Grid item xs={8}>
                        <TextField
                          name="addressDescription"
                          value={values.addressDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={errors.addressDescription && touched.addressDescription}
                          helperText={errors.addressDescription && touched.addressDescription && errors.addressDescription}
                        />
                      </Grid>
                      {/* Time Reservations Section */}
                      {timeReservations.map((_, index) => (
                        <TimeReservationFields key={index} index={index} />
                      ))}
                      <Button variant="contained" onClick={addTimeReservation} style={{marginTop: '50px'}}>Pridėti laiko rezervaciją</Button>
                    </>
                  }

                  {/* VC patalpose form part */}

                  { serviceTypeCode === 0 &&
                    <>
                      {/* Time Reservations Section */}
                      {timeReservations.map((_, index) => (
                        <TimeReservationFields key={index} index={index} />
                      ))}
                      <Button variant="contained" onClick={addTimeReservation} style={{marginTop: '50px'}}>Pridėti rezervaciją</Button>
                    </>
                  }


                </Grid>
              </DialogContent>
              <DialogActions>
                <Button 
                  variant="contained" 
                  onClick={handleClose}
                >
                Uždaryti
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="success"
                  disabled={isSubmitting}
                >
                Saugoti
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </LocalizationProvider>
  );
};