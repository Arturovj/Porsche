import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import styles from "../styles/Carousel.module.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button
} from "@material-ui/core";

function Banner(props) {
  if (props.newProp) console.log(props.newProp);
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={12 / totalItems} key="content">
      <CardContent className={styles.Content}>
        <Typography className={styles.Title}>{props.item.Name}</Typography>

        <Typography className={styles.Caption}>{props.item.Caption}</Typography>

        <Button variant="outlined" className={styles.ViewButton}>
          View Now
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        <CardMedia className={styles.Media} image={item.Image} title={item.Name}>
          <Typography className={styles.MediaCaption}>{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className={styles.Banner}>
      <Grid container spacing={0} className={styles.BannerGrid}>
        {items}
      </Grid>
    </Card>
  );
}

const items = [
  {
    Name: "Porsche",
    Caption: "Since 1931",
    Image: "https://periodismodelmotor.com/wp-content/uploads/2020/11/Cinco-Porsche-m%C3%A1s-r%C3%A1pidos-Historia.jpg",
    contentPosition: "left",
    Items: [
      {
        Name: "911 turbo",
        Image: "https://img.remediosdigitales.com/478003/porsche-911-turbo-1994-dos-policias-rebeldes-subasta-01/1366_2000.jpeg"
      },
      {
        Name: "911",
        Image: "https://cdn.motor1.com/images/mgl/6LVGX/s3/theon-design-hk002-porsche-911.jpg"
      }
    ]
  },
  {
    Name: "Porsche Family",
    Caption: "Say Hi!",
    contentPosition: "middle",
    Items: [
      {
        Name: "Sport Classic",
        Image: "https://files.porsche.com/filestore/image/multimedia/none/rd-2022-homepage-banner-ww-992sc-kw17/normal/1576ac92-c531-11ec-80ef-005056bbdc38/porsche-normal.jpg"
      },
      {
        Name: "911 Carrera",
        Image: "https://www.autobild.es/sites/autobild.es/public/styles/main_element/public/dc/fotos/Porsche-911_Carrera_4S-2019-C07_0.jpg?itok=UAkXs5fS"
      }
    ]
  },
  {
    Name: "Porsche Media",
    Caption: "Classics!",
    contentPosition: "right",
    Items: [
      {
        Name: "Classic",
        Image: "https://i.pinimg.com/564x/a5/a0/94/a5a094f97aa1ba73355a0e6210295d88.jpg"
      },
      {
        Name: "Classic",
        Image: "https://i.pinimg.com/originals/a1/d1/d0/a1d1d07184d98cfc9e7ca88a76f4116a.jpg"
      }
    ]
  }
];

class BannerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "fade",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value
    });
  }

  render() {
    return (
      <div style={{ marginTop: "50px", color: "#494949" }}>
        <h2></h2>

        <Carousel
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={this.state.timeout}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
          next={(now, previous) =>
            console.log(
              `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          prev={(now, previous) =>
            console.log(
              `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          onChange={(now, previous) =>
            console.log(
              `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          // fullHeightHover={false}
          // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
          // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
          // indicatorContainerProps={{style: {margin: "20px"}}}
          // NextIcon='next'
        >
          {items.map((item, index) => {
            return (
              <Banner
                item={item}
                key={index}
                contentPosition={item.contentPosition}
              />
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default BannerExample;
