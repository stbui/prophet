import { Prophet, Resource, List, Show, Create, Edit } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';

export default () => (
    <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
        <Resource
            name="users"
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
