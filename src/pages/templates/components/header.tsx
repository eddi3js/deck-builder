import { useCardTemplateStore } from '@/stores/cardTemplates';

export default function Header() {
    const { templateName, changeTemplateName } = useCardTemplateStore();

    return (
        <>
            <p className="text-sm mb-1">Name:</p>
            <div className="form-control w-full max-w-xs">
                <input
                    type="text"
                    value={templateName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        changeTemplateName(e.target.value)
                    }
                    placeholder="Enter Template Name"
                    className="input input-bordered w-full max-w-xs input-sm"
                />
            </div>
        </>
    );
}
