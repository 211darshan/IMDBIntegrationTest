import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class PublicLayout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
