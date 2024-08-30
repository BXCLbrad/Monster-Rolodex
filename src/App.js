import { Component } from 'react';

import logo from './logo.svg'; 
import CardList from './components/card-list/card-list.component';
import './App.css';
import SearchBox from './components/search-box/search-box.component';

import { useState } from "react";

class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
    
  } 

  componentDidMount(){
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => 
      this.setState(
        () => {
          return {monsters: users}
        }
      )
    );
  }

  onSearchSearch = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState( () => {
      return { searchField };
    });
  }

  render(){

    const { monsters, searchField } = this.state;
    const { onSearchSearch} = this;

    const monsterfilter = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <h1 className='app-tittle'>Monster Rolodex</h1>
        <SearchBox className = 'monsters-search-box' onChangeHandler = {onSearchSearch} placeholder = 'Search Monsters' />
        <CardList monsters = {monsterfilter}/>
      </div>
    );
  }
  
}
 
export default App;