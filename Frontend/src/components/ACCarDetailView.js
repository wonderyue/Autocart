import React, { Component, Fragment } from "react";
import {
  Input,
  Button,
  Icon,
  Rating,
  Grid,
  Divider,
  Segment,
  Image,
  Card,
  Checkbox,
} from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getCar,
  addCar,
  updateCar,
  getCarImages,
  updateCarImage,
  addCarImage,
  removeCarImage,
} from "@src/actions/ACCarAction";
import { CartModelAction } from "@src/actions";
import CurrencyFormat from "react-currency-format";
import ACDraggableCard from "./ACDraggableCard";
import ACCommentListView from "./ACCommentListView";
import { Carousel } from "react-responsive-carousel";
import { CAR_URL } from "@src/constants";
import { Link } from "react-router-dom";

const leftColumn = {
  Horsepower: "horsepower",
  "Fuel Type": "fuelType",
  Drivetrain: "drivetrain",
  Seating: "seating",
  "Stock#": "stockid",
};

const rightColumn = {
  "Combined Fuel Economy": "mpg",
  Mileage: "mileage",
  Transmission: "transmission",
  Engine: "engine",
  VIN: "vin",
};

const editModeColumn = {
  year: "year",
  name: "name",
  model: "model",
};

class ACCarDetailView extends Component {
  state = {
    editMode: false,
    cartAdded: false,
    removedImages: [],
    detailImages: [],
  };

  newId = 0;

