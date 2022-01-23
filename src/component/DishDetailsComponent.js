import { React, Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderComments({ comments, addComment, dishId }) {
  const allComments = comments.map((comment) => {
    return (
      <li key={comment.author}>
        <p>{comment.comment}</p>
        <p>
          -- {comment.author},{' '}
          <span className="date timeago">
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(comment.date))}
          </span>
        </p>
      </li>
    );
  });

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">{allComments}</ul>
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <div className="container">
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label>
                    <strong>Rating</strong>
                  </Label>
                </div>
              </Row>
              <Row md={{ size: 3, offset: 1 }} className="mr-1 ml-1">
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Control.select>
              </Row>

              <Row md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label>
                    <strong>Your Name</strong>
                  </Label>
                </div>
              </Row>
              <Row md={10} className="mr-1 ml-1">
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </Row>
              <Label htmlFor="comment" md={2}>
                <strong>comment</strong>
              </Label>
              <Row className="form-group mr-1 ml-1">
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="container">
        <div className="row">
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="contanier">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="contanier">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;
