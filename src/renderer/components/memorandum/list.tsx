import { List, Avatar, Button } from 'antd';
import icon from '@renderer/assets/img/image.png'
const MemoranList = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={icon} />}
                            title={"计划"}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <Button>移除</Button>
                    </List.Item>
                )}
            />,
        </div>
    )
}
export default MemoranList