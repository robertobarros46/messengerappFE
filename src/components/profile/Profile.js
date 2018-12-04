import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import { getAvatarColor } from '../../utils/Colors';
import { loadProfile } from '../../store/actions/userActions'
import LoadingIndicator  from '../../components/loadingIndicator/LoadingIndicator';
import './Profile.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(email) {
        this.props.userProfile(email);
    }
      
    componentWillMount() {
        const email = localStorage.getItem("CurrentUser");
        this.loadUserProfile(email);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.email !== nextProps.match.params.email) {
            this.loadUserProfile(nextProps.match.params.email);
        }        
    }

    render() {
        if(this.props.reducerState.user.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.props.reducerState.user.notFound) {
            return <NotFound />;
        }

        if(this.props.reducerState.user.serverError) {
            return <ServerError />;
        }
        return (
            <div className="profile">
                { 
                    this.props.reducerState.user.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.props.reducerState.user.user.name)}}>
                                        {this.props.reducerState.user.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.props.reducerState.user.user.name}</div>
                                    <div className="email">Email: {this.props.reducerState.user.user.email}</div>
                                </div>
                            </div> 
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reducerState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userProfile: (email) => dispatch(loadProfile(email)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);