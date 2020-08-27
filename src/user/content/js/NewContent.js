import React, {Component} from 'react';
import CreateAlbum from './CreateAlbum';
import UploadImage from './UploadImage';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class NewContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props : props
        };
    }

    render() {
        const tabBarStyle = {
            textAlign: 'center'
        };


        return (
                <Tabs defaultActiveKey="1" 
                    animated={true}
                    tabBarStyle={tabBarStyle}
                    size="large"
                    className="profile-tabs"
                    >
                    <TabPane tab={`Create Album`} key="1">
                         <CreateAlbum {...this.state.props}/>
                    </TabPane>
                    <TabPane tab={`Upload Image`} key="2">
                         <UploadImage {...this.state.props}/>
                    </TabPane>
                </Tabs>
        );
    }
}

export default NewContent;