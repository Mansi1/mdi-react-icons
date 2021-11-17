import React, {useEffect, useState} from 'react';
import hljs from 'highlight.js/lib/common'
import {RawHTML} from '@milkscout/react'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github-dark.css'
import {HighlightResult} from "highlight.js";

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)

export interface CodeProps {
    children: string
}

export const Code = ({children}: CodeProps) => {
    const [value, setValue] = useState<HighlightResult | undefined>(undefined);

    useEffect(() => {
        setValue(hljs.highlight('typescript', children))
    }, [children, setValue])

    return (<div>
        <pre>
            <code className={'language-typescript hljs'}>
                <RawHTML rawHTML={value?.value || ''} />
            </code>
        </pre>
    </div>);
};
