import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import EntityList from 'components/domain/EntityList';
import ERDEditor from 'components/domain/ERDEditor';
import Loading from 'components/Loading';
import Error from 'components/Error';
import {
  useParams
} from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { GET_DOMAIN_QUERY } from 'gears-queries';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ()=> {
  const { domainId } = useParams();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loading, error, data } = useQuery(GET_DOMAIN_QUERY, {
    variables : {
      id : domainId,
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { domain } = data;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Entities" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Relations" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EntityList entities={domain.body.entities} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ERDEditor />
      </TabPanel>
    </div>
  );
}


