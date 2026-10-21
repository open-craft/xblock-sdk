import * as React from 'react';
import { Button } from '@openedx/paragon';
import { useHandlerUrl } from "@opencraft/xblock-react-utils";
import { AppContextProvider } from './context.tsx';
import { type {{cookiecutter.class_name}}Fields } from '../types.ts';

const App: React.FC<{{cookiecutter.class_name}}Fields> = (props: {{cookiecutter.class_name}}Fields) => {
    const incrementUrl = useHandlerUrl('increment');

    const increment = () => {
        $.post(
            {url: incrementUrl}
        ).done((result: any) => {
            console.log("Result was ", result)
        })
    }

    return (
        <AppContextProvider {...props}>
            <div>
                <p>Count: {props.count}</p>
                <Button onClick={increment}>Increase</Button>
            </div>
        </AppContextProvider>
    )
};

export default App;
