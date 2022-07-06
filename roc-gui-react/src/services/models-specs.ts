export interface modelField {
  name: string
  description?: string
  type: "string" | "number"
  maxLength?: number
  minLength?: number
  title: string
  required?: boolean
}

export interface modelDef {
  name: string
  description: string
  fields: modelField[]
}

export class ModelsSpecs {

  public static getModelsSpecs(): modelDef {


    // NOTE this has be computed from openApi
    const modelDef: modelDef = {
      name: "Switch",
      description: "A managed device in the fabric (single)",
      fields: [
        {
          name: "display-name",
          type: "string",
          title: "Display Name"
        },
        {
          name: "model-id",
          type: "string",
          title: "Model Id",
          required: true,
          description: "link to switch model"
        }
      ]
    }
    return modelDef

  }
}
