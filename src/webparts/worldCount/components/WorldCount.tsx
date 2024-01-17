import * as React from 'react';
import styles from './WorldCount.module.scss';
import type { IWorldCountProps } from './IWorldCountProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { FunctionComponent, useEffect, useState } from "react";
import axios from 'axios';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
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
    "z-index":"1",
  },
  itemStyle: {
    padding:"1em",
  },
});



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
          interval={15000}
          isPlaying={true}
          >
          <Slider>
          {
            allWorldCountData && 
            allWorldCountData.map((itemData: any,index: any) => 
            (
            <>
             {
              itemData.Slide === 1 &&
              <Slide index={0}>
                    <div className={classes.itemStyle}>
                      <RichText isEditMode={false} value={itemData.SlideHeader}/>
                      <br></br><br></br><br></br><br></br><br></br>        
                       <RichText isEditMode={false} value={itemData.HTMLBody} />
                    </div>
              </Slide>
             }
             {
              itemData.Slide === 2 &&
              <Slide index={1}>
                    <div className={classes.itemStyle}>
                      <RichText isEditMode={false} value={itemData.SlideHeader} />
                      <br></br><br></br><br></br><br></br><br></br> 
                      <RichText isEditMode={false} value={itemData.HTMLBody} />
                    </div>
              </Slide>
             }
             {
              itemData.Slide === 3 &&
              <Slide index={2}>
                    <div className={classes.itemStyle}>
                      <RichText isEditMode={false} value={itemData.SlideHeader} />
                      <br></br><br></br><br></br><br></br><br></br> 
                      <RichText isEditMode={false} value={itemData.HTMLBody} />
                    </div>
              </Slide>
            }
            {
             itemData.Slide === 4 &&
             <Slide index={3}>
                  <div className={classes.itemStyle}>
                    <RichText isEditMode={false} value={itemData.SlideHeader} />
                    <br></br><br></br><br></br><br></br><br></br> 
                    <RichText isEditMode={false} value={itemData.HTMLBody} />
                  </div>
             </Slide>
            }    
            </>
            )
           )}
         </Slider>
        </CarouselProvider>
        </Box>
      </section>
  );
};

export default WorldCount;
