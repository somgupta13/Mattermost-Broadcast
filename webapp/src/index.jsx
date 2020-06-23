import React from 'react';
import {FormattedMessage} from 'react-intl';
import RHSView from './right_hand_sidebar';
import manifest from '../manifest.js';


const Icon = () => <i className='icon fa fa-plug'/>;

class BroadCastPlugin {
    initialize(registry, store) {
        // console.log(store);
        
    	 const {toggleRHSPlugin} = registry.registerRightHandSidebarComponent(
            RHSView,
            <FormattedMessage
                id='plugin.name'
                defaultMessage='BroadCast'
            />);
        registry.registerChannelHeaderButtonAction(
            // icon - JSX element to use as the button's icon
            <Icon />,
            () => store.dispatch(toggleRHSPlugin),
            // dropdown_text - string or JSX element shown for the dropdown button description
            <FormattedMessage
                id='plugin.name'
                defaultMessage='BroadCast'
            />,
        );
    }
}

window.registerPlugin(manifest.id, new BroadCastPlugin());
