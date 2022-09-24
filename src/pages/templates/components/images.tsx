import { useCardTemplateStore } from '@/stores/cardTemplates';

export default function Images() {
    const { templateImages } = useCardTemplateStore();

    return (
        <div className="w-full mb-4 pb-4 border-b border-b-black/[07]">
            <h2 className="text-sm mb-2">Template Image Layers (0):</h2>
            {templateImages.length === 0 && (
                <p className="text-white/[0.5] text-sm">No layers created</p>
            )}
        </div>
    );
}
