import React from 'react';

import Button from '@/components/button';
import Message from '@/components/message';

const MessageView = () => {
    const info = () => {
        Message({
            message: 'aaaaaaaaaaaa',
            type: 'info',
            time: 5
        });
    };
    const success = () => {
        Message.success('success', 5);
    };
    const warning = () => {
        Message.warning('warning', 5);
    };
    const error = () => {
        Message.error('error', 10);
    };
    return (
        <div className="component-view">
            <Button type="blue" click={info}>info</Button>
            <Button click={success}>success</Button>
            <Button click={warning}>warning</Button>
            <Button click={error}>error</Button>
        </div>
    );
};

export default MessageView;
