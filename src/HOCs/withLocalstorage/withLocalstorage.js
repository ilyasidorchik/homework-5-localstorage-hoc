import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (localStorageKey, value) => (WrappedComponent) => {
    class WithComponent extends Component {
        saveData = (data) => {
            save(localStorageKey, data);
            this.forceUpdate();
        };

        savedData = () => {
            return load(localStorageKey) || value;
        };

        render() {
            const { forwardedRef, ...props } = this.props;

            return (
                <WrappedComponent
                    ref={forwardedRef}
                    {...props}
                    saveData={this.saveData}
                    savedData={this.savedData()}
                />
            );
        };
    }

    return React.forwardRef((props, ref) => (
        <WithComponent {...props} forwardRef={ref}></WithComponent>
    ));
};

export default withLocalstorage;