import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import ReactSVG from 'react-svg';
import { ALL_ITEMS_QUERY } from './Items';
import formatMoney from '../lib/formatMoney';
import StyledButton from './styled/StyledButton';
import Error from './ErrorMessage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 750px;
  padding: 10px;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.bs};

  fieldset {
    display: flex;
    flex-direction: column;
    width: 600px;

    strong {
      font-size: 18px;
    }
  }

  .imgPlaceholder {
    width: 200px;
    height: 200px;
    background-color: ${({ theme }) => theme.border};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .badge {
    width: 64px;
    height: 64px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    transition: 225ms;
    flex-direction: column;
    cursor: pointer;
    opacity: 0.7;

    &:active {
      transform: scale(1.05);
    }
  }

  .category {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .sort {
    display: flex;
    justify-content: space-between;

    & label {
      color: black;
      opacity: 0.6;
      padding: 5px 10px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    & input:checked + label {
      opacity: 1;
      border-bottom: 3px solid ${({ theme }) => theme.mainColor};
    }
  }

  .category-icon {
    transition: 225ms;
    margin-bottom: 10px;

    & path {
      transition: 225ms;
    }
  }

  input[type='radio'] {
    display: none;
  }

  input:checked + .badge {
    background-color: ${({ theme }) => theme.mainColor};
    color: white;
    border-color: ${({ theme }) => theme.mainColor};
    opacity: 1;

    & .category-icon {
      fill: white;

      & path {
        fill: white;
      }
    }
  }

  .textInput {
    display: flex;
    flex-direction: column;

    input {
      border: none;
      border-bottom: 4px solid ${({ theme }) => theme.border};
      padding: 10px;
      font-size: 16px;

      &:active,
      &:focus {
        border-color: ${({ theme }) => theme.mainColor};
      }
    }
  }

  .textInput--price {
    input {
      width: 100px;
    }

    .priceOutput {
      margin-left: 15px;
      font-size: 20px;
    }
  }

  label {
    margin: 10px 0;
  }

  textarea {
    margin-top: 10px;
    border: 3px solid ${({ theme }) => theme.border};
    padding: 8px 13px;

    &:active,
    &:focus {
      border-color: ${({ theme }) => theme.mainColor};
    }
  }

  .categoryImage {
    display: flex;
    justify-content: space-between;
  }

  label[for='file'] {
    width: 220px;
    margin-left: auto;
  }

  label[for='category'] {
    width: 290px;
  }

  .category {
    margin-bottom: 0;
  }

  .selectable {
    padding: 10px;
    padding-left: 0;
    border: none;
    border-bottom: 4px solid ${({ theme }) => theme.border};
    font-weight: bold;
  }
`;

const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      title
    }
  }
`;

const SUBCATEGORIES_QUERY = gql`
  query SUBCATEGORIES_QUERY($category: ID) {
    subcategories(where: { category: { id: $category } }) {
      id
      title
    }
  }
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $category: ID!
    $image: String!
    $largeImage: String!
    $description: String!
    $subcategory: ID!
  ) {
    createItem(
      title: $title
      price: $price
      category: $category
      image: $image
      largeImage: $largeImage
      description: $description
      subcategory: $subcategory
    ) {
      id
      title
      price
      category {
        id
        title
      }
      subcategory {
        id
        title
      }
      image
      largeImage
      description
    }
  }
`;

export default class CreateItem extends Component {
  state = {
    title: '',
    price: 0,
    description: '',
    image: null,
    largeImage: null,
    uploading: false,
    category: 'cjwffol75zm1f0b61wzgvje8d',
    subcategory: 'cjwfia00irv1g0b05l2057v1n',
  };

  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = [...data.items, payload.data.createItem];
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  uploadFile = async e => {
    this.setState({ uploading: true });
    // 1. Файлы
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gauda-images');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/arf1e/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      uploading: false,
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = name === 'price' ? parseInt(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
        update={this.update}
      >
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Убрать html-евское поведение формы
              e.preventDefault();
              // Отправить запрос
              const res = await createItem();
              Router.back();
            }}
          >
            <h2>Create New Item</h2>
            {error && <Error error={error} />}
            <fieldset disabled={loading} aria-busy={loading}>
              <div className="categoryImage">
                <div className="textInfo">
                  <label htmlFor="category">
                    <strong>Category</strong>
                    <Query query={CATEGORIES_QUERY}>
                      {({ data }) => (
                        <div className="category">
                          {data.categories.map(category => (
                            <>
                              <input
                                type="radio"
                                name="category"
                                value={category.id}
                                id={category.id}
                                checked={this.state.category === category.id}
                                onChange={e => this.handleChange(e)}
                              />
                              <label htmlFor={category.id} className="badge">
                                <ReactSVG
                                  src={`/static/svg/${category.title}.svg`}
                                  svgStyle={{ height: 24, width: 24 }}
                                  svgClassName="category-icon"
                                />
                                {category.title.toUpperCase()}
                              </label>
                            </>
                          ))}
                        </div>
                      )}
                    </Query>
                  </label>
                  <label htmlFor="subcategory">
                    <strong>Subcategory</strong>
                    <Query
                      query={SUBCATEGORIES_QUERY}
                      variables={{ category: this.state.category }}
                    >
                      {({ data }) => (
                        <div>
                          <select
                            value={this.state.subcategory.id}
                            onChange={this.handleChange}
                            className="selectable"
                          >
                            {data.subcategories.map(subcategory => (
                              <option value={subcategory.id}>
                                {subcategory.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </Query>
                  </label>
                  <label htmlFor="title" className="textInput">
                    <strong>Title</strong>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Item title"
                      required
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </label>
                  <label htmlFor="price" className="textInput textInput--price">
                    <strong>Price</strong>
                    <div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        onChange={e => this.handleChange(e)}
                        value={this.state.price}
                      />
                      <strong className="priceOutput">
                        {formatMoney(this.state.price)}
                      </strong>
                    </div>
                  </label>
                </div>
                <label htmlFor="file">
                  <strong>Image</strong>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    required
                    onChange={this.uploadFile}
                  />
                  {this.state.image && (
                    <img
                      width={200}
                      src={this.state.image}
                      alt="upload preview"
                    />
                  )}
                  {!this.state.image && (
                    <div className="imgPlaceholder">
                      <strong>Provide an image please!</strong>
                    </div>
                  )}
                </label>
              </div>
              <div>
                <label htmlFor="description" className="textInput">
                  <strong>Description</strong>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Item description"
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                </label>
              </div>
              <StyledButton type="submit" disabled={this.state.uploading}>
                Submit!
              </StyledButton>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export { SUBCATEGORIES_QUERY };
