import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withContainer<P>(injectedProps: P) {
  return function<T extends P>(WrappedComponent: React.FC<T>) {
    const hocComponent = (props: Omit<T, keyof P>) => (
      <WrappedComponent
        {...props as T} // this 'as T' should be explicit
        {...injectedProps}
      />
    );

    hocComponent.displayName = `WithContainer(${getDisplayName(
      WrappedComponent,
    )})`;

    return hocComponent;
  };
}
