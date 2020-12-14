import React, { useState } from 'react';
import axiosInstance from 'src/axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
//MaterialUI
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Card,
  FormHelperText,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import GoogleSocialAuth from 'src/components/GoogleSocialAuth';
import { Formik } from "formik";
import * as Yup from 'yup';


const logo = '/static/reg.png';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sign: {
    height: 50
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  
}));

const theme = createMuiTheme({
	typography: {
	  h3: {
		fontSize: 40,
	  },
	  h3: {
		fontWeight: 500,
	  },
	  
	},
  });
export default function SignUp() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`user/create/`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
			})
			.then((res) => {
				history.push('/login');
				console.log(res);
				console.log(res.data);
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
      <img src={logo}  alt="logo"/>
        <Card className={classes.root}>
			<ThemeProvider theme={theme}>
        <Typography  variant="h3" align="center">
          Sign up
        </Typography>
        <Typography component="h1" variant="h5 " align="center">
          7 Days Free Trial
        </Typography>
        </ThemeProvider>
        <Formik   
        
          validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          username: Yup.string().max(255).required('username is required')
        })}>
             {({
        errors,
        handleBlur,
        isSubmitting,
        touched,
        values
      }) => (
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              onBlur={handleBlur}
								variant="outlined"
								required
								fullWidth
                                size="small"
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<p style={{ textAlign:"center"}} mb={10}>Or</p>
          <GoogleSocialAuth />
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
        )}
        </Formik>
        </Card>
			</div>
		</Container>
	);
}
