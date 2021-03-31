import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';

export default () => (
    <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
        <Resource
            name="users"
            list={props => <div>list</div>}
            edit={props => <div>edit</div>}
            create={props => <div>create</div>}
            show={props => <div>show</div>}
        />
    </Prophet>
);
