import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import ListSuggestion from './ListSuggestion'
import { REQUEST_GetListSuggestion, changeKeyword, DisplayListSuggestion, GetListSuggestion } from '../../actions/search.action'
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: this.props.keyword,
      isRedirect: false,
      currentSelection: this.props.currentSelection,
      redirectPath: ''
    };
  }
  handleOnResultClick = (result) => {
    var keyword = result.title;
    this.props.changeKeyword(keyword)
    this.props.DisplayListSuggestion(false);
    this.props.GetListSuggestion([])
    this.setState({
      isRedirect: true,
      redirectPath: `/result/all?keyword=${keyword}`
    })
  }
  handleOnChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value
    this.props.changeKeyword(value)
    if (value.length > 0) {
      this.props.DisplayListSuggestion(true)
    } else {
      this.props.DisplayListSuggestion(false)
    }
    this.props.REQUEST_GetListSuggestion(value, '')
    this.setState({
      [name]: value
    });
  };

  handleKeyPress = async e => {
    if (e.key == 'ArrowDown') {
      var currentSelection = this.state.currentSelection;
      if (currentSelection == this.props.ListSuggestion.length) {
        currentSelection = 1;
      } else {
        currentSelection = this.state.currentSelection + 1;
      }
      await this.setState({
        currentSelection: currentSelection
      })
    }
    else if (e.key == 'ArrowUp') {
      var currentSelection = this.state.currentSelection;
      if (currentSelection == 1) {
        currentSelection = this.props.ListSuggestion.length;
      } else {
        currentSelection = this.state.currentSelection - 1;
      }
      await this.setState({
        currentSelection: currentSelection
      })
    }
    console.log(this.state.currentSelection);

  }


  render() {
    return (
      <React.Fragment>
        {this.state.isRedirect && <Redirect to={this.state.redirectPath} />}
        <div
          className={`w-100 input-search__content ${(this.props.displayListSuggestion) ? 'expanded' : 'collapsed'}`} id="autoComplete__content"
        >
          <input
            className="form-control"
            id="autoComplete"
            type="text"
            name="keyword"
            placeholder="Nhập từ khóa ..."
            value={this.props.keyword}
            tabIndex={1}
            autoComplete="off"
            onChange={this.handleOnChange}
            onKeyDown={this.handleKeyPress}
          />
          <ListSuggestion
            ListSuggestion={this.props.ListSuggestion}
            handleOnResultClick={this.handleOnResultClick}
            currentSelection = {this.state.currentSelection}
          ></ListSuggestion>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ListSuggestion: state.searchReducers.listSuggestion,
    keyword: state.searchReducers.keyword,
    currentSelection: state.searchReducers.currentSelection,
    displayListSuggestion: state.searchReducers.displayListSuggestion
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    REQUEST_GetListSuggestion: (keyword, type) => {
      dispatch(REQUEST_GetListSuggestion(keyword, type))
    },
    changeKeyword: (keyword) => {
      dispatch(changeKeyword(keyword))
    },
    DisplayListSuggestion: (isShow) => {
      dispatch(DisplayListSuggestion(isShow))
    },
    GetListSuggestion: (listSuggestion) => {
      dispatch(GetListSuggestion(listSuggestion))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
