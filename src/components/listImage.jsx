import React from "react";
import ImageService from "../services/imageService";
import Sorter from './sorter';
import ShowImage from './showImage';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      listImage: [],
      pagination: {},
      loading: false
    };
    this.getListLocal = localStorage.getItem('imageNasa');
    this.getPagination = localStorage.getItem('pagination');
    this.getSearchText = localStorage.getItem('searchText');
  }


  componentDidMount = () => {
    if (this.getListLocal) {
      this.setState({loading: true});
      this.dataLocal = JSON.parse(this.getListLocal);
      let pagination = JSON.parse(this.getPagination);
      this.setState({ listImage: this.dataLocal, pagination, loading: false, searchText: this.getSearchText });
    }
    this.activeTab();
  }

  getList = async (isResetPagination) => {
    if(!this.state.searchText && this.state.searchText === ''){
      return alert("Please input to search");
    }
    let paginationNew = isResetPagination ? {} : this.state.pagination;
    this.setState({loading: true});
    let list = await ImageService.searchImage(this.state.searchText, paginationNew.page);
    if (list && list.collection && list.collection.items) {
      let listItems = list.collection.items;
      let total = list.collection.metadata.total_hits;
      let pagination = {
        total: total,
        page: paginationNew.page || 1
      }
      localStorage.setItem('pagination', JSON.stringify(pagination));
      localStorage.setItem('imageNasa', JSON.stringify(listItems));
      localStorage.setItem('searchText', this.state.searchText);
      this.dataLocal = listItems.slice();
      this.activeTab();
      this.setState({ listImage: listItems, sort: undefined, type: undefined, pagination, loading: false, pagination });
    }
    else{
      this.setState({loading: false});
    }
  }

  updateImage = (nasa_id, valueChange) => {
    let list = this.dataLocal.slice();
    let getIndex = list.findIndex(item => item.data[0].nasa_id === nasa_id);

    if (valueChange.type === 'edit') {
      let oldTitle = list[getIndex].data[0].title;
      var newTitle = prompt("Please enter change title:", oldTitle);
      if (newTitle !== null && newTitle !== "" && newTitle !== oldTitle) {
        list[getIndex].data[0].title = newTitle;
      }
    }
    else {
      list[getIndex][valueChange.type] = valueChange.value;
    }

    localStorage.setItem('imageNasa', JSON.stringify(list));
    this.dataLocal = list.slice();
    list = this.filterList(list);
    this.setState({ listImage: list });
  }

  filterList = (data) => {
    let { type, sort } = this.state;
    if (type) {
      data = data.filter(item => item[type]);
    }
    if (sort) {
      data = this.sortList(data);
    }
    return data;
  }

  sortList = (data) => {
    let { sort } = this.state;
    data = data.sort(function (a, b) {
      if (sort[0] === 'date_created') {
        if (sort[1] === 'asc')
          return Date.parse(a.data[0][sort[0]]) - Date.parse(b.data[0][sort[0]]);
        else
          return Date.parse(b.data[0][sort[0]]) - Date.parse(a.data[0][sort[0]]);
      }
      else {
        if (sort[1] === 'asc')
          return a.data[0][sort[0]].localeCompare(b.data[0][sort[0]]);
        else
          return b.data[0][sort[0]].localeCompare(a.data[0][sort[0]]);
      }
    });
    return data;
  }

  activeTab = (type) => {
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    let event = document.getElementById(type || 'all');
    event.classList.add('active');
  }


  onChangeList = (type) => {
    this.activeTab(type);
    this.setState({ type, loading: true }, () => {
      let data = this.filterList(this.dataLocal);
      this.setState({ listImage: data, loading: false });
    });
  }

  onChangeSort = (type, value) => {
    this.setState({ sort: [type, value], loading: true }, () => {
      let data = this.sortList(this.state.listImage);
      this.setState({ listImage: data, loading: false });
    });
  }

  showListPaginaton = (total) => {
    let i = 0;
    let optionArr = [];
    while(i < total/100){
      i++;
      optionArr.push(<option className="select-items" value={i}>{i}</option>)
    }
    return (optionArr);
  }

  onChangePage = (page) => {
    this.setState({ pagination: {...this.state.pagination, page}}, () => this.getList())
  }

  render() {
    let { listImage, pagination, loading, searchText } = this.state;
    let page = pagination.page || 1;
    return (
      <div className='body-app'>
        <div className='search-sort-buttons'>
          <input
            onChange={(e) => {
              this.setState({ searchText: e.target.value })
            }}
            value={searchText}
            type="text"
            placeholder="Input text to search"
            className='input-search'
          />
          <button
            onClick={() => {
              this.getList(true);
            }}
            className='button-search'
          >
            <i className="fa fa-search"></i>
          </button>
          <Sorter onSubmit={(type, value) => this.onChangeSort(type, value)} />
        </div>
        <div id="main">
          <div className="tab">
            <button id='all' className="tablinks" onClick={() => this.onChangeList()}>All</button>
            <button id='like' className="tablinks" onClick={() => this.onChangeList('like')}>Liked</button>
            <button id='remove' className="tablinks" onClick={() => this.onChangeList('remove')}>Removed</button>
          </div>
          {pagination.total ?
            <div className="pagination">
              <div className='pagination-label'>
              <label>{`Show ${(page-1)*100+1} - ${page*100 < pagination.total ? page*100 : pagination.total} of ${pagination.total} items`}</label>
              </div>
              <div className="pagination-button">
                {page > 1 ? <button onClick={() => this.onChangePage(page-1)}>&laquo;Prev</button> : null}
                <select onChange={(e) => this.onChangePage(+e.target.value)} value={page}>
                  {this.showListPaginaton(pagination.total)}
                </select>
                {page < pagination.total / 100 ? <button onClick={() => this.onChangePage(page+1)}>Next&raquo;</button> : null }
              </div>
            </div>
          : null }
        </div>
        
        {loading ?
          <div className="loader"/>
        :
          <ShowImage listImage={listImage} updateImage={this.updateImage} />
        }
      </div>

    );
  }
}

export default List;
