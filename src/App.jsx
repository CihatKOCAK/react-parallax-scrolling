import React from 'react';
import './styles.css';
import ParallaxJSXWrapper from './components/ParallaxJSXWrapper';

const App = () => {

    const Orb = ParallaxJSXWrapper(<div style={styles.orb}></div>, 0.05);
    return (
        <div>
            <img src="./back.jpg"></img>
            <Orb />
        </div>
    )
}

const styles= {
    orb:{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        position:'fixed',
        top: '50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'blue'


    }
}

export default App
