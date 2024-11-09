import { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Drawer } from 'antd';
import AIchat from './AIchat';
import AIfont from '@renderer/assets/img/AIstart.png'
const AIsendAll = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };

    return (
        <>


            <div className='clickAI'>
                <img src={AIfont} alt="" onClick={showDrawer} />
            </div>

            <Drawer
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
            >
                <AIchat />
            </Drawer>
        </>
    );
};

export default AIsendAll;