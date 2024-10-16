import { Avatar, Badge, Button, Input, List, Modal, QRCode, QRCodeProps, Radio, Space, Spin } from 'antd';
import React, { useCallback, useState } from 'react'
import icon from '@renderer/assets/img/image.png'
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { getInvite } from '@renderer/api/teacher/index'
import { QRStatus } from 'antd/es/qr-code/interface';
interface responseInvite{
    code:number,
    data:string
}
export default function AddNew() {
    const { Search } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [QRstring, setQRstring] = useState('qqq');
    const [status,setStatus] = useState<QRStatus|undefined>('loading');
    const [lessonId] = useState(1);

    const data = [
        {
            title: '鹤归江野',

            read: false
        },
        {
            title: '鹤归江野',

            read: false
        },
        {
            title: '鹤归江野',

            read: false
        },
        {
            title: '鹤归江野',

            read: true
        },
    ];
    const showModal = () => {
        setStatus("loading")
        getInvitedData()
        setStatus(undefined)
        setIsModalOpen(true);
    };
    const getInvitedData = async () => {
        const invitedData = await getInvite(lessonId) as unknown as responseInvite
        if(invitedData.code==20000){
            setQRstring(invitedData.data)
        }
    }
    const { confirm } = Modal;
    const handleOk = () => {
        confirm({
            title: '邀请入群',
            content: '确定邀请入群吗',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                setIsModalOpen(false);
                
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };
    //二维码
    const customStatusRender: QRCodeProps['statusRender'] = (info) => {
        switch (info.status) {
            case 'expired':
                return (
                    <div>
                        <CloseCircleFilled style={{ color: 'red' }} /> {info.locale?.expired}
                        <p>
                            <Button type="link" onClick={info.onRefresh}>
                                <ReloadOutlined /> {info.locale?.refresh}
                            </Button>
                        </p>
                    </div>
                );
            case 'loading':
                return (
                    <Space direction="vertical">
                        <Spin />
                        <p>Loading...</p>
                    </Space>
                );
            default:
                return null;
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSearch = () => {

    }
    return (
        <div>
            <Button type="primary" size='small' onClick={showModal}>
                邀请入群
            </Button>
            <Modal title="邀请入群" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <QRCode value={QRstring} status={status} statusRender={customStatusRender} />
            </Modal>
        </div>
    )
}
