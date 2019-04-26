import React from 'react'

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import theme from './theme.js'
import Map from './Map'
import  PortfolioItem from './PortfolioItem'
import { withRouter } from 'react-router-dom'

class PortfolioList extends React.Component{

    constructor(props){
        super(props)

        let data = [];

        for(const key in localStorage){
            if (key.includes('user_')){
                console.log('localStorage[key]',localStorage[key])

                try {
                    data.push(JSON.parse(localStorage[key]))
                } catch (e) {}
            }
        }

        this.state = {
            data,
            filteredData: data,
            search: '',
            searchBy: 'name' // name, city, tags
        }
        this.searchHandle = this.searchHandle.bind(this)
        this.selectHandle = this.selectHandle.bind(this)
    }

    isInStr(str, substr){
        if(typeof (str) === 'string' && typeof (substr) === 'string'){
            return str.toUpperCase().indexOf(substr.toUpperCase()) > -1
        } else {
            return false;
        }
    }

    searchHandle(e){

        const {searchBy} = this.state;
        let newData = [...this.state.data]

        if(searchBy === 'name'){
            newData = newData.filter(item => this.isInStr(item.vk.name, e.target.value))
        } else if (searchBy === 'city'){
            newData = newData.filter(item => this.isInStr(item.data.address, e.target.value))
        }

        this.setState({...this.state, filteredData: newData, search: e.target.value})
    }

    selectHandle(e){
        this.setState({...this.state, searchBy: e.target.value})
    }

    render(){

        const types = [{id: 'name', label: 'Имя'}, {id: 'pLang', label: 'Языки программирования'},{id: 'city', label: 'Город'}];

        return(
            <div>
                <select onChange={this.selectHandle} value={this.state.searchBy}>
                    {types.map((itm) => {return (<option value={itm.id}>{itm.label}</option>)})}
                </select>
                <input onChange={this.searchHandle} />
                {this.state.filteredData.map((item, i) => { return <PortfolioItem key={i} viewPortfolio={this.props.viewPortfolio} item = {item} /> })}
                <Map data = {this.state.filteredData}/>
            </div>
        )
    }
}
export default withRouter(withStyles(theme)(PortfolioList))