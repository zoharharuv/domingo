import { Component } from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'
import { socketService } from './services/socket.service';

export class RootCmp extends Component {
    componentDidMount() {
        socketService.setup();
    }
    
    componentWillUnmount() {
        socketService.terminate();
    }

    render() {
        return (
            <div>
                <main className="main-container">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}
