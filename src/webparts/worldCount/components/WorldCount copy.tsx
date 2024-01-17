import * as React from 'react';
import styles from './WorldCount.module.scss';
import type { IWorldCountProps } from './IWorldCountProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { FunctionComponent, useEffect, useState } from "react";
import axios from 'axios';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const Croppedlogo: any = require('../assets//Croppedlogo.gif');

const useStyles = makeStyles({
  divIconStyle: {
    position:"absolute",
    width:"100%",
    float:"right",
  },
  imgIconStyle: {
    width:"215px",
    float:"right",
  },
  itemStyle: {
    padding:"1em",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  boxShadow:'none',
}));


const WorldCount : FunctionComponent<IWorldCountProps> =
(props) => {
const classes = useStyles();
//fetch data from Worldcount List 
const worldCount = `${props.context.pageContext.web.absoluteUrl}/_api/lists/getByTitle('Worldcount')/items`;

//Create variable to store the collection
const [allWorldCountData, setAllWorldCountData] = useState<any>([]);

useEffect(() => {
  fetchAllWorldCountData();
  }, []);

const fetchAllWorldCountData = async () => {
  try {
    const [listItemData] = await Promise.all([
      axios.get(worldCount),
    ]);

    setAllWorldCountData([
      ...listItemData.data.value,
    ]);
  } catch {
    throw Error("Error. Promise failed!");
  }
};

  return (
      <section className={`${styles.worldCount}`}>  
        <Box sx={{ width: '100%' }}>
          <div className={classes.divIconStyle}>
            <img src={Croppedlogo} alt="logo"  className={classes.imgIconStyle}/> 
          </div>
          <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={50}
          totalSlides={4}
          interval={5000}
          isPlaying={true}
          >
          <Slider>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            allWorldCountData && 
            allWorldCountData.map((itemData: any,index: any) => 
            (
            <>
             <Slide index={0}>
             {
              itemData.Slide === 1 &&
              <Grid item xs={12}>
                <Item>
                    <div className={classes.itemStyle}>
                      <RichText isEditMode={false} value={itemData.SlideHeader}/>
                      <br></br><br></br><br></br>          
                       <RichText isEditMode={false} value={itemData.HTMLBody} />
                    </div>
                </Item>
              </Grid>
             }
             </Slide>
             <Slide index={1}>
             {
              itemData.Slide === 2 &&
              <Grid item xs={12}>
                <Item>   
                    <div className={classes.itemStyle}>
                      <RichText isEditMode={false} value={itemData.SlideHeader} />
                      <br></br><br></br><br></br>
                      <RichText isEditMode={false} value={itemData.HTMLBody} />
                    </div>
                </Item>
              </Grid>
             }
             </Slide>
             <Slide index={2}>
             {
              itemData.Slide === 3 &&
              <Grid item xs={12}>
                <Item>
                    <div className={classes.itemStyle}>
                      <RichText isEditMode={false} value={itemData.SlideHeader} />
                      <br></br><br></br><br></br>
                      <RichText isEditMode={false} value={itemData.HTMLBody} />
                    </div>
                  </Item>
              </Grid>
            }
            </Slide>
             <Slide index={3}>
            {
             itemData.Slide === 4 &&
             <Grid item xs={12}>
               <Item>
                  <div className={classes.itemStyle}>
                    <RichText isEditMode={false} value={itemData.SlideHeader} />
                    <br></br><br></br><br></br>
                    <RichText isEditMode={false} value={itemData.HTMLBody} />
                  </div>
               </Item>
             </Grid>
            }
            </Slide>       
            </>
            )
           )}
         </Grid>
         </Slider>
        </CarouselProvider>
        </Box>
      </section>
  );
};

export default WorldCount;
