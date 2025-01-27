import {
    Link,
    Location,
    LocationProvider,
    RouteComponentProps,
    Router,
    Redirect,
    createHistory,
    createMemorySource,
} from '@reach/router';
import * as React from 'react';
import { render } from 'react-dom';

interface DashParams {
    id: string;
}

// listen to the browser history
const windowHistory = createHistory(window);

// using a memory source
const source = createMemorySource("/starting/url");
const memoryHistory = createHistory(source);

const Home = (props: RouteComponentProps) => <div>Home</div>;

const Dash = (props: RouteComponentProps<DashParams>) => (
    <div>Dash for item ${props.id}</div>
);

const NotFound = (props: RouteComponentProps) => <div>Route not found</div>;

render(
    <Router className="my-class">
        <Router component="div">
            <Home path="/" />
        </Router>
        <Router component={Home}>
            <Home path="/" />
        </Router>
        <Home path="/" />
        <Dash path="/default/:id" />
        <NotFound default />

        <Link to="/somepath" rel="noopener noreferrer" target="_blank" />
        <Redirect to="/somepath" replace={false} state={{ from: '/' }} />

        <Location>
            {context => (
                <>
                    <div>hostname is {context.location.hostname}</div>
                    <button onClick={() => context.navigate('/')}>Go Home</button>
                </>
            )}
        </Location>
        <LocationProvider>
            {context => (
                <>
                    <div>hostname is {context.location.hostname}</div>
                    <button onClick={() => context.navigate('/')}>Go Home</button>
                </>
            )}
        </LocationProvider>
        <LocationProvider history={windowHistory}>
            {context => (
                <>
                    <div>hostname is {context.location.hostname}</div>
                    <button onClick={() => context.navigate('/')}>Go Home</button>
                </>
            )}
        </LocationProvider>
        <LocationProvider history={memoryHistory}>
            {context => (
                <>
                    <div>pathname is {context.location.pathname}</div>
                    <button onClick={() => context.navigate('/')}>Go Home</button>
                </>
            )}
        </LocationProvider>
    </Router>,
    document.getElementById('app-root')
);
