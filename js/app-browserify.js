"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
// es6 polyfills, powered by babel
require("babel/register")

import {Promise} from 'es6-promise'
import React, {Component} from 'react'
import _ from 'underscore'

class Slanted extends Component {
    constructor(...p){
        super(...p)
        this.state = {
            images: [],
            scroll: 0
        }
        var image_urls = [
            'https://c2.staticflickr.com/6/5565/14713561732_e4f4618a33_c.jpg',
            'https://c1.staticflickr.com/9/8629/16581806059_8ecac5a5e6_c.jpg',
            'https://c1.staticflickr.com/3/2920/13946389668_47abea6b55_c.jpg'
        ]
        var temp = Array(10).join(',-').split('-'),
            len = image_urls.length
        this.state.images = temp.map(() => image_urls[Math.floor(Math.random()*len)]+`?_=${+new Date()}`)
        this._setScroll = _.debounce((e) => {
            this.setState({
                scroll: Math.floor(window.scrollY)
            })
        },16)
    }
    componentDidMount(){
        window.addEventListener('scroll', this._setScroll)
    }
    componentDidUnmount(){
        window.removeEventListener('scroll', this._setScroll)
    }
    render(){
        return (<ul className="slanted">
            { this.state.images.map((url) => <SlantedImage src={url} scroll={this.state.scroll} />)}
        </ul>)
    }
}

class SlantedImage extends Component {
    constructor(...p){
        super(...p)
        this.state = {
            opacity: 0
        }
    }
    _fadeIn(){
        this.setState({opacity: 1})
    }
    render(){
        // console.log(this.props.scroll)
        var style = {
            // src: `url(${this.props.src})`,
            opacity: this.state.opacity,
            transform: `translate(-50%, -50%) skewY(-15deg)`
        }
        return (<li><img src={this.props.src} onLoad={() => this._fadeIn()} style={style}/></li>)
    }
}

React.render(<Slanted />, document.querySelector('.container'))