import { Fragment } from "react/cjs/react.production.min";
import React from 'react'
window.React = React

function ParallaxJSXWrapper(JSXElement, weight) {
    return class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                start_position: null,
                ease: 0.05,
                WrappedJSXElement: <Fragment></Fragment>
            }
        }
        componentDidMount(){
            this.last_offset = 0;
            this.animation_running = false;
            this.wrappedJSXElement = null;

            const ref = React.createRef();

            const JSXElementWithRef = React.cloneElement(
                JSXElement,
                {...JSXElement.props, ref:ref}
            )

            //console.log(ref)

            this.setState({
                ease: weight,
                WrappedJSXElement: JSXElementWithRef
            }, () => {
                this.setState({start_position: ref.current.offsetTop}, () => {
                    //console.log(ref)
                    this.wrappedJSXElement = ref;
                    document.addEventListener('scroll', this.animate_scroll); //this scroll --> will addded mause
                });
            });
        }

        animate_scroll = () => {
            if(!this.animation_running){
                this.animation_running = true;
                requestAnimationFrame(this.animation_loop);
            }
        }
        animation_loop = () => {
            console.log("asd")
            let current_offset = window.pageYOffset;
            let difference = current_offset - this.last_offset;
            difference *= this.state.ease;

            if(Math.abs(difference) < 0.05){
                this.last_offset = current_offset;
                this.animation_running = false;
                return;
            }

            this.wrappedJSXElement.current.style.top = `${this.state.start_position - this.last_offset}px`;
            this.last_offset += difference;

            requestAnimationFrame(this.animation_loop)
        }

        render(){
            return(
                <Fragment>
                    {this.state.WrappedJSXElement}
                </Fragment>
            )
        }
    }
}

export default ParallaxJSXWrapper;