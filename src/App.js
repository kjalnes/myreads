import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={ () => (
                    <MainPage />
                )}/>
                <Route path='/search' render={ () => (
                    <SearchPage  />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
