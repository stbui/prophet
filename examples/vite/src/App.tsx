import { Prophet, Resource, List, Show } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';

export default () => (
    <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
        <Resource
            name="users"
            list={props => {
                console.log(props);
                return (
                    <div>
                        <List>list</List>
                    </div>
                );
            }}
            edit={props => <div>edit</div>}
            create={props => <div>create</div>}
            show={props => (
                <div>
                    <Show>show</Show>
                </div>
            )}
        />
    </Prophet>
);
