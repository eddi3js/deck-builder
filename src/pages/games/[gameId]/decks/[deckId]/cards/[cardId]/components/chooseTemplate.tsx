import { CardTemplatePayload, Metadata } from '@/server/models/canvas';
import { defaultFontState, useCardStore } from '@/stores/cards';
import { trpc } from '@/utils/trpc';
import { CardTemplateElement } from '@prisma/client';
import type { RoughElement, RoughElementOptions } from '@/server/models/canvas';

const ChooseTemplate = () => {
    const { template, setTemplate, setAreas } = useCardStore();

    const query = trpc.useQuery(['templates.get']);
    const choices = query.data?.map((t: CardTemplatePayload) => ({
        label: t.name,
        value: t.id,
    }));

    const selectValue = query?.data?.find(
        (c: CardTemplatePayload) => c.id === template?.id
    );

    const handleSelectTemplate = (templateId: string) => {
        if (templateId === 'Choose Template') return;

        const selectedTemplate = query?.data?.find(
            (c: CardTemplatePayload) => c.id === templateId
        );

        const formattedTemplate = {
            ...selectedTemplate,
            elements: selectedTemplate?.elements.map((element: CardTemplateElement) => ({
                id: element.id,
                top: element.y1,
                left: element.x1,
                width: element.x2 - element.x1,
                height: element.y2 - element.y1,
                metadata: element.metadata,
                options: (element.roughElement as RoughElement)
                    .options as RoughElementOptions,
            })),
        };

        // setup the data for the areas in card store
        const areas = formattedTemplate.elements.map(
            (element: CardTemplateElement, i: number) => {
                return {
                    areaId: element.id,
                    type: (element.metadata as Metadata).type,
                    name: (element.metadata as Metadata).name,
                    stroke: formattedTemplate.elements[i]?.options.stroke,
                    value: null,
                    font: defaultFontState,
                };
            }
        );
        console.log(areas, 'areas');
        setAreas(areas);
        setTemplate(formattedTemplate);
    };

    return (
        <>
            <p className="text-sm mb-1">Card Template</p>
            <select
                defaultValue={selectValue}
                onChange={e => handleSelectTemplate(e.target.value)}
                className="select select-bordered w-full select-sm"
            >
                <option selected={!template}>Choose Template</option>
                {choices?.map(
                    ({ value, label }: { value: string; label: string }, i: number) => (
                        <option
                            selected={Boolean(value === template?.id)}
                            key={`${value}-${i}`}
                            value={value}
                        >
                            {label}
                        </option>
                    )
                )}
            </select>
        </>
    );
};

export default ChooseTemplate;
