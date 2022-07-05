import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

interface modelField {
  name: string
  description?: string
  type: "string" | "number"
  maxLength?: number
  minLength?: number
  title: string
  required?: boolean
}

interface modelDef {
  name: string
  description: string
  fields: modelField[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // NOTE this has be computed from openApi
  modelDef: modelDef = {
    name: "Swtich",
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

  protected fb: FormBuilder
  protected formDef: any = {}
  public form:FormGroup

  constructor(fb: FormBuilder) {
    this.fb = fb

    this.form = this.fb.group({});

    this.modelDef.fields.forEach((f) => {
      // TODO support multiple validators (min/max, minLength, ...)
      this.formDef[f.name] = new FormControl('', f.required ? Validators.required : null)
    })

    this.form = new FormGroup(this.formDef)
  }

  public onSubmit() {
    console.log(this.form)
  }
}
