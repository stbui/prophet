import {
    Prophet,
    Resource,
    List,
    Show,
    Create,
    Edit,
    useNotificationContext,
} from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';
import { Link } from 'react-router-dom';

export default () => (
    <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
        <Resource
            name="users"
            list={() => {
                const { notifications } = useNotificationContext();
                console.log(notifications);
                return (
                    <div>
                        <List>list</List>

                        <Link to="1">go edit</Link>
                    </div>
                );
            }}
            edit={() => (
                <div>
                    <Edit>edit</Edit>
                </div>
            )}
            create={() => (
                <div>
                    <Create>Create</Create>
                </div>
            )}
            show={() => (
                <div>
                    <Show>show</Show>
                </div>
            )}
        />
        <Resource
            name="settings"
            list={() => {
                return (
                    <div>
                        <List>list</List>
                    </div>
                );
            }}
            edit={() => (
                <div>
                    <Edit>edit</Edit>
                </div>
            )}
            create={() => (
                <div>
                    <Create>Create</Create>
                </div>
            )}
            show={() => (
                <div>
                    <Show>show</Show>
                </div>
            )}
        />
    </Prophet>
);
