import { useCardTemplateStore } from '@/stores/cardTemplates';
import React from 'react';

export default function Header() {
    const { templateName, changeTemplateName } = useCardTemplateStore();

    const [edit, setEdit] = React.useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (edit) {
            inputRef.current?.focus();
        }
    }, [edit]);

    return (
        <div className="flex flex-row pb-3 justify-between items-center border-b border-white/[0.1]">
            {!edit && (
                <h1
                    className="text-3xl font-bold"
                    onClick={() => {
                        setEdit(true);
                    }}
                >
                    {templateName}
                </h1>
            )}
            {edit && (
                <input
                    ref={inputRef}
                    className="bg-transparent text-3xl font-bold"
                    type="text"
                    value={templateName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        changeTemplateName(e.target.value)
                    }
                />
            )}
            <button className="bg-blue-500 hover:bg-purple-700 text-white text-md px-5 py-2 rounded">
                Save New Template
            </button>
        </div>
    );
}
