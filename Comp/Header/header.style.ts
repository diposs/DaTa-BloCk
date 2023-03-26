import { createStyles } from '@mantine/core';


export default createStyles((theme) => ({
    headerblock: {
      [theme.fn.smallerThan('lg')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
	overflowwrapeng:{
		overflow-wrap: 'anywhere',
	},
  },));