  refresh() {
    const carId = this.props.match.params.id;
    this.props.getCar(carId, this.props.isStaff);
    this.props.getCarImages(carId);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.car.id !== this.props.car.id &&
      this.props.match.params.id != this.props.car.id
    ) {
      this.props.addCarImage({
        index: 1,
        car: this.props.car.id,
      });
      this.props.history.push(CAR_URL + this.props.car.id);
      window.location.reload();
    }
    if (prevProps.isStaff !== this.props.isStaff && this.props.isStaff) {
      this.refresh();
    }
  }

  handleAddToCart = () => {
    this.setState({ cartAdded: true });
    const carId = this.props.match.params.id;
    this.props.addToCart({ car: carId, saveForLater: false, amount: 1 });
  };

  handleUpdateCar = () => {
    const carId = this.props.match.params.id;
    this.props.updateCar(carId, {
      ...this.state.car,
      img: this.state.coverImg,
    });

    this.getDetailImages().map((item, index) => {
      const key = "detailImg_" + item.id;
      if (item.id > 0) {
        let obj = {};
        if (this.state.hasOwnProperty(key) && this.state[key]) {
          obj["img"] = this.state[key];
        }
        if (index + 1 != item.index) {
          obj["index"] = index + 1;
        }
        if (Object.keys(obj).length > 0) {
          this.props.updateCarImage(item.id, obj);
        }
      } else {
        this.props.addCarImage({
          ...item,
          index: index + 1,
          img: this.state[key],
          car: carId,
        });
      }
    });

    this.state.removedImages.map((item, index) => {
      const key = "detailImg_" + item.id;
      if (this.state.hasOwnProperty(key)) {
        this.state[key] = null;
      }
      if (item.id > 0) {
        this.props.removeCarImage(item.id);
      }
    });
  };

  handleAddCar = () => {
    this.props.addCar({
      ...this.props.car,
      ...this.state.car,
      img: this.state.coverImg,
    });
  };

  handleChangeInfo = (key, value) => {
    this.setState((prev) => {
      return { car: { ...prev.car, [key]: value } };
    });
  };

  handleAddDetailImage = (e, d) => {
    const detailImages = this.getDetailImages();
    detailImages.push({
      id: this.newId--,
      img: "",
      index: this.props.car.detailImages.length + 1,
    });
    this.setState({ detailImages });
  };

  handleRemoveDetailImage = (index) => {
    const detailImages = this.getDetailImages();
    const removed = detailImages.splice(index, 1)[0];
    this.setState({ detailImages });
    this.setState((prev) => {
      return { removedImages: [...prev.removedImages, removed] };
    });
  };

  renderInfoColumn(columnConfig, info, isStaff) {
    return Object.keys(columnConfig).map((name, index) => {
      return (
        <div key={index}>
          <a className="info_title">
            {name + " : "}
            <Input
              className="info_content"
              style={{ width: "16em" }}
              transparent={!isStaff}
              disabled={!isStaff}
              defaultValue={info[columnConfig[name]]}
              onChange={(e, d) =>
                this.handleChangeInfo(columnConfig[name], d.value)
              }
            />
          </a>
        </div>
      );
    });
  }

  genPreviewUrl(file, stateKey) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        [stateKey]: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  renderImageUploader(originalUrl, previewKey, storeKey, label, index, size) {
    return (
      <Fragment key={index}>
        <Image
          label={label}
          src={this.state[previewKey] || originalUrl}
          size={size}
        />
        <Divider />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            this.setState({ [storeKey]: e.target.files[0] });
            this.genPreviewUrl(e.target.files[0], previewKey);
          }}
          style={{ width: "95px" }}
        />
      </Fragment>
    );
  }

  swap = (a, b) => {
    let detailImages = this.getDetailImages();
    detailImages[a] = detailImages.splice(b, 1, detailImages[a])[0];
    this.setState({
      detailImages,
    });
  };

  renderDetailImageUploader(detailImages) {
    return (
      <Fragment>
        <Divider />
        <p>
          Drag to reorder
          <Button
            icon="add"
            floated="right"
            onClick={this.handleAddDetailImage}
            size="mini"
          />
        </p>
        <Card.Group itemsPerRow={Math.min(5)}>
          {detailImages.map((item, index) => (
            <ACDraggableCard key={index} i={index} action={this.swap}>
              {this.renderImageUploader(
                item.img,
                "detailImgPreviewUrl_" + item.id,
                "detailImg_" + item.id,
                "Detail Image " + item.index,
                index,
                "small"
              )}
              <Button
                icon="close"
                size="tiny"
                onClick={() => {
                  this.handleRemoveDetailImage(index);
                }}
              />
            </ACDraggableCard>
          ))}
        </Card.Group>
        <Divider />
      </Fragment>
    );
  }

  getStateOrProp(key) {
    return this.state.car && this.state.car.hasOwnProperty(key)
      ? this.state.car[key]
      : this.props.car[key];
  }

  getDetailImages() {
    return this.state.detailImages.length
      ? this.state.detailImages
      : this.props.car.detailImages;
  }

  render() {
    const info = {
      name: this.getStateOrProp("name"),
      year: this.getStateOrProp("year"),
      model: this.getStateOrProp("model"),
      price: this.getStateOrProp("price"),
      horsepower: this.getStateOrProp("horsepower"),
      mpg: this.getStateOrProp("mpg"),
      expertRating: this.getStateOrProp("expertRating"),
      customerRating: this.getStateOrProp("customerRating"),
      fuelType: this.getStateOrProp("fuelType"),
      seating: this.getStateOrProp("seating"),
      drivetrain: this.getStateOrProp("drivetrain"),
      color: this.getStateOrProp("color"),
      engine: this.getStateOrProp("engine"),
      transmission: this.getStateOrProp("transmission"),
      stockid: this.getStateOrProp("stockid"),
      vin: this.getStateOrProp("vin"),
      mileage: this.getStateOrProp("mileage"),
      img: this.getStateOrProp("img"),
      enable: this.getStateOrProp("enable"),
    };
    const { isStaff } = this.props;
    const detailImages = this.getDetailImages();
    const { editMode } = this.state;
    return (
      <div>
        <Grid style={{ margin: "1em 0em 1em 0em" }}>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column
            width={12}
            style={{ minWidth: "50em", maxWidth: "80em", padding: "1em 0em" }}
          >
            <Segment style={{ position: "relative", margin: "auto" }}>
              {detailImages.length > 0 ? (
                <Carousel infiniteLoop autoPlay interval={5000}>
                  {detailImages.map((item, index) => (
                    <img key={index} style={{ padding: 2 }} src={item.img} />
                  ))}
                </Carousel>
              ) : null}
            </Segment>
            <Segment attached="bottom">
              {isStaff ? (
                <Button
                  icon={editMode ? "edit outline" : "edit"}
                  onClick={() => {
                    this.setState({ editMode: !this.state.editMode });
                  }}
                />
              ) : null}
              <Grid style={{ margin: "2em" }}>
                <Grid.Column floated="left" width={8}>
                  <p className="header_big">
                    {info.year + " " + info.name + " " + info.model}
                  </p>
                  <p className="header_large">
                    <CurrencyFormat
                      value={info.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </p>
                  <a className="info_content">
                    {"Color : "}
                    <Input
                      style={{ width: "15em" }}
                      transparent={!editMode}
                      disabled={!editMode}
                      defaultValue={info.color}
                      onChange={(e, d) =>
                        this.handleChangeInfo("color", d.value)
                      }
                      size="mini"
                    />
                  </a>
                  {editMode
                    ? this.renderInfoColumn(editModeColumn, info, editMode)
                    : null}
                  {editMode ? (
                    <Checkbox
                      label="for sale"
                      checked={info.enable}
                      onChange={(e, d) =>
                        this.handleChangeInfo("enable", d.checked)
                      }
                    />
                  ) : null}
                </Grid.Column>
                <Grid.Column floated="left" width={8}>
                  <p>Expert Rating</p>
                  <Rating
                    rating={info.expertRating}
                    maxRating={5}
                    disabled={!editMode}
                    onRate={(e, d) =>
                      this.handleChangeInfo("expertRating", d.rating)
                    }
                  />
                  <p>
                    Customer Rating (
                    {info.customerRating ? info.customerRating.count : 0}{" "}
                    ratings)
                  </p>
                  <Rating
                    rating={
                      info.customerRating ? info.customerRating.rating : 0
                    }
                    maxRating={5}
                    disabled
                  />
                  {editMode ? (
                    <Segment>
                      {this.renderImageUploader(
                        info.img,
                        "coverImgPreviewUrl",
                        "coverImg",
                        "Edit Cover Image",
                        0
                      )}
                    </Segment>
                  ) : null}
                </Grid.Column>
              </Grid>
              {editMode ? this.renderDetailImageUploader(detailImages) : null}
              <Grid style={{ margin: "0em 2em" }}>
                <Grid.Column floated="left" width={8}>
                  {this.renderInfoColumn(leftColumn, info, editMode)}
                </Grid.Column>
                <Grid.Column floated="left" width={8}>
                  {this.renderInfoColumn(rightColumn, info, editMode)}
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column style={{ margin: "2em" }}>
                  {this.state.cartAdded ? (
                    <Button primary as={Link} floated="right" to="/cart">
                      CART
                      <Icon name="right chevron" />
                    </Button>
                  ) : this.props.isAuthenticated ? (
                    <Button
                      primary
                      floated="right"
                      onClick={this.handleAddToCart}
                    >
                      ADD TO CART
                      <Icon name="right chevron" />
                    </Button>
                  ) : null}
                  {editMode ? (
                    <Fragment>
                      <Button
                        secondary
                        floated="right"
                        onClick={this.handleUpdateCar}
                      >
                        UPDATE CAR INFO
                        <Icon name="right chevron" />
                      </Button>
                      <Button
                        secondary
                        floated="right"
                        onClick={this.handleAddCar}
                      >
                        COPY AS NEW CAR
                        <Icon name="right chevron" />
                      </Button>
                    </Fragment>
                  ) : null}
                </Grid.Column>
              </Grid>
              <ACCommentListView carid={this.props.match.params.id} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.Car,
    isStaff: state.Auth.isStaff,
    isAuthenticated: state.Auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  getCar,
  addCar,
  updateCar,
  getCarImages,
  updateCarImage,
  addCarImage,
  removeCarImage,
  addToCart: CartModelAction.create,
})(ACCarDetailView);
