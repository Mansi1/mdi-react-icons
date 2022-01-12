import React, {useEffect, useState} from 'react';
import hljs from 'highlight.js/lib/common'
import {RawHTML} from '@milkscout/react'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/github-dark.css'
import {HighlightResult} from "highlight.js";

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('shell', shell)

export type CodeLanguage = 'javascript' |'typescript' | 'shell'
export interface CodeProps {
    children: string
    language?: CodeLanguage
}

export const Code = ({children,language = 'typescript'}: CodeProps) => {
    const [value, setValue] = useState<HighlightResult | undefined>(undefined);

    useEffect(() => {
        setValue(hljs.highlight(language, children))
    }, [children, setValue, language])

    return (<div>
        <pre>
            <code className={'language-'+language+' hljs'}>
                <RawHTML rawHTML={value?.value || ''} />
            </code>
        </pre>
    </div>);
};
