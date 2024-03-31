import React, { ComponentProps, FC } from 'react';
import { EventRegistrationContextProvider } from './modules/registration/context';

export const combineContext = (...components: FC[]): FC<any> => {
  const CombinedComponent = components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      const WrapperComponent: FC<any> = ({
        children,
      }: ComponentProps<FC<any>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      // Assign a displayName to the WrapperComponent
      WrapperComponent.displayName = `Combined(${
        CurrentComponent.displayName || CurrentComponent.name || 'Unknown'
      })`;

      return WrapperComponent;
    },
    ({ children }: any) => <>{children}</>
  );

  return CombinedComponent;
};

const providers = [EventRegistrationContextProvider] as any;

export const AppContextProvider = combineContext(...providers);
