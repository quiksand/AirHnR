import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import NotLoggedIn from './NotLoggedIn';
import Login from './Login.jsx'
import NavLogged from './NavLogged.jsx';
import Search from './Search.jsx';

// const styles = {
//   root: {
//     width: '100%',
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
//   search: {
//     textColor: "white",
//     marginLeft: 50
//   },
// };

class NavBar extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      searchValue: null,
      showModal: false
    }
    // this.handleSearchClick = this.handleSearchClick.bind(this)
    // this.handleChange = this.handleChange.bind(this)
   // const { classes } = props;
  }

  // handleChange(event){
  //   console.log(event.target.value)
  //   var data = event.target.value;
  //   this.setState({
  //     searchValue: data
  //   })
  //   console.log("state",this.state.searchValue)
  // }

  // handleSearchClick(){
  //   var entry = this.state.searchValue;

  //   console.log("entry",entry)
  //   $.ajax({
  //     success:function(req,res){
  //       console.log("success",req,res)
  //       this.props.triggerView('searchResults');
  //     },
  //     error: function(req, res){
  //       console.log("error",req,res)
  //     },
  //     contentType: "application/json",
  //     type: 'GET',
  //     url: `/api/listings?q=${entry}`
  //   })
  // }

  render() {

  return (
    <div className='nav-bar-wrapper'>
      <div className='nav-bar-logo'>
        <img src='../assets/logo.png' />
      </div>
      <div className='nav-bar-search'>
        <Search handleSearchClick={this.props.handleSearchClick}/>
      </div>
      <div className='nav-bar-login'>
        {this.props.isUserLoggedIn ? <NavLogged triggerView={this.props.triggerView} logOut={this.props.userLogOut} user={this.props.user} /> : 
        <NotLoggedIn userLoggedIn={this.props.userLoggedIn} triggerView={this.props.triggerView} login={this.props.login}/>}
      </div>
    </div>
    // <div>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <input type="text" style={{width: 700}}  placeholder="Anywhere..." id="place" onChange={this.handleChange}/>
    //       <button value={$("#place").val()} onClick={()=>{this.handleSearchClick(); this.props.triggerView('searchResults')}}>Go</button>
    //       <Typography onClick={() => this.props.triggerView('default')} style={{color:"white", font:"Helvetica", width: "100px"}}>
    //       Air HnR
    //       </Typography>
    //       {this.props.isUserLoggedIn ? <NavLogged logOut={this.props.userLogOut} user={this.props.user}/> : 
    //       <NotLoggedIn userLoggedIn={this.props.userLoggedIn} triggerView={this.props.triggerView} login={this.props.login}/>}
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
}
}

// NavBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


// export default withStyles(styles)(NavBar);

export default NavBar;
