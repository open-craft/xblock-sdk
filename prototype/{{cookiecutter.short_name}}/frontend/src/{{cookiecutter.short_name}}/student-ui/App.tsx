import * as React from 'react';
import { type {{cookiecutter.class_name}}Fields } from '../types.ts';

const App: React.FC<CoverBlockFields> = (props: CoverBlockFields) => {
    return <div>{JSON.stringify(props)}</div>;
};

export default App;
