import React from 'react';

interface HeaderProps {
    title: string;
    saveTemplate: React.ReactElement;
    setTemplateName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({
    title,
    saveTemplate,
    setTemplateName,
}: HeaderProps) {
    const [edit, setEdit] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (edit) {
            inputRef.current?.focus();
        }
    }, [edit]);

    return (
        <div className="flex flex-row mb-7 pb-3  justify-between items-center border-b border-gray-700">
            {!edit && (
                <h1
                    className="text-3xl font-bold"
                    onClick={() => {
                        setEdit(true);
                    }}
                >
                    {title}
                </h1>
            )}
            {edit && (
                <input
                    ref={inputRef}
                    className="bg-transparent text-3xl font-bold"
                    type="text"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTemplateName(e.target.value)
                    }
                />
            )}
            {saveTemplate}
        </div>
    );
}
