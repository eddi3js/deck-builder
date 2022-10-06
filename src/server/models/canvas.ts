import { z } from 'zod';

const metadataSchema = z.object({
    name: z.string(),
    type: z.string().regex(/^(string|number|image)$/),
});

const roughElementOptionsSchema = z.object({
    bowing: z.number(),
    curveFitting: z.number(),
    curveStepCount: z.number(),
    curveTightness: z.number(),
    dashGap: z.number(),
    dashOffset: z.number(),
    disableMultiStroke: z.boolean(),
    disableMultiStrokeFill: z.boolean(),
    fill: z.string(),
    fillStyle: z.string(),
    fillWeight: z.number(),
    hachureAngle: z.number(),
    hachureGap: z.number(),
    id: z.string(),
    roughness: z.number(),
    seed: z.number(),
    stroke: z.string(),
    strokeWidth: z.number(),
    zigzagOffset: z.number(),
});

const roughElementSetsSchema = z.object({
    ops: z.array(
        z.object({
            data: z.array(z.number()),
            op: z.string(),
        })
    ),
    type: z.string(),
});

const roughElementSchema = z.object({
    options: roughElementOptionsSchema.optional(),
    shape: z.string(),
    sets: z.array(roughElementSetsSchema),
});

const elementSchema = z.object({
    index: z.number(),
    metadata: metadataSchema,
    roughElement: roughElementSchema,
    x1: z.number(),
    x2: z.number(),
    y1: z.number(),
    y2: z.number(),
});

const selectedElementSchema = z.object({
    index: z.number(),
    metadata: metadataSchema,
    roughElement: roughElementSchema,
    x1: z.number(),
    x2: z.number(),
    y1: z.number(),
    y2: z.number(),
    offsetX: z.number(),
    offsetY: z.number(),
    position: z.union([
        z.literal('tl'),
        z.literal('tr'),
        z.literal('bl'),
        z.literal('br'),
        z.literal('inside'),
        z.undefined(),
    ]),
});

const payloadSchema = z.object({
    name: z.string(),
    width: z.string(),
    height: z.string(),
    cornerBevel: z.number(),
    templateImage: z.string(),
    backgroundColor: z.string(),
    elements: z.array(elementSchema),
});

export type Payload = z.infer<typeof payloadSchema>;
export type ElementObject = z.infer<typeof elementSchema>;
export type SelectedElement = z.infer<typeof selectedElementSchema>;
export type RoughElement = z.infer<typeof roughElementSchema>;
export type RoughElementSets = z.infer<typeof roughElementSetsSchema>;
export type RoughElementOptions = z.infer<typeof roughElementOptionsSchema>;
export type Metadata = z.infer<typeof metadataSchema>;

export default payloadSchema;
