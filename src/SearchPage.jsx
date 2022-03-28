import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass, faSlash } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

const SearchPage = ({ token, auth, userName, dispatchFun, totalState }) => {
    const navigate = useNavigate();
    const [datas, setDatas] = useState({
        searchData: '',
        tokenData: ''
    });
    const handleChage = (e) => {
        setDatas({
            searchData: e.target.value,
            tokenData: token
        })
    }
    useEffect(() => {
        setDatas({
            tokenData: token,
        })
        dispatchFun(datas);
    }, []);
    useEffect(() => {
        dispatchFun(datas);
    }, [datas]);

    const logout = ((res) => {
        if (res === undefined) {
            navigate('/');
            auth(true);
        }
    })

    const clearFun = () => {
        // setInput('')
    }
    const debouncing = (func) => {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(this, args)
            }, 500);
        }
    };
    const optimize = useCallback(debouncing(handleChage), [])

    return (
        <div className='searchContainer'>
            <div className="navBar">
                <div className='logo'>ReactTracks</div>
                <div className='userName'>{userName}</div>
                <GoogleLogout
                    clientId='343939420622-8q9692l6256mohbdfqp04nk1r4g2n8cd.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <input
                            type='button'
                            className='signout-btn'
                            onClick={renderProps.onClick}
                            value='Logout'
                        />
                    )}
                    onLogoutSuccess={logout}
                ></GoogleLogout>
            </div>
            <div className='search-container'>
                <div className="searchBox">
                    <FontAwesomeIcon icon={faXmark} opacity={.4} fontSize={24} onClick={clearFun} />
                    <input
                        placeholder='search'
                        className='searchField'
                        type='text'
                        name='search'
                        onChange={optimize}
                    // value={input.search}
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={24} opacity={.4} />
                </div>
            </div>
            <div>
                <div className='listData-container'>
                    {totalState !== undefined && !totalState.fetching ? totalState.details.items.map((val, i) =>
                        <div className='listData' key={i}>
                            <div className='video'>
                                <ReactPlayer
                                    key={i}
                                    url={`https://www.youtube.com/watch?v=${val.id.videoId}`}
                                    style={{ Width: '900' }}
                                    height={300}
                                    width={600}
                                    controls={true}
                                />
                            </div>
                            <div className='youtubeDetails'>
                                <p className='title'>{val.snippet.title}</p>
                                <div className='titleImg'>
                                    <img className='dpImg' src={val.snippet.thumbnails.medium.url} />
                                    <p className='channelName'>{val.snippet.channelTitle}</p>
                                </div>
                                <p className='discription'>{val.snippet.description}</p>
                            </div>
                        </div>
                    ) :
                        <h1>loading...</h1>}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        totalState: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFun: (data) => dispatch({ type: 'fetching', value: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
