import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useStylesHome } from '../../Style/styleHome';

export default function Home() {
  const classes = useStylesHome();

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Мои контакты
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            В этом приложении можно хранить, редактировать, добавлять, удалять,
            сортировать по столбцам свои контакты. Можно добавлять фото контактам.
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Также есть возможность редактирования своего профиля, добавление своего фото.
            Все контакты в базе разделяются по пользователю, так что каждый пользователь может
            взаимодействовать только со своими контактами.
          </Typography>
        </Container>
      </div>
    </>
  );
}
