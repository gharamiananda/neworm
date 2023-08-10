/* eslint-disable react/self-closing-comp */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { mixed, number, object, string } from 'yup';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  LinkTab,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  Tooltip,
  Grid,
  CircularProgress,
} from '@mui/material';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FieldArray, Form, Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import AddressInputGroup from '../../../Components/Input/AddressInputGroup';
import GlobalProfileUpload from '../../../Components/Common/GlobalProfileUpload';
import AddEmpStepOne from './AddEmpStepOne';
import EmpLeftPart from './EmpLeftPart';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && [children]}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
TabPanel.defaultProps = { children: null };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function EmpAdd() {
  const [currentTab, setCurrentTab] = useState(0);

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(null);

  //   const {

  //     productInitialData,
  //   } = productStaticData;
  const params = null;
  return (
    <>
      <Box className="pageHeading">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h2">
              {params?.id ? 'Update' : 'Create'} Employee
            </Typography>
            <Box className="ml-auto">
              <Tabs
                value={currentTab}
                // onChange={handleChange}
                aria-label="basic tabs example"
                size="small"
                indicatorColor="secondary"
              >
                <Tab label="Basic Information" {...a11yProps(0)} disabled />
                <Tab label="CTC Information" {...a11yProps(1)} disabled />
                <Tab label="Account Information" {...a11yProps(2)} disabled />
                <Tab label="Personal Information" {...a11yProps(3)} disabled />
              </Tabs>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box className="pageWrapper">
        <FormikStepper
          // initialValues={productInitialData}
          onSubmit={async (values) => {
            console.log('values', values);
          }}
        >
          <FormikStep
            //   validationSchema={validationStepOneSchema}
            label="Personal Data"
          >
            <AddEmpStepOne />
          </FormikStep>

          <FormikStep
            //   validationSchema={validationStepOneSchema}
            label="Personal Data"
          >
            <Box className="addBox">
              <EmpLeftPart />
              <Box className="addRight">
                <TabPanel value={currentTab} index={1}></TabPanel>
              </Box>
            </Box>
          </FormikStep>
          <FormikStep
            //   validationSchema={validationStepOneSchema}
            label="Personal Data"
          >
            <Box className="addBox">
              <EmpLeftPart />
              <Box className="addRight">
                <TabPanel value={currentTab} index={2}></TabPanel>
              </Box>
            </Box>
          </FormikStep>
        </FormikStepper>
      </Box>
    </>
  );
}

export function FormikStep({ children, ...formikProps }) {
  return <> {React.cloneElement(children, { ...formikProps })}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {(formikProps) => (
        <Form autoComplete="off">
          {React.cloneElement(currentChild, { ...formikProps, step })}

          <Box className="pageAction">
            <Card
              elevation={1}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                variant="outlined"
                color="secondary"
                // onClick={() => navigate("/product")}
              >
                Cancel
              </Button>
              {step !== 0 && (
                <Button variant="outlined" color="secondary">
                  Prev
                </Button>
              )}
              {step !== 6 && (
                <Button variant="outlined" color="secondary" type="submit">
                  Next
                </Button>
              )}

              <Button variant="contained" color="secondary">
                Save & Exit
              </Button>
            </Card>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
