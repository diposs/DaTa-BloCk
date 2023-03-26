import { createStyles } from '@mantine/core';


export default createStyles(theme) => ({
    inner: {
      height: '60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    overflowwrapeng:{
	    [theme.fn.largerThan('xs')]: {
		overflow-wrap: 'anywhere',
	},
    },
  }));
