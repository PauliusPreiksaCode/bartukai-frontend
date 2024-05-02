import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Card
} from '@mui/material';
import styles from './UserProfile.module.css';
import { UserContext } from '../../services/authProvider';
import SpecialistProfilePanel from './specialist/SpecialistProfilePanel';
import AdminProfilePanel from './admin/AdminProfilePanel';
import UserProfilePanel from './user/UserProfilePanel';
import { useGetUser } from '../../hooks/user';
import { SpecialistProfileEditModal } from './specialist/SpecialistProfileEditModal';
import { UserProfileEditModal } from './user/UserProfileEditModal';
import { ProfileRemoveModal } from './components/ProfileRemoveModal';

const Gender = {
  0: 'Vyras',
  1: 'Moteris',
  2: 'Kita'
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showProfileRemoveModal, setShowProfileRemoveModal] = useState(false);

  const userContext = useContext(UserContext);


  const { data, isLoading, isFetching} = useGetUser();
  useEffect(() => {
    setUser(data || null);
  }, [data]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleProfileEditClick = () => {
    setShowProfileEditModal(true);
  };

  const handleProfileEditModalClose = () => {
    setShowProfileEditModal(false);
  };

  const handleProfileRemoveClick = () => {
    setShowProfileRemoveModal(true);
  };

  const handleProfileRemoveModalClose = () => {
    setShowProfileRemoveModal(false);
  };


  return (
    <>
      <div>
        <h1>
          <b>Naudotojo paskyros informacija:</b>
        </h1>
      </div>
      {user &&
        <>
            <Button variant="contained" onClick={handleBackClick}>Atgal</Button>
            <Button variant="contained" color="warning" onClick={handleProfileEditClick}>Redaguoti paskyrą</Button>
            <Button variant="contained" color="error" onClick={handleProfileRemoveClick}>Trinti paskyrą</Button>
            {showProfileEditModal && userContext.user?.decodedJwt?.role === '2' && (
                <SpecialistProfileEditModal
                open={showProfileEditModal}
                handleClose={handleProfileEditModalClose}
                user={user}
                />
            )}
            {showProfileEditModal && userContext.user?.decodedJwt?.role !== '2' && (
                <UserProfileEditModal
                open={showProfileEditModal}
                handleClose={handleProfileEditModalClose}
                user={user}
                userContext={userContext}
                />
            )}
            {showProfileRemoveModal && (
                <ProfileRemoveModal
                open={showProfileRemoveModal}
                handleClose={handleProfileRemoveModalClose}
                user={user}
                />
            )}
            <Card className={styles.profileCard}>
                <Grid container rowSpacing={2} spacing={1}>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Vardas:
                </Grid>
                <Grid item xs={8}>
                    {user.firstName}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Pavardė:
                </Grid>
                <Grid item xs={8}>
                    {user.lastName}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Vartotojo vardas:
                </Grid>
                <Grid item xs={8}>
                    {user.userName}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                El. pašto adresas:
                </Grid>
                <Grid item xs={8}>
                    {user.email}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Miestas:
                </Grid>
                <Grid item xs={8}>
                    {user.city}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Gimimo data:
                </Grid>
                <Grid item xs={8}>
                    {user.birthDate.slice(0, 10)}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Lytis:
                </Grid>
                <Grid item xs={8}>
                    {Gender[user.gender]}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Telefono numeris:
                </Grid>
                <Grid item xs={8}>
                    {user.phoneNumber}
                </Grid>
                <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                Paskyros sukūrimo data:
                </Grid>
                <Grid item xs={8}>
                    {user.creationTime.slice(0, 10)}
                </Grid>
                </Grid>
            </Card>
            {userContext.user?.decodedJwt?.role === '0' && (
                <AdminProfilePanel user={user} />
            )}
            {userContext.user?.decodedJwt?.role === '1' && (
                <UserProfilePanel user={user} />
            )}
            {userContext.user?.decodedJwt?.role === '2' && (
                <SpecialistProfilePanel user={user} />
            )}
        </>
      }
    </>
  );
};

export default UserProfile;