import { TextInput } from 'flowbite-react';
import { DefaultFields } from '../new';

interface CardTemplateDefaultFieldsProps {
    fields: DefaultFields[];
    updateDefaultFelds: (name: string, newValue: string) => void;
}

export default function CardTemplateDefaultFields({
    fields,
    updateDefaultFelds,
}: CardTemplateDefaultFieldsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map((field: DefaultFields) => (
                <div key={field.name} className="w-full mb-2 flex flex-col">
                    <label
                        htmlFor="card-type"
                        className="text-sm text-gray-300 mb-1"
                    >
                        {field.label}
                    </label>
                    <TextInput
                        value={field?.value ?? ''}
                        placeholder={field?.placeholder ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateDefaultFelds(field.name, e.target.value)
                        }
                        name={field.name}
                        type="text"
                    />
                </div>
            ))}
        </div>
    );
}
