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



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        AT-Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const logo = '/static/logo.svg';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function SignIn() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/');
				//console.log(res);
				//console.log(res.data);
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
      <img src={logo} style={{ height: 83, width: 56 }}
              alt="website logo"/>
          <Card className={classes.root}>
			  <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h3" align="center" mt={10} >
          Sign in
        </Typography>
		</ThemeProvider>
        <Formik   
        
          validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}>
             {({
        errors,
        handleBlur,
        isSubmitting,
        touched,
        values
      }) => (
        
				<form className={classes.form} noValidate>
					<TextField
            error={Boolean(touched.email && errors.email)}
            variant="outlined"
            helperText={touched.email && errors.email}
            margin="normal"
            onBlur={handleBlur}
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
            error={Boolean(touched.password && errors.password)}
            variant="outlined"
            helperText={touched.password && errors.password}
						onBlur={handleBlur}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<GoogleSocialAuth />
					<Grid container>
						<Grid item xs>
							<Link href="/password_reset" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register" variant="body2">
								{"Don't have an account? Sign Up"}
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
