//import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect } from 'react-redux';
import React from 'react';
let Index = React.createClass({
    render: function () {
        let styles = {
            componentsItem: {
                display: 'flex',
                width: '33.333%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #2d2323',
            }
        }
        return (
            <div>
                <div style={{ display: 'flex', height: 50 }}></div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 315 }}>
                        <h2>Components</h2>
                        <div style={{ display: 'flex' }}>
                            <div style={styles.componentsItem}>容器</div>
                            <div style={styles.componentsItem}>文字</div>
                            <div style={styles.componentsItem}>图片</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: 375, height: 667,border:'' }}>
                        
                        </div>
                        {/*<iframe src="index.html"></iframe>*/}
                    </div>
                    <div style={{ width: 315 }}></div>
                </div>
            </div>
        )
    }
})
let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Index);