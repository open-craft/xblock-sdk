import {
    createXBlockRoot,
    type XBlockConfig,
    type XBlockRuntime,
} from '@opencraft/xblock-react-utils';
import { App } from './App.tsx';
import styles from './style.scss?inline';
import type { {{cookiecutter.class_name}}Fields } from '@/types.ts';

export const renderBlock = (
    runtime: XBlockRuntime,
    element: Element | null,
    context: { data: {{cookiecutter.class_name}}Fields; config: XBlockConfig },
) => {
    createXBlockRoot({ runtime, element, config: context.config, styles })(
        <App {...context.data} />
    );
};
