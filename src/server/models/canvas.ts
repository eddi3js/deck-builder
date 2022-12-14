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
    options: roughElementOptionsSchema,
    shape: z.string(),
    sets: z.array(roughElementSetsSchema),
});

const elementSchema = z.object({
    id: z.string().optional(),
    index: z.number(),
    metadata: metadataSchema,
    roughElement: roughElementSchema,
    x1: z.number(),
    x2: z.number(),
    y1: z.number(),
    y2: z.number(),
});

const selectedElementSchema = z.object({
    id: z.string().optional(),
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
    id: z.string().optional(),
    userId: z.string().optional(),
    name: z.string(),
    width: z.string(),
    height: z.string(),
    cornerBevel: z.number(),
    templateImage: z.string(),
    backgroundColor: z.string(),
    elements: z.array(elementSchema),
});

const cardTemplatePayloadSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    name: z.string(),
    width: z.string(),
    height: z.string(),
    cornerBevel: z.number(),
    templateImage: z.string(),
    backgroundColor: z.string(),
});

const positionSchema = z
    .string()
    .regex(/^(tl|tr|bl|br|inside)$/)
    .optional();

export type Payload = z.infer<typeof payloadSchema>;
export type CardTemplatePayload = z.infer<typeof cardTemplatePayloadSchema>;
export type ElementObject = z.infer<typeof elementSchema>;
export type SelectedElement = z.infer<typeof selectedElementSchema>;
export type Positions = z.infer<typeof positionSchema>;
export type RoughElement = z.infer<typeof roughElementSchema>;
export type RoughElementSets = z.infer<typeof roughElementSetsSchema>;
export type RoughElementOptions = z.infer<typeof roughElementOptionsSchema>;
export type Metadata = z.infer<typeof metadataSchema>;

export default payloadSchema;
