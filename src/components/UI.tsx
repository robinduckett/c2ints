import { useState } from "react";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Repl } from "./REPL/Repl";

const UIContainer = styled('div')``;

function DrawerContents() {
  return <Box p={1}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body2">
          REGISTER
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography variant="body2">
        CAOS REPL
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Repl />
      </AccordionDetails>
    </Accordion>
  </Box>
}

export function UI() {
  const [isOpened, setIsOpened] = useState(false);

  function handleDrawerToggle() {
    setIsOpened(isOpened === true ? false : true);
  }

  return <UIContainer sx={{
    position: 'absolute',
    top: '0.5em',
    right: '0.5em',
    display: 'flex',
  }}>

  <Button
    variant="contained"
    onClick={handleDrawerToggle}>
    Actions
  </Button>

  <Drawer
    anchor="right"
    variant="temporary"
    open={isOpened}
    onClose={handleDrawerToggle}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
    sx={{
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 600 },
    }}>
    <DrawerContents />
  </Drawer>

  </UIContainer>;
}
